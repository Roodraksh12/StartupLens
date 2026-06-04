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

  return (
    <div className="w-full max-w-6xl mx-auto pb-16">
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div variants={itemVariants} className="md:col-span-2">
          <SummaryCard summary={results.startupSummary} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <FinalScoreCard scoreData={results.finalScore} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col gap-6">
          <ProblemScoreCard problem={results.problemScore} />
          <InvestorReadinessCard readiness={results.investorReadiness} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="md:col-span-2">
          <MarketOpportunityCard market={results.marketOpportunity} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="md:col-span-2">
          <SwotCard swot={results.swot} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="md:col-span-2">
          <CompetitorCard competitors={results.competitorAnalysis} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <RisksCard risks={results.risks} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ImprovementIdeasCard ideas={results.improvementIdeas} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="md:col-span-2">
          <MonetizationCard models={results.monetizationIdeas} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="md:col-span-2">
          <MvpRoadmapCard mvp={results.mvpSuggestions} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="md:col-span-2">
          <BusinessModelCard model={results.businessModelGenerator} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="md:col-span-2">
          <GoToMarketCard gtm={results.goToMarket} />
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-12 flex justify-center"
      >
        <button 
          onClick={onReset}
          className="btn-secondary flex items-center gap-2 border-indigo-500/30 hover:border-indigo-500/60"
        >
          <RotateCcw className="w-4 h-4 text-indigo-400" />
          Evaluate Another Idea
        </button>
      </motion.div>
    </div>
  );
}
