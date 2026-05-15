'use client';

export default function NewsletterForm() {
  return (
    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="votre@email.com"
        className="flex-1 px-4 py-3 font-dm-sans text-sm focus:outline-none transition-colors"
        style={{
          background: 'var(--glass)',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
        }}
      />
      <button type="submit" className="btn-primary whitespace-nowrap">
        Rejoindre
      </button>
    </form>
  );
}
