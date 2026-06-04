import { motion } from 'framer-motion';
import { Check, X, AlertTriangle, TrendingUp, DollarSign, Users, Target, Zap, ShieldAlert, Award, Lightbulb } from 'lucide-react';

export const SummaryCard = ({ summary }) => (
  <div className="glass-card p-6 sm:p-8 bg-slate-900 border-transparent shadow-lg">
    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
      <Target className="w-5 h-5 text-indigo-400" /> Executive Summary
    </h3>
    <p className="text-lg leading-relaxed text-slate-200">{summary}</p>
  </div>
);

export const FinalScoreCard = ({ scoreData }) => {
  const getGradeColor = (grade) => {
    switch(grade) {
      case 'S': return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'A': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'B': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'C': return 'text-amber-700 bg-amber-50 border-amber-200';
      default: return 'text-rose-700 bg-rose-50 border-rose-200';
    }
  };

  const getStrokeColor = (score) => {
    if (score >= 90) return '#a855f7';
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#3b82f6';
    if (score >= 40) return '#f59e0b';
    return '#f43f5e';
  };

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scoreData.score / 100) * circumference;

  return (
    <div className="glass-card p-6 flex flex-col items-center text-center justify-center relative overflow-hidden">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Final Validation Score</h3>
      
      <div className="relative w-40 h-40 flex items-center justify-center mb-6">
        <svg className="transform -rotate-90 w-40 h-40">
          <circle cx="80" cy="80" r={radius} className="stroke-slate-100" strokeWidth="12" fill="none" />
          <motion.circle
            cx="80" cy="80" r={radius}
            stroke={getStrokeColor(scoreData.score)}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold font-heading text-slate-900"
          >
            {scoreData.score}
          </motion.span>
          <span className="text-xs text-slate-500">/ 100</span>
        </div>
      </div>
      
      <div className="flex gap-3 items-center justify-center mb-4">
        <span className={`px-3 py-1 rounded-lg border font-bold text-xl ${getGradeColor(scoreData.grade)}`}>
          Grade {scoreData.grade}
        </span>
        <span className="badge badge-indigo text-sm px-3 py-1">{scoreData.verdict}</span>
      </div>
      
      <p className="text-slate-600 text-sm max-w-xs">{scoreData.summary}</p>
    </div>
  );
};

export const ProblemScoreCard = ({ problem }) => {
  const isGood = problem.score >= 7;
  return (
    <div className="glass-card p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" /> Problem Validation
        </h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-3xl font-bold font-heading text-slate-900">{problem.score}<span className="text-sm text-slate-500">/10</span></div>
          <span className={`badge ${isGood ? 'badge-green' : 'badge-yellow'}`}>{problem.verdict}</span>
        </div>
        <p className="text-slate-600 text-sm">{problem.reasoning}</p>
      </div>
    </div>
  );
};

export const MarketOpportunityCard = ({ market }) => (
  <div className="glass-card p-6">
    <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
      <TrendingUp className="w-5 h-5 text-emerald-600" /> Market Opportunity
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-xs text-slate-500 mb-1">India Market Size</p>
        <p className="text-lg font-bold text-slate-900">{market.indiaMarketSize}</p>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-xs text-slate-500 mb-1">Global Market Size</p>
        <p className="text-lg font-bold text-slate-900">{market.globalMarketSize}</p>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-xs text-slate-500 mb-1">Growth Rate (CAGR)</p>
        <p className="text-lg font-bold text-emerald-600">{market.growthRate}</p>
      </div>
    </div>
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3">
      <Zap className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
      <p className="text-sm text-indigo-900">{market.insight}</p>
    </div>
  </div>
);

export const SwotCard = ({ swot }) => (
  <div className="glass-card p-6">
    <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
      <Award className="w-5 h-5 text-purple-600" /> SWOT Analysis
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <h4 className="text-emerald-700 font-bold mb-3 flex items-center gap-2"><Check className="w-4 h-4"/> Strengths</h4>
        <ul className="space-y-2">
          {swot.strengths.map((s, i) => <li key={i} className="text-sm text-slate-700 flex items-start gap-2"><span className="text-emerald-500 mt-1">•</span>{s}</li>)}
        </ul>
      </div>
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
        <h4 className="text-rose-700 font-bold mb-3 flex items-center gap-2"><X className="w-4 h-4"/> Weaknesses</h4>
        <ul className="space-y-2">
          {swot.weaknesses.map((w, i) => <li key={i} className="text-sm text-slate-700 flex items-start gap-2"><span className="text-rose-500 mt-1">•</span>{w}</li>)}
        </ul>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="text-blue-700 font-bold mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Opportunities</h4>
        <ul className="space-y-2">
          {swot.opportunities.map((o, i) => <li key={i} className="text-sm text-slate-700 flex items-start gap-2"><span className="text-blue-500 mt-1">•</span>{o}</li>)}
        </ul>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h4 className="text-amber-700 font-bold mb-3 flex items-center gap-2"><ShieldAlert className="w-4 h-4"/> Threats</h4>
        <ul className="space-y-2">
          {swot.threats.map((t, i) => <li key={i} className="text-sm text-slate-700 flex items-start gap-2"><span className="text-amber-500 mt-1">•</span>{t}</li>)}
        </ul>
      </div>
    </div>
  </div>
);

export const CompetitorCard = ({ competitors }) => (
  <div className="glass-card p-6">
    <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
      <Users className="w-5 h-5 text-indigo-500" /> Competitor Analysis
    </h3>
    <div className="space-y-4">
      {competitors.map((comp, i) => (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-1">
              {comp.name}
            </h4>
            <span className={`badge ${comp.type === 'Direct' ? 'badge-red' : comp.type === 'Indirect' ? 'badge-yellow' : 'badge-blue'}`}>{comp.type}</span>
          </div>
          <div className="sm:w-2/3">
            <p className="text-sm text-slate-700 mb-2">{comp.description}</p>
            <div className="bg-rose-50 rounded p-2 text-xs text-rose-800 border border-rose-200">
              <span className="font-semibold text-rose-700">Weakness:</span> {comp.weakness}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const RisksCard = ({ risks }) => (
  <div className="glass-card p-6">
    <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
      <ShieldAlert className="w-5 h-5 text-rose-500" /> Key Risks
    </h3>
    <div className="space-y-4">
      {risks.map((risk, i) => (
        <div key={i} className="border-l-2 border-slate-300 pl-4 py-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-sm text-slate-900">{risk.risk}</h4>
            <span className={`badge ${risk.severity === 'High' ? 'badge-red' : risk.severity === 'Medium' ? 'badge-yellow' : 'badge-green'}`}>
              {risk.severity}
            </span>
          </div>
          <p className="text-xs text-slate-600"><span className="text-emerald-600 font-medium">Mitigation:</span> {risk.mitigation}</p>
        </div>
      ))}
    </div>
  </div>
);

export const ImprovementIdeasCard = ({ ideas }) => (
  <div className="glass-card p-6 bg-slate-50 border-slate-200">
    <h3 className="text-lg font-semibold text-indigo-700 mb-6 flex items-center gap-2">
      <Lightbulb className="w-5 h-5" /> Pivot & Improvement Ideas
    </h3>
    <div className="grid grid-cols-1 gap-4">
      {ideas.map((idea, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <h4 className="font-bold text-slate-900 mb-2 text-sm">{idea.idea}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">{idea.rationale}</p>
        </div>
      ))}
    </div>
  </div>
);
