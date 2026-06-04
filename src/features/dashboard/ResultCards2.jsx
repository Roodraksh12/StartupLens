import { motion } from 'framer-motion';
import { DollarSign, Map, Presentation, Briefcase, Rocket, Calendar, CheckCircle2 } from 'lucide-react';

export const MonetizationCard = ({ models }) => (
  <div className="glass-card p-6">
    <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
      <DollarSign className="w-5 h-5 text-emerald-600" /> Monetization Ideas
    </h3>
    <div className="grid grid-cols-1 gap-4">
      {models.map((model, i) => (
        <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-emerald-900 text-sm">{model.model}</h4>
            <span className={`badge ${model.viability === 'High' ? 'badge-green' : model.viability === 'Medium' ? 'badge-yellow' : 'badge-red'}`}>{model.viability}</span>
          </div>
          <p className="text-xs text-slate-700">{model.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export const MvpRoadmapCard = ({ mvp }) => {
  const phases = [mvp.phase1, mvp.phase2, mvp.phase3];
  return (
    <div className="glass-card p-6 overflow-x-auto">
      <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
        <Map className="w-5 h-5 text-indigo-600" /> MVP Roadmap
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 min-w-max sm:min-w-0">
        {phases.map((phase, i) => (
          <div key={i} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-5 relative">
            <div className="absolute top-0 right-5 -mt-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {phase.duration}
            </div>
            <h4 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">{phase.title}</h4>
            <ul className="space-y-3">
              {phase.tasks.map((task, j) => (
                <li key={j} className="text-sm text-slate-700 flex items-start gap-2">
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
  <div className="glass-card p-6 flex flex-col justify-between h-full">
    <div>
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Presentation className="w-5 h-5 text-purple-600" /> Investor Readiness
      </h3>
      <div className="flex items-center gap-4 mb-4">
        <div className="text-3xl font-bold font-heading text-slate-900">{readiness.score}<span className="text-sm text-slate-500">/10</span></div>
        <span className={`badge ${readiness.score >= 7 ? 'badge-green' : readiness.score >= 4 ? 'badge-yellow' : 'badge-red'}`}>{readiness.verdict}</span>
      </div>
      
      <div className="space-y-4 mt-6">
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Gaps</h4>
          <ul className="space-y-1">
            {readiness.keyGaps.map((gap, i) => <li key={i} className="text-sm text-slate-700 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>{gap}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tips to Improve</h4>
          <ul className="space-y-1">
            {readiness.tips.map((tip, i) => <li key={i} className="text-sm text-slate-700 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>{tip}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export const BusinessModelCard = ({ model }) => (
  <div className="glass-card p-6">
    <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
      <Briefcase className="w-5 h-5 text-blue-600" /> Business Model
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div>
        <h4 className="text-blue-700 font-bold mb-3">Revenue Streams</h4>
        <div className="space-y-3">
          {model.revenueStreams.map((stream, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="flex justify-between text-sm mb-1"><strong className="text-slate-900">{stream.stream}</strong> <span className={`text-xs ${stream.potential === 'High' ? 'text-emerald-600' : 'text-slate-500'}`}>{stream.potential}</span></div>
              <p className="text-xs text-slate-600">{stream.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-blue-700 font-bold mb-3">Pricing Strategy</h4>
        <div className="space-y-3">
          {model.pricingStrategy.map((strategy, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <strong className="text-sm text-slate-900 block mb-1">{strategy.strategy}</strong>
              <p className="text-xs text-slate-600 mb-2">{strategy.description}</p>
              <div className="bg-blue-50 text-blue-800 text-xs p-1.5 rounded border border-blue-200">Ex: {strategy.example}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-blue-700 font-bold mb-3">Growth Strategies</h4>
        <ul className="space-y-3">
          {model.growthStrategies.map((strategy, i) => (
            <li key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <strong className="text-sm text-slate-900 block mb-1">{strategy.strategy}</strong>
              <p className="text-xs text-slate-600">{strategy.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export const GoToMarketCard = ({ gtm }) => (
  <div className="glass-card p-6">
    <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
      <Rocket className="w-5 h-5 text-cyan-600" /> Go-To-Market Plan
    </h3>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5">
        <h4 className="text-cyan-800 font-bold mb-4 border-b border-cyan-200 pb-2">First Users</h4>
        <div className="space-y-4">
          {gtm.firstUsers.map((user, i) => (
            <div key={i}>
              <strong className="text-sm text-slate-900 block">{user.segment}</strong>
              <p className="text-xs text-slate-700 mt-1"><span className="text-cyan-700 font-semibold">How:</span> {user.how}</p>
              <p className="text-xs text-slate-700"><span className="text-cyan-700 font-semibold">Where:</span> {user.channel}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
        <h4 className="text-indigo-800 font-bold mb-4 border-b border-indigo-200 pb-2">Acquisition Channels</h4>
        <div className="space-y-4">
          {gtm.acquisitionChannels.map((channel, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <strong className="text-sm text-slate-900">{channel.channel}</strong>
                <span className={`badge ${channel.priority === 'High' ? 'badge-green' : 'badge-yellow'}`}>{channel.priority}</span>
              </div>
              <p className="text-xs text-slate-700">{channel.tactic}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
        <h4 className="text-purple-800 font-bold mb-4 border-b border-purple-200 pb-2">Marketing Ideas</h4>
        <div className="space-y-4">
          {gtm.marketingIdeas.map((idea, i) => (
            <div key={i}>
              <strong className="text-sm text-slate-900 block mb-1">{idea.idea}</strong>
              <div className="flex gap-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm">Effort: <span className={idea.effort === 'High' ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>{idea.effort}</span></span>
                <span className="text-[10px] uppercase tracking-wider text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm">Impact: <span className={idea.impact === 'High' ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>{idea.impact}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
