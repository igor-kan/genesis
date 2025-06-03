
import { 
  Character, 
  CharacterStats, 
  Country, 
  GameState, 
  Gender, 
  LifeEvent, 
  PlayerDecision,
  PersonalityTrait,
  LifeValue,
  SexualOrientation,
  HiddenAttributes,
  GameMode,
  FertilityEvent,
  EconomicEvent,
  Achievement
} from "../models/gameTypes";
import { getCountry } from "../data/countries";
import { createEnhancedEvent, getLifeStageEvents } from "../data/enhancedEvents";

// Enhanced character creation
export const createEnhancedCharacter = (
  name: string, 
  gender: Gender, 
  sexualOrientation: SexualOrientation,
  countryName: string,
  personalityTraits: PersonalityTrait[],
  lifeValues: LifeValue[]
): Character => {
  const country = getCountry(countryName);
  
  // Generate hidden attributes based on personality and values
  const hiddenAttributes: HiddenAttributes = {
    fertilityPotential: generateFertilityPotential(gender, personalityTraits),
    mentalHealthPredisposition: generateMentalHealthPredisposition(personalityTraits),
    familyValuesInfluence: lifeValues.includes('family') ? Math.random() * 30 + 70 : Math.random() * 50 + 25,
    careerAmbition: personalityTraits.includes('ambitious') ? Math.random() * 30 + 70 : Math.random() * 60 + 20,
    adaptability: personalityTraits.includes('adventurous') ? Math.random() * 30 + 70 : Math.random() * 50 + 25,
    socialNeed: personalityTraits.includes('social') ? Math.random() * 30 + 70 : Math.random() * 50 + 25
  };
  
  return {
    name,
    gender,
    sexualOrientation,
    age: 18,
    educationLevel: 'highSchool',
    relationshipStatus: 'single',
    children: [],
    country,
    personalityTraits,
    lifeValues,
    hiddenAttributes,
    mentalHealthHistory: [],
    socialCircle: [],
    stats: {
      health: 100,
      happiness: calculateInitialHappiness(personalityTraits, lifeValues),
      energy: 90,
      finances: calculateInitialFinances(country),
      workEthic: personalityTraits.includes('ambitious') ? 80 : 60,
      relationshipSatisfaction: 50,
      parentingSkills: personalityTraits.includes('nurturing') ? 30 : 10,
      fertility: calculateInitialFertility(gender, hiddenAttributes.fertilityPotential),
      stress: 20,
      socialConnections: personalityTraits.includes('social') ? 70 : 40,
      workLifeBalance: 60,
      educationQuality: 70
    },
    events: []
  };
};

// Helper functions for character generation
const generateFertilityPotential = (gender: Gender, traits: PersonalityTrait[]): number => {
  let base = gender === 'female' ? 85 : 90;
  if (traits.includes('nurturing')) base += 10;
  if (traits.includes('stable')) base += 5;
  return Math.min(100, base + (Math.random() * 20 - 10));
};

const generateMentalHealthPredisposition = (traits: PersonalityTrait[]): number => {
  let base = 50;
  if (traits.includes('stable')) base -= 15;
  if (traits.includes('ambitious')) base += 10;
  if (traits.includes('social')) base -= 5;
  return Math.max(0, Math.min(100, base + (Math.random() * 30 - 15)));
};

const calculateInitialHappiness = (traits: PersonalityTrait[], values: LifeValue[]): number => {
  let happiness = 70;
  if (traits.includes('nurturing')) happiness += 10;
  if (traits.includes('social')) happiness += 5;
  if (values.includes('health')) happiness += 5;
  return Math.min(100, happiness);
};

const calculateInitialFinances = (country: Country): number => {
  const base = 50;
  const countryModifier = (country.economy.averageSalary / 50000) * 20;
  return Math.max(20, Math.min(80, base + countryModifier));
};

const calculateInitialFertility = (gender: Gender, potential: number): number => {
  const ageModifier = 1.0; // 18 years old, no age penalty
  return Math.floor(potential * ageModifier);
};

// Enhanced game state initialization
export const initializeEnhancedGameState = (
  character: Character,
  mode: GameMode = 'sandbox'
): GameState => {
  return {
    character,
    gameSpeed: 1,
    paused: false,
    currentYear: new Date().getFullYear(),
    gameOver: false,
    decisions: [],
    mode,
    economicEvents: [],
    researchDataConsent: false,
    achievements: []
  };
};

// Enhanced stat updates with personality influence
export const updateEnhancedCharacterStats = (
  character: Character,
  effects: Partial<CharacterStats>
): CharacterStats => {
  const stats = { ...character.stats };
  
  Object.entries(effects).forEach(([key, value]) => {
    if (key in stats && typeof value === 'number') {
      let adjustedValue = value;
      
      // Personality trait modifiers
      if (key === 'happiness' && character.personalityTraits.includes('nurturing')) {
        adjustedValue *= 1.1;
      }
      if (key === 'workEthic' && character.personalityTraits.includes('ambitious')) {
        adjustedValue *= 1.2;
      }
      if (key === 'stress' && character.personalityTraits.includes('stable')) {
        adjustedValue *= 0.8;
      }
      
      const currentValue = stats[key as keyof CharacterStats] as number;
      const newValue = Math.max(0, Math.min(100, currentValue + adjustedValue));
      stats[key as keyof CharacterStats] = newValue;
    }
  });
  
  return stats;
};

// Enhanced age progression with more realistic changes
export const enhancedAgeCharacter = (character: Character): Character => {
  const updatedCharacter = { ...character };
  updatedCharacter.age += 1;
  
  // Age-related fertility changes
  if (updatedCharacter.gender === 'female') {
    if (updatedCharacter.age > 35) {
      const fertilityDecline = Math.pow(1.05, updatedCharacter.age - 35);
      updatedCharacter.stats.fertility = Math.max(0, updatedCharacter.stats.fertility - fertilityDecline);
    }
  } else {
    if (updatedCharacter.age > 45) {
      const fertilityDecline = (updatedCharacter.age - 45) * 0.5;
      updatedCharacter.stats.fertility = Math.max(0, updatedCharacter.stats.fertility - fertilityDecline);
    }
  }
  
  // Health changes based on lifestyle
  let healthChange = -0.5; // Base aging
  if (updatedCharacter.stats.stress > 70) healthChange -= 0.5;
  if (updatedCharacter.stats.workLifeBalance < 40) healthChange -= 0.3;
  if (updatedCharacter.lifeValues.includes('health')) healthChange += 0.3;
  
  updatedCharacter.stats.health = Math.max(0, updatedCharacter.stats.health + healthChange);
  
  // Stress accumulation
  if (updatedCharacter.stats.workLifeBalance < 50) {
    updatedCharacter.stats.stress = Math.min(100, updatedCharacter.stats.stress + 1);
  }
  
  return updatedCharacter;
};

// Enhanced event generation based on personality and life stage
export const generateEnhancedEvent = (character: Character, currentYear: number): LifeEvent | null => {
  const possibleEvents = getLifeStageEvents(character.age);
  
  // Filter events based on character traits and current state
  const weightedEvents = possibleEvents.map(eventType => {
    let weight = 1;
    
    // Personality-based event preferences
    if (eventType.includes('career') && character.personalityTraits.includes('ambitious')) {
      weight *= 1.5;
    }
    if (eventType.includes('family') && character.personalityTraits.includes('nurturing')) {
      weight *= 1.5;
    }
    if (eventType.includes('social') && character.personalityTraits.includes('social')) {
      weight *= 1.3;
    }
    
    // Life value influences
    if (eventType.includes('education') && character.lifeValues.includes('career')) {
      weight *= 1.2;
    }
    if (eventType.includes('relationship') && character.lifeValues.includes('family')) {
      weight *= 1.3;
    }
    
    return { eventType, weight };
  });
  
  // Select weighted random event
  const totalWeight = weightedEvents.reduce((sum, e) => sum + e.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const weightedEvent of weightedEvents) {
    random -= weightedEvent.weight;
    if (random <= 0) {
      return createEnhancedEvent(weightedEvent.eventType, currentYear, character);
    }
  }
  
  return null;
};

// Economic event simulation
export const generateEconomicEvent = (currentYear: number): EconomicEvent | null => {
  const eventChance = Math.random();
  
  if (eventChance < 0.05) { // 5% chance per year
    const eventTypes: EconomicEvent['type'][] = ['recession', 'boom', 'inflation', 'marketCrash', 'jobMarketShift'];
    const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    return {
      type: randomType,
      severity: Math.random() * 100,
      duration: Math.floor(Math.random() * 3) + 1, // 1-3 years
      sectors: ['technology', 'healthcare', 'finance'], // Simplified for now
      housingImpact: (Math.random() - 0.5) * 40,
      timestamp: currentYear
    };
  }
  
  return null;
};

// Achievement system
export const checkAchievements = (character: Character, gameState: GameState): Achievement[] => {
  const newAchievements: Achievement[] = [];
  
  // Family achievements
  if (character.children.length >= 1 && !gameState.achievements.find(a => a.id === 'firstChild')) {
    newAchievements.push({
      id: 'firstChild',
      title: 'First Steps',
      description: 'Welcome your first child',
      unlocked: true,
      timestamp: Date.now(),
      category: 'family'
    });
  }
  
  // Career achievements
  if (character.stats.finances > 80 && !gameState.achievements.find(a => a.id === 'wealthy')) {
    newAchievements.push({
      id: 'wealthy',
      title: 'Financial Success',
      description: 'Achieve high financial status',
      unlocked: true,
      timestamp: Date.now(),
      category: 'financial'
    });
  }
  
  return newAchievements;
};

// Enhanced simulation with multiple systems
export const simulateEnhancedYear = (gameState: GameState): GameState => {
  if (gameState.paused || gameState.gameOver) {
    return gameState;
  }
  
  // Age the character
  const agedCharacter = enhancedAgeCharacter(gameState.character);
  
  // Generate economic events
  const economicEvent = generateEconomicEvent(gameState.currentYear);
  const updatedEconomicEvents = economicEvent 
    ? [...gameState.economicEvents, economicEvent]
    : gameState.economicEvents;
  
  // Generate life events
  const lifeEvent = generateEnhancedEvent(agedCharacter, gameState.currentYear);
  
  // Check for achievements
  const newAchievements = checkAchievements(agedCharacter, gameState);
  
  // Check for game over
  const gameOver = agedCharacter.age >= 80 || agedCharacter.stats.health <= 0;
  
  return {
    ...gameState,
    character: agedCharacter,
    currentYear: gameState.currentYear + 1,
    currentEvent: lifeEvent || undefined,
    economicEvents: updatedEconomicEvents,
    achievements: [...gameState.achievements, ...newAchievements],
    gameOver
  };
};

export { updateCharacterStats, makeChoice, recordDecision } from './gameEngine';
