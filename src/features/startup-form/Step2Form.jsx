import { ArrowLeft, Target, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Step2Form({ data, updateData, onBack, onAnalyze, isLoading }) {
  const [error, setError] = useState('');
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

  const handleAnalyzeClick = () => {
    if (data.industry === 'Other' && (!data.customIndustry || !data.customIndustry.trim())) {
      setError('Please provide your custom industry.');
      return;
    }
    if (data.targetUsers === 'Other' && (!data.customTargetUsers || !data.customTargetUsers.trim())) {
      setError('Please provide your custom target users.');
      return;
    }
    if (data.businessModel === 'Other' && (!data.customBusinessModel || !data.customBusinessModel.trim())) {
      setError('Please provide your custom business model.');
      return;
    }
    if (!data.unfairAdvantage || !data.unfairAdvantage.trim()) {
      setError('Please provide your unfair advantage. If none, write "None".');
      return;
    }
    setError('');
    onAnalyze();
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card p-8 sm:p-10 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-50/50 p-2.5 rounded-2xl border border-purple-100 shadow-sm">
          <Target className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Additional Context</h2>
          <p className="text-slate-500 text-sm">Help the AI understand your market</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Industry</label>
            <select 
              className="input-field appearance-none"
              value={data.industry}
              onChange={(e) => updateData({ industry: e.target.value })}
            >
              {industries.map(ind => <option key={ind} value={ind} className="bg-white">{ind}</option>)}
            </select>
            {data.industry === 'Other' && (
              <motion.input 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                type="text" 
                className={`input-field mt-3 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400/20 ${error && !data.customIndustry?.trim() ? 'border-rose-500 focus:ring-rose-500/20' : ''}`}
                placeholder="Type your industry..."
                value={data.customIndustry || ''}
                onChange={(e) => {
                  updateData({ customIndustry: e.target.value });
                  if (error) setError('');
                }}
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Target Users</label>
            <select 
              className="input-field appearance-none"
              value={data.targetUsers}
              onChange={(e) => updateData({ targetUsers: e.target.value })}
            >
              {targetUsersList.map(user => <option key={user} value={user} className="bg-white">{user}</option>)}
            </select>
            {data.targetUsers === 'Other' && (
              <motion.input 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                type="text" 
                className={`input-field mt-3 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400/20 ${error && !data.customTargetUsers?.trim() ? 'border-rose-500 focus:ring-rose-500/20' : ''}`}
                placeholder="Type your target users..."
                value={data.customTargetUsers || ''}
                onChange={(e) => {
                  updateData({ customTargetUsers: e.target.value });
                  if (error) setError('');
                }}
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Business Model</label>
          <select 
            className="input-field appearance-none"
            value={data.businessModel}
            onChange={(e) => updateData({ businessModel: e.target.value })}
          >
            {businessModels.map(model => <option key={model} value={model} className="bg-white">{model}</option>)}
          </select>
          {data.businessModel === 'Other' && (
            <motion.input 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              type="text" 
              className={`input-field mt-3 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400/20 ${error && !data.customBusinessModel?.trim() ? 'border-rose-500 focus:ring-rose-500/20' : ''}`}
              placeholder="Type your business model..."
              value={data.customBusinessModel || ''}
              onChange={(e) => {
                updateData({ customBusinessModel: e.target.value });
                if (error) setError('');
              }}
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Current Traction</label>
            <select 
              className="input-field appearance-none"
              value={data.traction}
              onChange={(e) => updateData({ traction: e.target.value })}
            >
              {tractionOptions.map(opt => <option key={opt} value={opt} className="bg-white">{opt}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="unfairAdvantage" className="block text-sm font-medium text-slate-700 mb-2">
              Unfair Advantage <span className="text-slate-500 font-normal">(Why you?)</span>
            </label>
            <input
              id="unfairAdvantage"
              type="text"
              className={`input-field ${error && (!data.unfairAdvantage || !data.unfairAdvantage.trim()) ? 'border-rose-500 focus:ring-rose-500/20' : ''}`}
              placeholder="e.g. 10 yrs industry exp, patent..."
              value={data.unfairAdvantage}
              onChange={(e) => {
                updateData({ unfairAdvantage: e.target.value });
                if (error) setError('');
              }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="context" className="block text-sm font-medium text-slate-700 mb-2">
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
          <div className="flex-1 flex flex-col gap-2">
            <button 
              onClick={handleAnalyzeClick}
              className="btn-primary w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-200 border-t-white rounded-full animate-spin"></span>
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Analyze My Startup
                </span>
              )}
            </button>
            {error && <p className="text-rose-500 text-sm font-medium text-center animate-in fade-in">⚠️ {error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
