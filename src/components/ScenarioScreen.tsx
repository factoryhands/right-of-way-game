import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scenario, Choice } from '../types';
import { TrafficScene } from './TrafficScene';
import { Clock } from 'lucide-react';
interface ScenarioScreenProps {
  scenario: Scenario;
  currentIndex: number;
  total: number;
  onChoice: (choice: Choice) => void;
}
export function ScenarioScreen({
  scenario,
  currentIndex,
  total,
  onChoice
}: ScenarioScreenProps) {
  const [timeLeft, setTimeLeft] = useState(15);
  const [hasChosen, setHasChosen] = useState(false);
  useEffect(() => {
    setTimeLeft(15);
    setHasChosen(false);
  }, [scenario]);
  useEffect(() => {
    if (hasChosen || timeLeft <= 0) {
      if (timeLeft <= 0 && !hasChosen) {
        handleChoice(scenario.choices.inaction);
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, hasChosen, scenario]);
  const handleChoice = (choice: Choice) => {
    setHasChosen(true);
    onChoice(choice);
  };
  return (
    <motion.div
      key={scenario.id}
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: -20
      }}
      className="max-w-4xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <span className="text-sm font-sans tracking-widest uppercase text-muted">
          Decision {currentIndex + 1} of {total}
        </span>
        <div
          className={`flex items-center gap-2 text-sm font-sans font-medium ${timeLeft <= 5 ? 'text-danger' : 'text-ink/60'}`}>
          
          <Clock size={16} />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-ink/10 rounded-full mb-12 overflow-hidden">
        <motion.div
          className="h-full bg-ink"
          initial={{
            width: `${currentIndex / total * 100}%`
          }}
          animate={{
            width: `${(currentIndex + 1) / total * 100}%`
          }}
          transition={{
            duration: 0.5
          }} />
        
      </div>

      <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
        {/* Narrative */}
        <div className="md:col-span-2 flex flex-col">
          <h2 className="text-3xl md:text-4xl font-serif text-ink mb-4 leading-tight">
            {scenario.title}
          </h2>
          <p className="text-lg text-ink/80 font-sans leading-relaxed mb-8">
            {scenario.description}
          </p>
        </div>

        {/* Scene & Choices */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <TrafficScene config={scenario.sceneConfig} animationState="idle" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <button
              onClick={() => handleChoice(scenario.choices.inaction)}
              disabled={hasChosen}
              className="p-4 border border-ink/20 rounded-xl text-left hover:bg-ink/5 hover:border-ink/40 transition-all active:scale-[0.98] disabled:opacity-50">
              
              <span className="block text-sm text-muted uppercase tracking-wider mb-1">
                Status Quo
              </span>
              <span className="block text-lg font-medium text-ink">
                {scenario.choices.inaction.label}
              </span>
            </button>

            <button
              onClick={() => handleChoice(scenario.choices.action)}
              disabled={hasChosen}
              className="p-4 border border-danger/30 bg-danger/5 rounded-xl text-left hover:bg-danger/10 hover:border-danger/50 transition-all active:scale-[0.98] disabled:opacity-50">
              
              <span className="block text-sm text-danger/70 uppercase tracking-wider mb-1">
                Intervene
              </span>
              <span className="block text-lg font-medium text-danger">
                {scenario.choices.action.label}
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>);

}