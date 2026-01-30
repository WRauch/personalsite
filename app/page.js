'use client';

import dynamic from 'next/dynamic';

// `react-router-dom`'s BrowserRouter touches browser-only APIs (window/document).
// Next still renders Client Components on the server by default, so we opt out of SSR.
const AppClient = dynamic(() => import('./AppClient'), { ssr: false });

export default function Page() {
  return <AppClient />;
}
