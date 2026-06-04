import { Rocket } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#080d1a]/80 backdrop-blur-md border-b border-white/10 py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-indigo-500 to-cyan-400 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white m-0">StartupLens</h1>
          <p className="text-xs text-cyan-400/80 font-medium hidden sm:block">Validate your idea before the market does</p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        AI Engine Ready
      </div>
    </header>
  );
}
