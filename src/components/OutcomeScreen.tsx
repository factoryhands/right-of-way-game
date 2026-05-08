import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scenario, Choice } from '../types';
import { TrafficScene } from './TrafficScene';
import { ArrowRight, Users, HeartPulse, Skull } from 'lucide-react';
interface OutcomeScreenProps {
  scenario: Scenario;
  choice: Choice;
  onContinue: () => void;
}
export function OutcomeScreen({
  scenario,
  choice,
  onContinue
}: OutcomeScreenProps) {
  const [showStats, setShowStats] = useState(false);
  useEffect(() => {
    // Wait for trolley animation to finish before showing stats
    const timer = setTimeout(() => {
      setShowStats(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col">
      <h2 className="text-2xl font-serif text-ink mb-8 text-center">
        Years Later
      </h2>

      <div className="mb-12">
        <TrafficScene
          config={scenario.sceneConfig}
          animationState={
          choice.animationPath === 'top' ?
          'moving-top' :
          choice.animationPath === 'bottom' ?
          'moving-bottom' :
          choice.animationPath === 'stop' ?
          'stop' :
          'moving-straight'
          } />
        
      </div>

      {showStats &&
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="grid md:grid-cols-2 gap-8 md:gap-12">
        
          <div className="flex flex-col">
            <p className="text-xl font-serif text-ink leading-relaxed mb-6">
              {choice.outcomeText}
            </p>

            <div className="flex gap-6 mb-8">
              <div className="flex items-center gap-2 text-safe">
                <HeartPulse size={20} />
                <span className="font-medium">
                  {choice.livesSaved} Saved/yr
                </span>
              </div>
              <div className="flex items-center gap-2 text-danger">
                <Skull size={20} />
                <span className="font-medium">{choice.livesLost} Lost/yr</span>
              </div>
            </div>

            <div className="p-5 bg-ink/5 rounded-xl border border-ink/10">
              <p className="text-sm text-ink/80 font-sans leading-relaxed italic">
                "{choice.moralCommentary}"
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="bg-paper border border-ink/10 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 text-muted mb-4">
                <Users size={18} />
                <span className="text-sm uppercase tracking-wider font-medium">
                  Planner Consensus
                </span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-serif text-ink">
                  {choice.communityStat}%
                </span>
                <span className="text-ink/60 mb-1">of planners</span>
              </div>
              <p className="text-sm text-ink/80">
                made the same decision to{' '}
                <strong className="font-medium">
                  {choice.label.toLowerCase()}
                </strong>
                .
              </p>
            </div>

            <button
            onClick={onContinue}
            className="mt-8 w-full py-4 bg-ink text-paper rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-ink/90 transition-colors active:scale-[0.98]">
            
              <span>Continue</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      }
    </div>);

}