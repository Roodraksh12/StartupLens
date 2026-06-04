import { useState } from 'react';
import Header from './shared/components/Header';
import StepIndicator from './shared/components/StepIndicator';
import Step1Form from './features/startup-form/Step1Form';
import Step2Form from './features/startup-form/Step2Form';
import LoadingState from './shared/components/LoadingState';
import ResultsDashboard from './features/dashboard/ResultsDashboard';
import { evaluateStartup } from './services/ai/gemini';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    idea: '',
    name: '',
    industry: 'Healthcare',
    targetUsers: 'Consumers (B2C)',
    businessModel: 'SaaS',
    context: '',
    traction: 'Idea Stage',
    unfairAdvantage: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError('');
    setCurrentStep(3); // Move to results step to show loading state
    
    try {
      const data = await evaluateStartup(formData);
      setResults(data);
    } catch (err) {
      console.error(err);
      let errorMessage = err.message || 'Something went wrong. Please check your API key or try again.';
      try {
        const parsed = JSON.parse(err.message);
        if (parsed.error && parsed.error.message) {
          errorMessage = parsed.error.message;
        }
      } catch (e) {
        // Not a JSON string, keep the original message
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      idea: '',
      name: '',
      industry: 'Healthcare',
      targetUsers: 'Consumers (B2C)',
      businessModel: 'SaaS',
      context: '',
      traction: 'Idea Stage',
      unfairAdvantage: ''
    });
    setResults(null);
    setError('');
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fbfbfd]">
      {/* Premium Apple-style soft mesh gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/10 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/10 blur-[140px] pointer-events-none" />
      <div className="fixed top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-400/5 blur-[120px] pointer-events-none" />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <StepIndicator currentStep={currentStep} />
        
        <div className="mt-8 transition-all duration-500">
          {currentStep === 1 && (
            <Step1Form 
              data={formData} 
              updateData={updateFormData} 
              onNext={() => setCurrentStep(2)} 
            />
          )}
          
          {currentStep === 2 && (
            <Step2Form 
              data={formData} 
              updateData={updateFormData} 
              onBack={() => setCurrentStep(1)}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          )}
          
          {currentStep === 3 && (
            <>
              {isLoading && <LoadingState />}
              
              {error && !isLoading && (
                <div className="w-full max-w-2xl mx-auto glass-card p-8 text-center border-rose-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 mb-6">
                    <AlertCircle className="w-8 h-8 text-rose-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Analysis Failed</h2>
                  <p className="text-slate-600 mb-8">{error}</p>
                  <button onClick={() => setCurrentStep(2)} className="btn-primary">
                    Try Again
                  </button>
                </div>
              )}
              
              {!isLoading && !error && results && (
                <ResultsDashboard results={results} onReset={handleReset} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
