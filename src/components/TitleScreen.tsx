import React from 'react';
import { motion } from 'framer-motion';
import { Route } from 'lucide-react';
interface TitleScreenProps {
  onStart: () => void;
  totalScenarios: number;
}
export function TitleScreen({ onStart, totalScenarios }: TitleScreenProps) {
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      
      <div className="mb-8 text-danger">
        <Route size={48} strokeWidth={1.5} />
      </div>

      <h1 className="text-5xl md:text-7xl font-serif text-ink mb-6 tracking-tight">
        Right of Way
      </h1>

      <p className="text-lg md:text-xl text-ink/70 max-w-md mb-12 font-sans font-light leading-relaxed">
        A short interactive exploration of the ethical tradeoffs in
        transportation and urban design.
      </p>

      <button
        onClick={onStart}
        className="group relative px-8 py-4 bg-ink text-paper font-sans font-medium text-lg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95">
        
        <span className="relative z-10">Begin the Experiment</span>
        <div className="absolute inset-0 bg-danger transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></div>
        <span className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-paper">
          Begin the Experiment
        </span>
      </button>

      <p className="mt-8 text-sm text-muted font-sans tracking-widest uppercase">
        {totalScenarios} Decisions
      </p>
    </motion.div>);

}