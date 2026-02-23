'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/50 via-black to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-6 py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold">IR</span>
              </div>
              <span className="text-white font-semibold text-2xl">IdolRift</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-white/60 hover:text-white transition-colors">
                登录
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                注册
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              在平行世界
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                遇见你的结局
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-xl mx-auto">
              沉浸式互动故事，每个选择都通向不同的命运
            </p>
          </div>

          {/* Two Entrances */}
          <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
            {/* Entrance 1: Experience Stories */}
            <Link
              href="/stories"
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 rounded-full">
                <span className="text-green-400 text-xs">可体验</span>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">体验故事</h2>
              <p className="text-white/60 mb-6">
                探索已创作好的互动剧本，沉浸式体验不同角色的故事线
              </p>

              <div className="flex items-center gap-2 text-violet-400 group-hover:gap-3 transition-all">
                <span>浏览故事</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Entrance 2: Create Stories */}
            <Link
              href="/create"
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-pink-500/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 px-3 py-1 bg-violet-500/20 rounded-full">
                <span className="text-violet-400 text-xs">AI 生成</span>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">创建故事</h2>
              <p className="text-white/60 mb-6">
                选择世界观、角色、主题，AI 为你生成专属的互动剧本
              </p>

              <div className="flex items-center gap-2 text-pink-400 group-hover:gap-3 transition-all">
                <span>开始创作</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Stats or social proof */}
          <div className="mt-16 flex items-center gap-8 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Beta 测试中</span>
            </div>
            <div>1 个故事可体验</div>
            <div>3 种结局</div>
          </div>
        </div>
      </div>
    </main>
  );
}
