
import { Character, CharacterStats, Country, GameState, Gender, LifeEvent, PlayerDecision } from "../models/gameTypes";
import { getCountry } from "../data/countries";
import { createEvent, getLifeStageEvents, baseEvents } from "../data/events";

// Initialize a new character
export const createCharacter = (name: string, gender: Gender, countryName: string): Character => {
  const country = getCountry(countryName);
  
  return {
    name,
    gender,
    age: 18,
    educationLevel: 'highSchool',
    relationshipStatus: 'single',
    children: [],
    country,
    stats: {
      health: 100,
      happiness: 70,
      energy: 90,
      finances: 50,
      workEthic: 60,
      relationshipSatisfaction: 50,
      parentingSkills: 10,
      fertility: gender === 'female' ? 
        Math.min(100, Math.max(20, Math.floor(Math.random() * 60) + 40)) : // female fertility (40-100)
        Math.min(100, Math.max(50, Math.floor(Math.random() * 50) + 50))   // male fertility (50-100)
    },
    events: []
  };
};

// Initialize a new game state
export const initializeGameState = (character: Character): GameState => {
  return {
    character,
    gameSpeed: 1,
    paused: false,
    currentYear: new Date().getFullYear(),
    gameOver: false,
    decisions: []
  };
};

// Update character stats based on life events
export const updateCharacterStats = (stats: CharacterStats, effects: Partial<CharacterStats>): CharacterStats => {
  const updatedStats = { ...stats };
  
  // Apply effects to stats
  Object.entries(effects).forEach(([key, value]) => {
    if (key in updatedStats && typeof value === 'number') {
      const currentValue = updatedStats[key as keyof CharacterStats] as number;
      const newValue = Math.max(0, Math.min(100, currentValue + value));
      updatedStats[key as keyof CharacterStats] = newValue;
    }
  });
  
  return updatedStats;
};

// Update character age and apply time-based changes
export const ageCharacter = (character: Character): Character => {
  const updatedCharacter = { ...character };
  updatedCharacter.age += 1;
  
  // Apply age-related changes
  if (updatedCharacter.gender === 'female' && updatedCharacter.age > 35) {
    // Decrease fertility gradually after 35
    updatedCharacter.stats.fertility = Math.max(0, updatedCharacter.stats.fertility - 4);
  }
  
  if (updatedCharacter.gender === 'male' && updatedCharacter.age > 45) {
    // Decrease fertility very gradually after 45
    updatedCharacter.stats.fertility = Math.max(0, updatedCharacter.stats.fertility - 2);
  }
  
  // Health naturally decreases with age
  if (updatedCharacter.age > 40) {
    updatedCharacter.stats.health = Math.max(0, updatedCharacter.stats.health - 1);
  }
  
  return updatedCharacter;
};

// Generate a random event based on character's current life stage
export const generateRandomEvent = (character: Character, currentYear: number): LifeEvent | null => {
  // Get possible events for the character's age
  const possibleEvents = getLifeStageEvents(character.age);
  
  // Filter events based on character's state
  const filteredEvents = possibleEvents.filter(eventType => {
    const event = baseEvents[eventType];
    
    // Filter out events that don't make sense for the character
    if (eventType === 'marriageProposal' && character.relationshipStatus !== 'dating') {
      return false;
    }
    
    if (eventType === 'considerChildren' && 
        (character.relationshipStatus !== 'married' || 
         character.children.length > 0)) {
      return false;
    }
    
    if (eventType === 'childEducation' && character.children.length === 0) {
      return false;
    }
    
    return true;
  });
  
  // If no suitable events, return null
  if (filteredEvents.length === 0) {
    return null;
  }
  
  // Choose a random event from filtered list
  const randomEventType = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
  
  // Create the event with current timestamp
  return createEvent(randomEventType, currentYear);
};

// Record a player decision
export const recordDecision = (
  gameState: GameState,
  eventType: string,
  choiceText: string
): PlayerDecision => {
  const { character } = gameState;
  
  const decision: PlayerDecision = {
    event: eventType,
    choice: choiceText,
    character: {
      age: character.age,
      gender: character.gender,
      educationLevel: character.educationLevel,
      relationshipStatus: character.relationshipStatus,
      children: character.children.length
    },
    country: character.country.name,
    timestamp: Date.now()
  };
  
  return decision;
};

// Make a game choice and update the game state
export const makeChoice = (
  gameState: GameState,
  eventType: string,
  choiceIndex: number
): GameState => {
  const { character, currentEvent } = gameState;
  
  if (!currentEvent || !currentEvent.choices) {
    return gameState;
  }
  
  const choice = currentEvent.choices[choiceIndex];
  if (!choice) {
    return gameState;
  }
  
  // Update character stats based on choice
  const updatedStats = updateCharacterStats(character.stats, choice.effect);
  
  // Record the decision
  const decision = recordDecision(gameState, eventType, choice.text);
  
  // Update game state
  return {
    ...gameState,
    character: {
      ...character,
      stats: updatedStats,
      events: [...character.events, currentEvent]
    },
    decisions: [...gameState.decisions, decision],
    currentEvent: undefined
  };
};

// Simulate one year of game time
export const simulateYear = (gameState: GameState): GameState => {
  if (gameState.paused || gameState.gameOver) {
    return gameState;
  }
  
  // Age the character
  const agedCharacter = ageCharacter(gameState.character);
  
  // Generate a random event
  const event = generateRandomEvent(agedCharacter, gameState.currentYear);
  
  // Check for game over conditions
  const gameOver = agedCharacter.age >= 80;
  
  return {
    ...gameState,
    character: agedCharacter,
    currentYear: gameState.currentYear + 1,
    currentEvent: event || undefined,
    gameOver
  };
};
