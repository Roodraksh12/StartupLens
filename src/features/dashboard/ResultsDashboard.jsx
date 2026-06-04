import { motion } from 'framer-motion';
import { 
  SummaryCard, FinalScoreCard, ProblemScoreCard, 
  MarketOpportunityCard, SwotCard, CompetitorCard, 
  RisksCard, ImprovementIdeasCard 
} from './ResultCards';
import { 
  MonetizationCard, MvpRoadmapCard, InvestorReadinessCard, 
  BusinessModelCard, GoToMarketCard 
} from './ResultCards2';
import { RotateCcw } from 'lucide-react';

export default function ResultsDashboard({ results, onReset }) {
  if (!results) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const SectionHeader = ({ title, subtitle }) => (
    <div className="mb-6 mt-12 border-b border-slate-200 pb-4">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto pb-16">
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="space-y-12"
      >
        {/* Section 1: The Verdict */}
        <motion.div variants={itemVariants}>
          <SectionHeader 
            title="1. The Verdict" 
            subtitle="Executive summary and viability scores."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <SummaryCard summary={results.startupSummary} />
            </div>
            <FinalScoreCard scoreData={results.finalScore} />
            <div className="flex flex-col gap-6">
              <ProblemScoreCard problem={results.problemScore} />
              <InvestorReadinessCard readiness={results.investorReadiness} />
            </div>
          </div>
        </motion.div>

        {/* Section 2: Market Reality */}
        <motion.div variants={itemVariants}>
          <SectionHeader 
            title="2. Market Reality" 
            subtitle="Deep dive into the competitive landscape and macro risks."
          />
          <div className="grid grid-cols-1 gap-6">
            <MarketOpportunityCard market={results.marketOpportunity} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SwotCard swot={results.swot} />
              <RisksCard risks={results.risks} />
            </div>
            <CompetitorCard competitors={results.competitorAnalysis} />
          </div>
        </motion.div>

        {/* Section 3: Execution Strategy */}
        <motion.div variants={itemVariants}>
          <SectionHeader 
            title="3. Execution Strategy" 
            subtitle="Actionable steps to build, launch, and monetize."
          />
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BusinessModelCard model={results.businessModelGenerator} />
              <div className="flex flex-col gap-6">
                <ImprovementIdeasCard ideas={results.improvementIdeas} />
                <MonetizationCard models={results.monetizationIdeas} />
              </div>
            </div>
            <GoToMarketCard gtm={results.goToMarket} />
            <MvpRoadmapCard mvp={results.mvpSuggestions} />
          </div>
        </motion.div>

      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-16 flex justify-center"
      >
        <button 
          onClick={onReset}
          className="btn-secondary flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Evaluate Another Idea
        </button>
      </motion.div>
    </div>
  );
}
