import { Rocket } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 md:px-12 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-slate-900 p-2 rounded-xl shadow-sm">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 m-0">StartupLens</h1>
          <p className="text-xs text-slate-500 font-medium hidden sm:block">Validate your idea before the market does</p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        AI Engine Ready
      </div>
    </header>
  );
}
