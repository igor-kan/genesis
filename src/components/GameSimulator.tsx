import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Character, GameState, LifeEvent } from '@/models/gameTypes';
import { createCharacter, initializeGameState, simulateYear, makeChoice } from '@/lib/gameEngine';
import CharacterCreation from './CharacterCreation';
import CharacterStats from './CharacterStats';
import CharacterProfile from './CharacterProfile';
import EventCard from './EventCard';
import GameControls from './GameControls';
import FamilyTree from './FamilyTree';
import CountryInfo from './CountryInfo';
import GameSummary from './GameSummary';
import EnhancedCharacterCreation from './EnhancedCharacterCreation';
import { 
  createEnhancedCharacter, 
  initializeEnhancedGameState, 
  simulateEnhancedYear, 
  makeChoice 
} from '@/lib/enhancedGameEngine';

interface CharacterCreationData {
  name: string;
  gender: 'male' | 'female';
  sexualOrientation: any;
  country: string;
  personalityTraits: any[];
  lifeValues: any[];
  gameMode: any;
  researchDataConsent: boolean;
  scenario?: string;
}

const GameSimulator: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showCharacterCreation, setShowCharacterCreation] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const { toast } = useToast();
  
  // Start the game with a new character
  const startGame = useCallback((characterData: CharacterCreationData) => {
    const newCharacter = createEnhancedCharacter(
      characterData.name,
      characterData.gender,
      characterData.sexualOrientation,
      characterData.country,
      characterData.personalityTraits,
      characterData.lifeValues
    );
    
    const newGameState = initializeEnhancedGameState(newCharacter, characterData.gameMode);
    newGameState.researchDataConsent = characterData.researchDataConsent;
    
    setGameState(newGameState);
    setShowCharacterCreation(false);
    
    toast({
      title: "Welcome to Your Enhanced Life Journey",
      description: `Your story begins as an 18-year-old in ${newCharacter.country.name}. Your ${newCharacter.personalityTraits.join(', ')} personality and values will shape your decisions.`,
    });
  }, [toast]);
  
  // Handle a year passing in the simulation
  const handleAdvanceYear = useCallback(() => {
    if (!gameState) return;
    
    const updatedGameState = simulateEnhancedYear(gameState);
    setGameState(updatedGameState);
    
    // Check if an event occurred
    if (updatedGameState.currentEvent && !gameState.currentEvent) {
      toast({
        title: "New Life Event",
        description: "A decision awaits you!",
      });
    }
    
    // Check if game is over
    if (updatedGameState.gameOver && !gameState.gameOver) {
      toast({
        title: "Life Journey Complete",
        description: "You've reached the end of your simulated life.",
      });
      setShowSummary(true);
    }
  }, [gameState, toast]);
  
  // Handle player's choice in an event
  const handleEventChoice = useCallback((choiceIndex: number) => {
    if (!gameState || !gameState.currentEvent) return;
    
    const updatedGameState = makeChoice(
      gameState,
      gameState.currentEvent.type,
      choiceIndex
    );
    
    setGameState(updatedGameState);
    
    toast({
      title: "Decision Made",
      description: "Your choice will affect your life path.",
    });
  }, [gameState, toast]);
  
  // Toggle game pause state
  const togglePause = useCallback(() => {
    if (!gameState) return;
    setGameState({ ...gameState, paused: !gameState.paused });
  }, [gameState]);
  
  // Change game speed
  const changeGameSpeed = useCallback((speed: number) => {
    if (!gameState) return;
    setGameState({ ...gameState, gameSpeed: speed });
  }, [gameState]);
  
  // Reset the game
  const resetGame = useCallback(() => {
    setGameState(null);
    setShowCharacterCreation(true);
    setShowSummary(false);
  }, []);
  
  // Auto-advance years based on game speed and pause state
  useEffect(() => {
    if (!gameState || gameState.paused || gameState.gameOver || gameState.currentEvent) {
      return;
    }
    
    const interval = setInterval(() => {
      handleAdvanceYear();
    }, 3000 / gameState.gameSpeed);
    
    return () => clearInterval(interval);
  }, [gameState, handleAdvanceYear]);
  
  // If character creation is shown, render that
  if (showCharacterCreation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-blue-100 p-4">
        <EnhancedCharacterCreation onComplete={startGame} />
      </div>
    );
  }
  
  // If no game state, show loading
  if (!gameState) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100">
        <div className="animate-pulse text-indigo-700 font-medium">Loading simulation...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-indigo-800">
        Life Choices: Enhanced Family Simulator
      </h1>
      
      {/* Game Summary Overlay */}
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <GameSummary 
            character={gameState.character}
            decisions={gameState.decisions}
            onRestart={resetGame}
            onClose={() => setShowSummary(false)}
          />
        </div>
      )}
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Enhanced Character Info */}
        <div className="space-y-6">
          <CharacterProfile 
            character={gameState.character} 
            currentYear={gameState.currentYear} 
          />
          <FamilyTree character={gameState.character} />
          
          {/* New: Personality & Values Display */}
          <div className="bg-white rounded-xl shadow-md p-4 border-2 border-purple-100">
            <h3 className="text-lg font-semibold mb-3 text-purple-800">Personality & Values</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-700">Traits:</p>
                <div className="flex flex-wrap gap-1">
                  {gameState.character.personalityTraits.map(trait => (
                    <span key={trait} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Values:</p>
                <div className="flex flex-wrap gap-1">
                  {gameState.character.lifeValues.map(value => (
                    <span key={value} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <GameControls 
            gameSpeed={gameState.gameSpeed}
            isPaused={gameState.paused}
            onPauseToggle={togglePause}
            onSpeedChange={changeGameSpeed}
            onAdvanceYear={handleAdvanceYear}
            onReset={resetGame}
          />
        </div>
        
        {/* Middle Column - Current Event and Stats */}
        <div className="space-y-6 flex flex-col items-center">
          {gameState.currentEvent ? (
            <EventCard 
              event={gameState.currentEvent} 
              onChoice={handleEventChoice} 
            />
          ) : (
            <div className="w-full bg-white rounded-xl shadow-md p-6 text-center border-2 border-blue-100">
              <p className="text-lg">
                {gameState.gameOver 
                  ? "Your life journey is complete. View your summary."
                  : "Living life... waiting for the next decision point."}
              </p>
              {gameState.gameOver && (
                <button 
                  onClick={() => setShowSummary(true)}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  View Life Summary
                </button>
              )}
            </div>
          )}
          <CharacterStats character={gameState.character} />
        </div>
        
        {/* Right Column - Country Info */}
        <div className="space-y-6">
          <CountryInfo country={gameState.character.country} />
          
          {/* Enhanced Research Info */}
          <div className="bg-white rounded-xl shadow-md p-4 border-2 border-indigo-100">
            <h3 className="text-lg font-semibold mb-3 text-indigo-800">Research Project</h3>
            <p className="text-sm text-gray-600 mb-4">
              This enhanced simulation captures detailed decision-making patterns including personality influences, 
              cultural factors, and economic conditions affecting family planning decisions.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-indigo-50 p-2 rounded-md">
                <span className="text-sm font-medium">Decisions recorded:</span>
                <span className="bg-indigo-100 px-2 py-1 rounded-full text-indigo-800 font-bold">
                  {gameState.decisions.length}
                </span>
              </div>
              <div className="flex items-center justify-between bg-green-50 p-2 rounded-md">
                <span className="text-sm font-medium">Data consent:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  gameState.researchDataConsent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {gameState.researchDataConsent ? 'Granted' : 'Not granted'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSimulator;
