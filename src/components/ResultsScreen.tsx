import React from 'react';
import { motion } from 'framer-motion';
import { GameState } from '../types';
import { RotateCcw, Route, HeartPulse, Skull } from 'lucide-react';
import { scenarios } from '../data/scenarios';
interface ResultsScreenProps {
  gameState: GameState;
  onRestart: () => void;
}
export function ResultsScreen({ gameState, onRestart }: ResultsScreenProps) {
  // Calculate ethical profile
  const calculateProfile = () => {
    let utilitarianScore = 0;
    let actionScore = 0;
    let partialityScore = 0;
    gameState.choicesMade.forEach((choiceRecord) => {
      const scenario = scenarios.find((s) => s.id === choiceRecord.scenarioId);
      if (!scenario) return;
      const choice = scenario.choices[choiceRecord.choiceId];
      if (choice.ethicalTags.includes('utilitarian')) utilitarianScore++;
      if (choice.ethicalTags.includes('active')) actionScore++;
      if (choice.ethicalTags.includes('partiality')) partialityScore++;
    });
    const total = gameState.choicesMade.length;
    if (actionScore === 0) {
      return {
        title: 'The Status Quo Planner',
        description:
        'You consistently deferred to existing infrastructure and driver convenience. Your planning framework prioritizes not disrupting the flow of traffic, even if inaction leads to greater overall tragedy. You believe that maintaining the system is fundamentally different from actively changing it.'
      };
    }
    if (utilitarianScore >= total - 1) {
      return {
        title: 'The Vision Zero Advocate',
        description:
        'You consistently chose the path that maximized survival, regardless of the method or disruption. You view urban design as a math equation where the safety of the vulnerable always outweighs the convenience of drivers, even if it requires drastic interventions.'
      };
    }
    if (actionScore > 0 && utilitarianScore < total / 2) {
      return {
        title: 'The Civil Libertarian',
        description:
        'You are willing to intervene, but you draw hard lines against surveillance, coercion, or displacement. You likely refused to install speed cameras or bulldoze neighborhoods. You believe certain planning actions are inherently wrong, regardless of their safety outcomes.'
      };
    }
    if (partialityScore > 0 && utilitarianScore > total / 2) {
      return {
        title: 'The Pragmatic Planner',
        description:
        'You generally aim for the greater good, but you recognize the limits of cold calculation. You make exceptions for vulnerable communities or particularly disruptive economic impacts. You balance safety metrics with human empathy and local context.'
      };
    }
    return {
      title: 'The Context-Dependent Designer',
      description:
      "Your choices don't fit neatly into a single planning philosophy. You weigh each situation individually, balancing the desire to save lives with an aversion to systemic disruption and respect for community rights."
    };
  };
  const profile = calculateProfile();
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      className="max-w-3xl mx-auto w-full px-4 py-12 flex flex-col items-center">
      
      <div className="mb-6 text-ink/40">
        <Route size={48} strokeWidth={1.5} />
      </div>

      <h2 className="text-sm font-sans tracking-widest uppercase text-muted mb-4">
        Your Ethical Profile
      </h2>

      <h1 className="text-4xl md:text-5xl font-serif text-ink mb-6 text-center">
        {profile.title}
      </h1>

      <p className="text-lg text-ink/80 text-center max-w-2xl leading-relaxed mb-12">
        {profile.description}
      </p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-12">
        <div className="bg-safe/10 border border-safe/20 p-6 rounded-2xl flex flex-col items-center text-center">
          <HeartPulse className="text-safe mb-3" size={28} />
          <span className="text-4xl font-serif text-safe mb-1">
            {gameState.totalLivesSaved}
          </span>
          <span className="text-sm text-safe/80 uppercase tracking-wider font-medium">
            Lives Saved
          </span>
        </div>
        <div className="bg-danger/10 border border-danger/20 p-6 rounded-2xl flex flex-col items-center text-center">
          <Skull className="text-danger mb-3" size={28} />
          <span className="text-4xl font-serif text-danger mb-1">
            {gameState.totalLivesLost}
          </span>
          <span className="text-sm text-danger/80 uppercase tracking-wider font-medium">
            Lives Lost
          </span>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="flex items-center gap-2 px-8 py-4 border-2 border-ink text-ink font-medium rounded-full hover:bg-ink hover:text-paper transition-colors active:scale-95">
        
        <RotateCcw size={18} />
        <span>Begin Again</span>
      </button>
    </motion.div>);

}