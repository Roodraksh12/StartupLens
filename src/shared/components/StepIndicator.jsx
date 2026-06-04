export default function StepIndicator({ currentStep }) {
  const steps = [
    { num: 1, label: "Core Idea" },
    { num: 2, label: "Context" },
    { num: 3, label: "Results" }
  ];

  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center space-x-2 sm:space-x-4">
        {steps.map((step, index) => {
          const isActive = step.num === currentStep;
          const isPast = step.num < currentStep;
          
          return (
            <div key={step.num} className="flex items-center">
              <div 
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${
                  isActive 
                    ? "bg-slate-900 text-white shadow-md scale-110" 
                    : isPast 
                      ? "bg-slate-100 text-slate-900 border border-slate-300" 
                      : "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                {isPast ? "✓" : step.num}
              </div>
              <span 
                className={`ml-2 sm:ml-3 text-xs sm:text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-slate-900" : isPast ? "text-slate-600" : "text-slate-400"
                } hidden sm:block`}
              >
                {step.label}
              </span>
              
              {index < steps.length - 1 && (
                <div 
                  className={`w-6 sm:w-12 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 ${
                    isPast ? "bg-slate-300" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
