'use client';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from '@/generalcomp/navbar';
import Canvas from '@/parrot/canvas.js';
import Gameplay from '@/parrot/gameplay';
import Parrot from '@/parrot/parrot';
import Home from '@/sitehome/home';
import About from '@/about/about';
import Testing from '@/parrot/testing';

export default function AppClient() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main className="mx-auto w-full max-w-6xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/parrot" element={<Parrot />} />
            <Route path="/game" element={<Canvas />} />
            <Route path="/testing" element={<Testing />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

