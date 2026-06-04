import { useState } from 'react';
import { ArrowRight, Lightbulb } from 'lucide-react';

export default function Step1Form({ data, updateData, onNext }) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.idea || data.idea.trim().length < 10) {
      setError('Please provide a descriptive idea (at least 10 characters).');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
          <Lightbulb className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">The Core Idea</h2>
          <p className="text-slate-400 text-sm">What problem are you solving?</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
            Startup Name <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <input
            id="name"
            type="text"
            className="input-field"
            placeholder="e.g. StartupLens"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="idea" className="block text-sm font-medium text-slate-300 mb-2">
            Describe your startup idea <span className="text-rose-400">*</span>
          </label>
          <textarea
            id="idea"
            rows={5}
            className={`input-field resize-none ${error ? 'border-rose-500/50 focus:ring-rose-500/50' : ''}`}
            placeholder="We are building a platform that helps..."
            value={data.idea}
            onChange={(e) => {
              updateData({ idea: e.target.value });
              if (error) setError('');
            }}
          />
          {error && <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">⚠️ {error}</p>}
        </div>

        <button 
          onClick={handleNext}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
        >
          Continue to Context
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
