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
                    ? "bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-110" 
                    : isPast 
                      ? "bg-white/20 text-white/90 border border-white/30" 
                      : "bg-white/5 text-slate-500 border border-white/10"
                }`}
              >
                {isPast ? "✓" : step.num}
              </div>
              <span 
                className={`ml-2 sm:ml-3 text-xs sm:text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-white" : isPast ? "text-slate-300" : "text-slate-500"
                } hidden sm:block`}
              >
                {step.label}
              </span>
              
              {index < steps.length - 1 && (
                <div 
                  className={`w-6 sm:w-12 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 ${
                    isPast ? "bg-indigo-500/50" : "bg-white/10"
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
