
// Game Types
export type Gender = 'male' | 'female';
export type SexualOrientation = 'heterosexual' | 'homosexual' | 'bisexual' | 'asexual';
export type RelationshipStatus = 'single' | 'dating' | 'engaged' | 'married' | 'divorced' | 'widowed' | 'cohabiting';
export type EducationLevel = 'elementary' | 'highSchool' | 'bachelor' | 'master' | 'doctorate';
export type JobSector = 'technology' | 'healthcare' | 'education' | 'finance' | 'service' | 'manufacturing' | 'government' | 'arts' | 'unemployed';
export type HousingType = 'apartment' | 'house' | 'villa' | 'livingWithParents' | 'sharedHousing';
export type CountryType = 'custom' | string;
export type PersonalityTrait = 'ambitious' | 'nurturing' | 'adventurous' | 'stable' | 'creative' | 'analytical' | 'social' | 'independent';
export type LifeValue = 'career' | 'family' | 'stability' | 'freedom' | 'wealth' | 'creativity' | 'social' | 'health';
export type EducationSystem = 'public' | 'private' | 'homeschool' | 'international';
export type ParentingStyle = 'authoritative' | 'permissive' | 'strict' | 'neglectful';
export type GameMode = 'sandbox' | 'scenario' | 'multiplayer';

// Game Data Types
export interface Character {
  name: string;
  gender: Gender;
  sexualOrientation: SexualOrientation;
  age: number;
  educationLevel: EducationLevel;
  relationshipStatus: RelationshipStatus;
  partner?: Character;
  children: Character[];
  job?: Job;
  housing?: Housing;
  country: Country;
  stats: CharacterStats;
  events: LifeEvent[];
  personalityTraits: PersonalityTrait[];
  lifeValues: LifeValue[];
  hiddenAttributes: HiddenAttributes;
  parentingStyle?: ParentingStyle;
  mentalHealthHistory: MentalHealthEvent[];
  socialCircle: Character[];
}

export interface HiddenAttributes {
  fertilityPotential: number; // 0-100, affects conception chances
  mentalHealthPredisposition: number; // 0-100, affects stress/depression risk
  familyValuesInfluence: number; // 0-100, how much family values matter
  careerAmbition: number; // 0-100, drive for professional success
  adaptability: number; // 0-100, ability to handle life changes
  socialNeed: number; // 0-100, need for social connections
}

export interface CharacterStats {
  health: number;
  happiness: number;
  energy: number;
  finances: number;
  workEthic: number;
  relationshipSatisfaction: number;
  parentingSkills: number;
  fertility: number;
  stress: number;
  socialConnections: number;
  workLifeBalance: number;
  educationQuality: number;
}

export interface MentalHealthEvent {
  type: 'depression' | 'anxiety' | 'burnout' | 'postpartum' | 'therapy';
  severity: number;
  duration: number;
  timestamp: number;
  resolved: boolean;
}

export interface Job {
  title: string;
  sector: JobSector;
  salary: number;
  satisfaction: number;
  workHours: number;
  remote: boolean;
  prestige: number;
  stressLevel: number;
  benefits: {
    paidLeave: number;
    parentalLeave: number;
    childcare: boolean;
    flexibleHours: boolean;
    healthInsurance: boolean;
    retirement: boolean;
  };
  careerProgression: {
    promotionPotential: number;
    skillDevelopment: number;
    networkingOpportunities: number;
  };
}

export interface Housing {
  type: HousingType;
  cost: number;
  size: number;
  location: string;
  quality: number;
  proximity: {
    toWork: number;
    toSchools: number;
    toChildcare: number;
    toFamily: number;
    toHealthcare: number;
  };
  marketValue: number;
  ownership: 'rent' | 'own' | 'mortgage';
}

export interface Country {
  name: string;
  type: CountryType;
  policies: {
    parentalLeave: number;
    childBenefits: number;
    childcareCost: number;
    taxBenefitsForChildren: number;
    educationCost: number;
    healthcareCost: number;
    workLifeBalance: number;
    fertilitySupport: number;
    adoptionSupport: number;
    mentalHealthSupport: number;
  };
  culture: {
    familyOriented: number;
    careerFocused: number;
    traditionalism: number;
    genderEquality: number;
    socialSupport: number;
    childcareExpectations: number;
  };
  economy: {
    averageSalary: number;
    unemployment: number;
    livingCost: number;
    housingCost: number;
    economicStability: number;
    socialMobility: number;
  };
  education: {
    publicQuality: number;
    privateAvailability: number;
    standardizedTesting: boolean;
    universityAccess: number;
    vocationTraining: number;
  };
}

export interface EducationChoice {
  type: EducationSystem;
  quality: number;
  cost: number;
  timeCommitment: number;
  socialStatus: number;
  extracurriculars: string[];
  tutoring: boolean;
  specializedPrograms: string[];
}

export interface FertilityEvent {
  type: 'conception' | 'miscarriage' | 'fertilityTreatment' | 'ivf' | 'adoption' | 'birthControl';
  success: boolean;
  cost: number;
  emotionalImpact: number;
  timestamp: number;
  details: string;
}

export interface RelationshipEvent {
  type: 'dating' | 'engagement' | 'marriage' | 'divorce' | 'separation' | 'counseling';
  partner: string;
  satisfaction: number;
  timestamp: number;
  impact: Partial<CharacterStats>;
}

export interface LifeEvent {
  type: string;
  category: 'career' | 'relationship' | 'family' | 'education' | 'health' | 'financial' | 'social' | 'housing';
  description: string;
  effect: Partial<CharacterStats>;
  choices?: GameChoice[];
  timestamp: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  prerequisites?: string[];
  consequences?: string[];
}

export interface GameChoice {
  text: string;
  effect: Partial<CharacterStats>;
  probability?: Record<string, number>;
  next?: string;
  cost?: number;
  timeRequired?: number;
  prerequisites?: string[];
  longTermEffects?: Partial<CharacterStats>;
}

export interface EconomicEvent {
  type: 'recession' | 'boom' | 'inflation' | 'marketCrash' | 'jobMarketShift';
  severity: number;
  duration: number;
  sectors: JobSector[];
  housingImpact: number;
  timestamp: number;
}

export interface PlayerDecision {
  event: string;
  choice: string;
  character: {
    age: number;
    gender: Gender;
    educationLevel: EducationLevel;
    relationshipStatus: RelationshipStatus;
    children: number;
    personalityTraits: PersonalityTrait[];
    lifeValues: LifeValue[];
  };
  country: string;
  timestamp: number;
  context: {
    economicCondition: string;
    policyEnvironment: string;
    socialPressure: number;
  };
}

export interface ScenarioGoal {
  id: string;
  title: string;
  description: string;
  targetAge: number;
  criteria: {
    children?: number;
    income?: number;
    education?: EducationLevel;
    relationship?: RelationshipStatus;
    location?: string;
  };
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  timeLimit?: number;
}

export interface GameState {
  character: Character;
  gameSpeed: number;
  paused: boolean;
  currentYear: number;
  gameOver: boolean;
  decisions: PlayerDecision[];
  currentEvent?: LifeEvent;
  mode: GameMode;
  scenario?: ScenarioGoal;
  economicEvents: EconomicEvent[];
  researchDataConsent: boolean;
  achievements: Achievement[];
  multiplayerLobby?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  timestamp?: number;
  category: 'family' | 'career' | 'education' | 'financial' | 'social' | 'personal';
}

export interface MultiplayerEvent {
  type: 'peerPressure' | 'socialSupport' | 'competition' | 'collaboration';
  participants: string[];
  effect: Partial<CharacterStats>;
  description: string;
}
