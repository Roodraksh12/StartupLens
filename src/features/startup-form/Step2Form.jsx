import { ArrowLeft, Target, Cpu } from 'lucide-react';

export default function Step2Form({ data, updateData, onBack, onAnalyze, isLoading }) {
  const industries = [
    "Healthcare", "EdTech", "FinTech", "Sports", "E-commerce", 
    "AgriTech", "Travel", "Real Estate", "SaaS", "Other"
  ];
  
  const targetUsersList = [
    "Students", "Professionals/Businessmen", "Consumers (B2C)", 
    "Enterprises (B2B)", "Government", "Other"
  ];
  
  const businessModels = [
    "SaaS", "Marketplace", "Subscription", "Freemium", 
    "D2C", "Commission-based", "Other"
  ];
  
  const tractionOptions = [
    "Idea Stage", "Building MVP", "Pre-revenue (Beta)", 
    "Early Revenue (<$10k/mo)", "Growth ($10k+/mo)", "Other"
  ];

  return (
    <div className="w-full max-w-2xl mx-auto glass-card p-6 sm:p-8 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan-500/20 p-2 rounded-lg border border-cyan-500/30">
          <Target className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Additional Context</h2>
          <p className="text-slate-400 text-sm">Help the AI understand your market</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Industry</label>
            <select 
              className="input-field appearance-none"
              value={data.industry}
              onChange={(e) => updateData({ industry: e.target.value })}
            >
              {industries.map(ind => <option key={ind} value={ind} className="bg-[#080d1a]">{ind}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Target Users</label>
            <select 
              className="input-field appearance-none"
              value={data.targetUsers}
              onChange={(e) => updateData({ targetUsers: e.target.value })}
            >
              {targetUsersList.map(user => <option key={user} value={user} className="bg-[#080d1a]">{user}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Business Model</label>
          <select 
            className="input-field appearance-none"
            value={data.businessModel}
            onChange={(e) => updateData({ businessModel: e.target.value })}
          >
            {businessModels.map(model => <option key={model} value={model} className="bg-[#080d1a]">{model}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Current Traction</label>
            <select 
              className="input-field appearance-none"
              value={data.traction}
              onChange={(e) => updateData({ traction: e.target.value })}
            >
              {tractionOptions.map(opt => <option key={opt} value={opt} className="bg-[#080d1a]">{opt}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="unfairAdvantage" className="block text-sm font-medium text-slate-300 mb-2">
              Unfair Advantage <span className="text-slate-500 font-normal">(Why you?)</span>
            </label>
            <input
              id="unfairAdvantage"
              type="text"
              className="input-field"
              placeholder="e.g. 10 yrs industry exp, patent..."
              value={data.unfairAdvantage}
              onChange={(e) => updateData({ unfairAdvantage: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="context" className="block text-sm font-medium text-slate-300 mb-2">
            Any additional context or constraints? <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <textarea
            id="context"
            rows={3}
            className="input-field resize-none"
            placeholder="e.g. We have $10k in funding, seeking technical co-founder..."
            value={data.context}
            onChange={(e) => updateData({ context: e.target.value })}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            onClick={onBack}
            className="btn-secondary flex items-center gap-2 px-4"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button 
            onClick={onAnalyze}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                Analyze My Startup
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
