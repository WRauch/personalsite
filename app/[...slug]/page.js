'use client';

import dynamic from 'next/dynamic';

// Catch-all route (non-root) to prevent 404s on refresh for react-router-dom paths
// like /parrot, /about, /game, etc. Root "/" remains handled by app/page.js.
const AppClient = dynamic(() => import('../AppClient'), { ssr: false });

export default function SlugPage() {
  return <AppClient />;
}

