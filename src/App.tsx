import React, { useState } from 'react';
import { GameState, Choice } from './types';
import { scenarios } from './data/scenarios';
import { TitleScreen } from './components/TitleScreen';
import { ScenarioScreen } from './components/ScenarioScreen';
import { OutcomeScreen } from './components/OutcomeScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { AnimatePresence } from 'framer-motion';
const initialState: GameState = {
  screen: 'title',
  currentScenarioIndex: 0,
  choicesMade: [],
  totalLivesSaved: 0,
  totalLivesLost: 0
};
export function App() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [currentChoice, setCurrentChoice] = useState<Choice | null>(null);
  const handleStart = () => {
    setGameState({
      ...initialState,
      screen: 'scenario'
    });
  };
  const handleChoice = (choice: Choice) => {
    setCurrentChoice(choice);
    setGameState((prev) => ({
      ...prev,
      screen: 'outcome',
      choicesMade: [
      ...prev.choicesMade,
      {
        scenarioId: scenarios[prev.currentScenarioIndex].id,
        choiceId: choice.id
      }],

      totalLivesSaved: prev.totalLivesSaved + choice.livesSaved,
      totalLivesLost: prev.totalLivesLost + choice.livesLost
    }));
  };
  const handleContinue = () => {
    if (gameState.currentScenarioIndex < scenarios.length - 1) {
      setGameState((prev) => ({
        ...prev,
        screen: 'scenario',
        currentScenarioIndex: prev.currentScenarioIndex + 1
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        screen: 'results'
      }));
    }
    setCurrentChoice(null);
  };
  const handleRestart = () => {
    setGameState(initialState);
    setCurrentChoice(null);
  };
  return (
    <div className="min-h-screen bg-noise content-relative flex flex-col selection:bg-highlight/40">
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <AnimatePresence mode="wait">
          {gameState.screen === 'title' &&
          <TitleScreen
            key="title"
            onStart={handleStart}
            totalScenarios={scenarios.length} />

          }

          {gameState.screen === 'scenario' &&
          <ScenarioScreen
            key={`scenario-${gameState.currentScenarioIndex}`}
            scenario={scenarios[gameState.currentScenarioIndex]}
            currentIndex={gameState.currentScenarioIndex}
            total={scenarios.length}
            onChoice={handleChoice} />

          }

          {gameState.screen === 'outcome' && currentChoice &&
          <OutcomeScreen
            key={`outcome-${gameState.currentScenarioIndex}`}
            scenario={scenarios[gameState.currentScenarioIndex]}
            choice={currentChoice}
            onContinue={handleContinue} />

          }

          {gameState.screen === 'results' &&
          <ResultsScreen
            key="results"
            gameState={gameState}
            onRestart={handleRestart} />

          }
        </AnimatePresence>
      </main>
    </div>);

}