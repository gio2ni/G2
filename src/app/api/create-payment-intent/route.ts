// ============================================================
// API ROUTE — Création d'une intention de paiement Stripe
// POST /api/create-payment-intent
//
// Reçoit : { items: CartItem[] }
// Retourne : { clientSecret: string }
//
// Le clientSecret est utilisé côté client par Stripe Elements
// pour finaliser le paiement de manière sécurisée.
//
// Pour activer : ajouter dans .env.local :
//   STRIPE_SECRET_KEY=sk_test_...
// ============================================================

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialise Stripe avec la clé secrète (côté serveur uniquement)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
  apiVersion: '2026-04-22.dahlia' as const,
});

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 });
    }

    // Calcul du total en centimes (Stripe utilise la plus petite unité monétaire)
    const totalCents = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + Math.round(item.price * 100) * item.quantity,
      0
    );

    // Crée l'intention de paiement
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(items.map((i: { id: string; name: string; quantity: number }) =>
          `${i.id} x${i.quantity}`
        )),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Erreur de paiement' }, { status: 500 });
  }
}
