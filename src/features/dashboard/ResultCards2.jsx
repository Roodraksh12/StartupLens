import { motion } from 'framer-motion';
import { DollarSign, Map, Presentation, Briefcase, Rocket, Calendar, CheckCircle2 } from 'lucide-react';

export const MonetizationCard = ({ models }) => (
  <div className="glass-card p-6 md:col-span-2">
    <h3 className="text-lg font-semibold text-slate-300 mb-6 flex items-center gap-2">
      <DollarSign className="w-5 h-5 text-emerald-400" /> Monetization Ideas
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {models.map((model, i) => (
        <div key={i} className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-white text-sm">{model.model}</h4>
            <span className={`badge ${model.viability === 'High' ? 'badge-green' : model.viability === 'Medium' ? 'badge-yellow' : 'badge-red'}`}>{model.viability}</span>
          </div>
          <p className="text-xs text-slate-300">{model.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export const MvpRoadmapCard = ({ mvp }) => {
  const phases = [mvp.phase1, mvp.phase2, mvp.phase3];
  return (
    <div className="glass-card p-6 md:col-span-2 overflow-x-auto">
      <h3 className="text-lg font-semibold text-slate-300 mb-6 flex items-center gap-2">
        <Map className="w-5 h-5 text-indigo-400" /> MVP Roadmap
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 min-w-max sm:min-w-0">
        {phases.map((phase, i) => (
          <div key={i} className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5 relative">
            <div className="absolute top-0 right-5 -mt-3 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {phase.duration}
            </div>
            <h4 className="font-bold text-indigo-300 mb-4 pb-2 border-b border-white/10">{phase.title}</h4>
            <ul className="space-y-3">
              {phase.tasks.map((task, j) => (
                <li key={j} className="text-sm text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export const InvestorReadinessCard = ({ readiness }) => (
  <div className="glass-card p-6 flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
        <Presentation className="w-5 h-5 text-purple-400" /> Investor Readiness
      </h3>
      <div className="flex items-center gap-4 mb-4">
        <div className="text-3xl font-bold font-heading text-white">{readiness.score}<span className="text-sm text-slate-500">/10</span></div>
        <span className={`badge ${readiness.score >= 7 ? 'badge-green' : readiness.score >= 4 ? 'badge-yellow' : 'badge-red'}`}>{readiness.verdict}</span>
      </div>
      
      <div className="space-y-4 mt-6">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Gaps</h4>
          <ul className="space-y-1">
            {readiness.keyGaps.map((gap, i) => <li key={i} className="text-sm text-rose-300 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>{gap}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tips to Improve</h4>
          <ul className="space-y-1">
            {readiness.tips.map((tip, i) => <li key={i} className="text-sm text-emerald-300 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{tip}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export const BusinessModelCard = ({ model }) => (
  <div className="glass-card p-6 md:col-span-2">
    <h3 className="text-lg font-semibold text-slate-300 mb-6 flex items-center gap-2">
      <Briefcase className="w-5 h-5 text-blue-400" /> Business Model
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h4 className="text-blue-400 font-bold mb-3">Revenue Streams</h4>
        <div className="space-y-3">
          {model.revenueStreams.map((stream, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="flex justify-between text-sm mb-1"><strong className="text-white">{stream.stream}</strong> <span className={`text-xs ${stream.potential === 'High' ? 'text-emerald-400' : 'text-slate-400'}`}>{stream.potential}</span></div>
              <p className="text-xs text-slate-400">{stream.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-blue-400 font-bold mb-3">Pricing Strategy</h4>
        <div className="space-y-3">
          {model.pricingStrategy.map((strategy, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
              <strong className="text-sm text-white block mb-1">{strategy.strategy}</strong>
              <p className="text-xs text-slate-400 mb-2">{strategy.description}</p>
              <div className="bg-blue-500/10 text-blue-300 text-xs p-1.5 rounded border border-blue-500/20">Ex: {strategy.example}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-blue-400 font-bold mb-3">Growth Strategies</h4>
        <ul className="space-y-3">
          {model.growthStrategies.map((strategy, i) => (
            <li key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
              <strong className="text-sm text-white block mb-1">{strategy.strategy}</strong>
              <p className="text-xs text-slate-400">{strategy.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export const GoToMarketCard = ({ gtm }) => (
  <div className="glass-card p-6 md:col-span-2">
    <h3 className="text-lg font-semibold text-slate-300 mb-6 flex items-center gap-2">
      <Rocket className="w-5 h-5 text-cyan-400" /> Go-To-Market Plan
    </h3>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-5">
        <h4 className="text-cyan-400 font-bold mb-4 border-b border-cyan-500/20 pb-2">First Users</h4>
        <div className="space-y-4">
          {gtm.firstUsers.map((user, i) => (
            <div key={i}>
              <strong className="text-sm text-white block">{user.segment}</strong>
              <p className="text-xs text-slate-300 mt-1"><span className="text-cyan-500">How:</span> {user.how}</p>
              <p className="text-xs text-slate-300"><span className="text-cyan-500">Where:</span> {user.channel}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-5">
        <h4 className="text-indigo-400 font-bold mb-4 border-b border-indigo-500/20 pb-2">Acquisition Channels</h4>
        <div className="space-y-4">
          {gtm.acquisitionChannels.map((channel, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <strong className="text-sm text-white">{channel.channel}</strong>
                <span className={`badge ${channel.priority === 'High' ? 'badge-green' : 'badge-yellow'}`}>{channel.priority}</span>
              </div>
              <p className="text-xs text-slate-300">{channel.tactic}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5">
        <h4 className="text-purple-400 font-bold mb-4 border-b border-purple-500/20 pb-2">Marketing Ideas</h4>
        <div className="space-y-4">
          {gtm.marketingIdeas.map((idea, i) => (
            <div key={i}>
              <strong className="text-sm text-white block mb-1">{idea.idea}</strong>
              <div className="flex gap-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 bg-white/5 px-2 py-0.5 rounded">Effort: <span className={idea.effort === 'High' ? 'text-rose-400' : 'text-emerald-400'}>{idea.effort}</span></span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 bg-white/5 px-2 py-0.5 rounded">Impact: <span className={idea.impact === 'High' ? 'text-emerald-400' : 'text-amber-400'}>{idea.impact}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
