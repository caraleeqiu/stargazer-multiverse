'use client';

import { useState } from 'react';
import Link from 'next/link';

// ============ Header ============
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">IR</span>
          </div>
          <span className="text-white font-semibold text-xl tracking-tight">IdolRift</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-white/70 hover:text-white transition-colors text-sm">Features</a>
          <a href="#stories" className="text-white/70 hover:text-white transition-colors text-sm">Stories</a>
          <a href="#about" className="text-white/70 hover:text-white transition-colors text-sm">About</a>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-full hover:from-violet-500 hover:to-pink-500 transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4">
          <nav className="flex flex-col gap-4">
            <a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a>
            <a href="#stories" className="text-white/70 hover:text-white transition-colors">Stories</a>
            <a href="#about" className="text-white/70 hover:text-white transition-colors">About</a>
            <hr className="border-white/10" />
            <Link href="/login" className="text-white/70 hover:text-white transition-colors">Log in</Link>
            <Link href="/signup" className="text-violet-400 hover:text-violet-300 transition-colors">Get Started</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

// ============ Hero ============
function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/50 via-black to-black" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/60 text-sm">Now in Beta</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Meet your{' '}
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
            perfect ending
          </span>
          <br />
          in a parallel world
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          Immersive interactive stories where you become the protagonist.
          Make choices, explore branches, discover your own destiny.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/play"
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-full font-medium text-lg hover:from-violet-500 hover:to-pink-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
          >
            Start Your Journey
          </Link>
          <Link
            href="/signup"
            className="px-8 py-4 bg-white/5 border border-white/20 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all"
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

// ============ Features ============
function Features() {
  const features = [
    {
      icon: '🌍',
      title: 'Choose Your Universe',
      description: 'Select from multiple worldviews — idol groups, fantasy realms, office romance, and more.',
    },
    {
      icon: '🔀',
      title: 'Build Your "What Ifs"',
      description: 'Create branching storylines where every choice leads to a different path and ending.',
    },
    {
      icon: '✨',
      title: 'Experience Others\' Worlds',
      description: 'Explore stories crafted by other creators and discover new parallel universes.',
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Your story, infinite possibilities
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            IdolRift puts you in control of the narrative
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-violet-500/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ Stories ============
function Stories() {
  const stories = [
    {
      title: 'An Unnamed Love Poem',
      character: 'Luke Pearce',
      status: 'available',
      image: null,
    },
    {
      title: 'Coming Soon',
      character: 'New Character',
      status: 'coming',
      image: null,
    },
    {
      title: 'Coming Soon',
      character: 'New Character',
      status: 'coming',
      image: null,
    },
  ];

  return (
    <section id="stories" className="py-24 px-6 bg-gradient-to-b from-black via-violet-950/20 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Featured Stories
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Dive into immersive narratives crafted with love
          </p>
        </div>

        {/* Story Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 ${
                story.status === 'available'
                  ? 'border-violet-500/50 hover:border-violet-400'
                  : 'border-white/10 opacity-60'
              }`}
            >
              {/* Image placeholder */}
              <div className="aspect-[3/4] bg-gradient-to-br from-violet-900/50 to-pink-900/50 flex items-center justify-center">
                {story.status === 'available' ? (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-3xl">💜</span>
                    </div>
                    <p className="text-white/40 text-sm">Story Cover</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                      <span className="text-3xl">🔒</span>
                    </div>
                    <p className="text-white/30 text-sm">Coming Soon</p>
                  </div>
                )}
              </div>

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {story.title}
                </h3>
                <p className="text-white/60 text-sm">{story.character}</p>
                {story.status === 'available' && (
                  <Link
                    href="/play"
                    className="inline-flex items-center gap-2 mt-4 text-violet-400 hover:text-violet-300 transition-colors text-sm font-medium"
                  >
                    Play Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CTA ============
function CTA() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to explore your parallel worlds?
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
          Create your account and start your journey today. It&apos;s free to begin.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-full font-medium text-lg hover:from-violet-500 hover:to-pink-500 transition-all shadow-lg shadow-violet-500/25"
          >
            Create Free Account
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 text-white/70 hover:text-white transition-colors font-medium text-lg"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============ Footer ============
function Footer() {
  return (
    <footer id="about" className="py-12 px-6 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">IR</span>
            </div>
            <span className="text-white font-semibold text-xl">IdolRift</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/30 text-sm">
          © 2026 IdolRift. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ============ Main Page ============
export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Stories />
      <CTA />
      <Footer />
    </main>
  );
}
