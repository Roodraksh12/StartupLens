import { Rocket } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-3xl border-b border-slate-200/50 py-4 px-6 md:px-12 flex items-center justify-between shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
      <div className="flex items-center gap-3">
        <div className="bg-black p-2.5 rounded-2xl shadow-sm hover:scale-105 transition-transform">
          <Rocket className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 m-0">StartupLens</h1>
          <p className="text-xs text-slate-500 font-medium hidden sm:block">Validate your idea before the market does</p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/50 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
        AI Engine Ready
      </div>
    </header>
  );
}
