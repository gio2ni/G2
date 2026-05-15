'use client';

// ============================================================
// PAGE CHECKOUT — Paiement Stripe
//
// Flow :
//   1. Récupère les items du panier (Zustand)
//   2. Appelle POST /api/create-payment-intent → clientSecret
//   3. Affiche Stripe Elements pour la saisie carte
//   4. Redirection vers /checkout/success après paiement
//
// Note : nécessite STRIPE_SECRET_KEY + NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
//        dans .env.local (voir .env.local.example)
// ============================================================

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useCartStore, useCartTotal } from '@/lib/store';

// Clé publique Stripe (visible côté client — pas de risque)
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
);

// ---- Formulaire de paiement (à l'intérieur d'Elements) ----
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMsg('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      setErrorMsg(error.message ?? 'Une erreur est survenue.');
      setLoading(false);
    } else {
      // Stripe redirige automatiquement vers return_url
      clearCart();
    }
  }, [stripe, elements, clearCart]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Stripe Elements — rendu par Stripe, stylisé via appearance */}
      <div className="p-5 rounded" style={{ border: '1px solid var(--border)', background: 'var(--glass)' }}>
        <PaymentElement />
      </div>

      {/* Message d'erreur */}
      {errorMsg && (
        <p className="font-dm-sans text-sm text-red-400 text-center">{errorMsg}</p>
      )}

      {/* Bouton payer */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn-primary w-full py-5 relative overflow-hidden"
        style={{ opacity: loading ? 0.7 : 1 }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Traitement...
          </span>
        ) : (
          'Confirmer le paiement'
        )}
      </button>

      <p className="font-dm-sans text-xs text-center" style={{ color: 'var(--text-muted)' }}>
        🔒 Paiement sécurisé par Stripe — données chiffrées SSL
      </p>
    </form>
  );
}

// ---- Page principale ----
export default function CheckoutPage() {
  const { items } = useCartStore();
  const total = useCartTotal();
  const router = useRouter(); // utilisé pour rediriger si panier vide

  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Panier vide → retour à la boutique
  useEffect(() => {
    if (items.length === 0) {
      router.replace('/products');
    }
  }, [items, router]);

  // Crée l'intention de paiement au chargement
  useEffect(() => {
    if (items.length === 0) return;

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Impossible de charger le paiement. Vérifiez votre clé Stripe.');
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Apparence Stripe Elements adaptée au thème G2
  const appearance = {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#00E5FF',
      colorBackground: '#0F0F17',
      colorText: '#F2F0EB',
      colorDanger: '#FF4444',
      fontFamily: 'Space Grotesk, sans-serif',
      borderRadius: '0px',
    },
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-5 md:px-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Link href="/cart" className="inline-block font-orbitron text-[10px] tracking-[0.4em] uppercase mb-8 transition-colors"
              style={{ color: 'var(--text-muted)' }}>
          ← Retour au panier
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ---- Colonne gauche : Formulaire Stripe ---- */}
          <div>
            <h1 className="font-orbitron text-2xl mb-8 tracking-wide" style={{ color: 'var(--text-primary)' }}>
              Paiement
            </h1>

            {loading ? (
              <div className="flex items-center gap-3 py-16">
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="font-dm-sans text-sm" style={{ color: 'var(--text-muted)' }}>
                  Chargement...
                </span>
              </div>
            ) : error ? (
              <div className="p-5 rounded" style={{ border: '1px solid var(--border)', background: 'var(--glass)' }}>
                <p className="font-dm-sans text-sm text-red-400 mb-4">{error}</p>
                <p className="font-dm-sans text-xs" style={{ color: 'var(--text-muted)' }}>
                  Pour activer Stripe, ajouter dans <code>.env.local</code> :<br />
                  <code className="text-neon-cyan">STRIPE_SECRET_KEY=sk_test_...</code><br />
                  <code className="text-neon-cyan">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...</code>
                </p>
              </div>
            ) : clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                <CheckoutForm />
              </Elements>
            ) : null}
          </div>

          {/* ---- Colonne droite : Résumé commande ---- */}
          <div>
            <h2 className="font-orbitron text-sm tracking-[0.3em] uppercase mb-6"
                style={{ color: 'var(--text-muted)' }}>
              Résumé
            </h2>

            <div className="flex flex-col gap-3 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`}
                     className="flex justify-between items-center py-3"
                     style={{ borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <p className="font-orbitron text-xs tracking-wide" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </p>
                    <p className="font-dm-sans text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {item.size} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-orbitron text-sm" style={{ color: 'var(--accent)' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-4"
                 style={{ borderTop: '1px solid var(--border)' }}>
              <span className="font-orbitron text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                Total
              </span>
              <span className="font-orbitron text-xl" style={{ color: 'var(--text-primary)' }}>
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Garanties */}
            <div className="mt-6 flex flex-col gap-2">
              {[
                '✓ Paiement 100% sécurisé (SSL)',
                '✓ Retours gratuits sous 30 jours',
                '✓ Livraison offerte dès 150€',
              ].map((item) => (
                <p key={item} className="font-dm-sans text-xs" style={{ color: 'var(--text-muted)' }}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
