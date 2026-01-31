'use client';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bird, Home, Info } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/about', label: 'About', Icon: Info },
  { to: '/parrot', label: 'Parrot', Icon: Bird },
  { to: '/testing', label: 'Testing', Icon: Info },

];

function isActivePath(pathname, to) {
  if (to === '/') return pathname === '/';
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-4">
        <Link to="/" className="font-semibold tracking-tight text-lg">MarmotGames</Link>

        <nav className="flex items-center gap-1">
          {navItems.map(({ to, label, Icon }) => {
            const active = isActivePath(pathname, to);
            return (
              <Link
                key={to}
                to={to}
                className={[
                  'inline-flex items-center gap-2 rounded-md px-3 py-2 text-xl transition-colors',
                  active
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                ].join(' ')}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/game"
            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Game
          </Link>
        </div>
      </div>
    </header>
  );
}