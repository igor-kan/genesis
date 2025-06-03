
import { LifeEvent, Character } from "../models/gameTypes";

// Enhanced events with personality and context awareness
export const enhancedEvents: Record<string, (character: Character) => Omit<LifeEvent, 'timestamp'>> = {
  // Advanced Career Events
  startupOpportunity: (character: Character) => ({
    type: "startupOpportunity",
    category: "career",
    priority: "high",
    description: `A tech startup has offered you equity and a leadership role. The risk is high but the potential rewards could be life-changing. Your ${character.personalityTraits.includes('ambitious') ? 'ambitious nature' : 'careful approach'} will influence this decision.`,
    effect: {},
    choices: [
      {
        text: "Join the startup - take the entrepreneurial leap",
        effect: { finances: -10, stress: 15, energy: -10, happiness: 20, workEthic: 15 },
        longTermEffects: { finances: 40, happiness: 10 },
        cost: 5000,
        timeRequired: 2
      },
      {
        text: "Negotiate for consulting role while keeping current job",
        effect: { finances: 5, stress: 5, energy: -5, workEthic: 10 },
        timeRequired: 1
      },
      {
        text: "Decline and focus on current career stability",
        effect: { finances: 5, happiness: -5, stress: -5 }
      }
    ]
  }),

  workLifeBalance: (character: Character) => ({
    type: "workLifeBalance",
    category: "career",
    priority: "medium",
    description: `Your current work schedule is demanding ${character.children.length > 0 ? 'and affecting family time' : 'and impacting your personal life'}. How do you want to address this?`,
    effect: {},
    choices: [
      {
        text: "Negotiate flexible working arrangements",
        effect: { workLifeBalance: 15, stress: -10, relationshipSatisfaction: 10, energy: 5 }
      },
      {
        text: "Look for a new job with better work-life balance",
        effect: { workLifeBalance: 20, stress: 10, finances: -10, happiness: 5 }
      },
      {
        text: "Push through and focus on career advancement",
        effect: { workEthic: 10, finances: 10, stress: 15, workLifeBalance: -10, relationshipSatisfaction: -5 }
      },
      {
        text: "Consider reducing hours for family time",
        effect: { workLifeBalance: 25, finances: -15, relationshipSatisfaction: 15, parentingSkills: 10 }
      }
    ]
  }),

  // Advanced Relationship Events
  fertilityConsultation: (character: Character) => ({
    type: "fertilityConsultation",
    category: "family",
    priority: "high",
    description: `After trying to conceive for over a year, you and your partner are considering seeing a fertility specialist. Your fertility rate is currently ${character.stats.fertility}%.`,
    effect: { stress: 10 },
    choices: [
      {
        text: "See a fertility specialist and explore all options",
        effect: { finances: -15, stress: 5, happiness: 10 },
        cost: 3000
      },
      {
        text: "Try natural methods and lifestyle changes first",
        effect: { health: 5, stress: -5, finances: -2 },
        timeRequired: 6
      },
      {
        text: "Consider adoption as an alternative",
        effect: { happiness: 15, finances: -20, parentingSkills: 10 },
        cost: 15000
      },
      {
        text: "Take a break from trying and focus on relationship",
        effect: { stress: -15, relationshipSatisfaction: 10, happiness: 5 }
      }
    ]
  }),

  secondChildDecision: (character: Character) => ({
    type: "secondChildDecision",
    category: "family",
    priority: "high",
    description: `Your first child is now ${Math.floor(Math.random() * 3) + 2} years old. You and your partner are discussing whether to have a second child. Consider the financial, emotional, and practical implications.`,
    effect: {},
    choices: [
      {
        text: "Start trying for a second child soon",
        effect: { happiness: 15, stress: 10, finances: -5, parentingSkills: 5 }
      },
      {
        text: "Wait until first child is more independent",
        effect: { finances: 5, stress: -5, workLifeBalance: 5 }
      },
      {
        text: "Focus resources on one child for better opportunities",
        effect: { finances: 10, parentingSkills: 10, happiness: -5 }
      },
      {
        text: "Leave it to chance and see what happens",
        effect: { stress: -5, happiness: 5 }
      }
    ]
  }),

  // Education and Child Development Events
  childEducationChoice: (character: Character) => ({
    type: "childEducationChoice",
    category: "education",
    priority: "high",
    description: `Your child is ready for ${Math.random() > 0.5 ? 'primary school' : 'preschool'}. You need to choose between different educational approaches that will shape their development.`,
    effect: {},
    choices: [
      {
        text: "Enroll in prestigious private school",
        effect: { finances: -25, parentingSkills: 5, stress: 5 },
        cost: 20000
      },
      {
        text: "Choose excellent public school in good district",
        effect: { finances: -5, parentingSkills: 3 },
        cost: 2000
      },
      {
        text: "Consider alternative education (Montessori, Waldorf)",
        effect: { finances: -15, parentingSkills: 8, happiness: 5 },
        cost: 12000
      },
      {
        text: "Homeschool for personalized attention",
        effect: { finances: -8, energy: -20, parentingSkills: 15, workLifeBalance: -15 },
        timeRequired: 5
      }
    ]
  }),

  childTalentDiscovery: (character: Character) => ({
    type: "childTalentDiscovery",
    category: "family",
    priority: "medium",
    description: `Your child has shown exceptional talent in ${Math.random() > 0.5 ? 'music' : 'sports'}. Nurturing this talent could open doors but requires significant investment.`,
    effect: { happiness: 10 },
    choices: [
      {
        text: "Invest heavily in professional coaching/lessons",
        effect: { finances: -20, parentingSkills: 10, stress: 10 },
        cost: 15000
      },
      {
        text: "Support their interest with moderate investment",
        effect: { finances: -8, parentingSkills: 5, happiness: 5 },
        cost: 5000
      },
      {
        text: "Encourage as a hobby without pressure",
        effect: { parentingSkills: 8, happiness: 8, stress: -5 }
      },
      {
        text: "Focus on well-rounded development instead",
        effect: { parentingSkills: 5, workLifeBalance: 5 }
      }
    ]
  }),

  // Housing and Lifestyle Events
  housingMarketOpportunity: (character: Character) => ({
    type: "housingMarketOpportunity",
    category: "housing",
    priority: "high",
    description: `The housing market is ${Math.random() > 0.5 ? 'booming' : 'in a downturn'}. This could be a perfect time to ${character.housing?.ownership === 'rent' ? 'buy your first home' : 'upgrade or relocate'}.`,
    effect: {},
    choices: [
      {
        text: "Buy a family home in excellent school district",
        effect: { finances: -30, happiness: 20, stress: 15 },
        cost: 50000
      },
      {
        text: "Purchase investment property for future security",
        effect: { finances: -25, stress: 10 },
        cost: 40000,
        longTermEffects: { finances: 30 }
      },
      {
        text: "Downsize to save money for children's education",
        effect: { finances: 15, happiness: -5, stress: -5 }
      },
      {
        text: "Stay put and focus on other investments",
        effect: { stress: -5, finances: 5 }
      }
    ]
  }),

  // Health and Wellness Events
  parentalBurnout: (character: Character) => ({
    type: "parentalBurnout",
    category: "health",
    priority: "critical",
    description: `You're experiencing severe parental burnout - exhaustion, stress, and feeling overwhelmed. Your ${character.children.length} ${character.children.length === 1 ? 'child needs' : 'children need'} you, but you need to take care of yourself too.`,
    effect: { stress: 20, energy: -15, happiness: -10 },
    choices: [
      {
        text: "Seek professional help and therapy",
        effect: { happiness: 15, stress: -20, finances: -5 },
        cost: 2000
      },
      {
        text: "Arrange regular childcare support",
        effect: { stress: -15, energy: 10, finances: -10 },
        cost: 8000
      },
      {
        text: "Take extended leave from work",
        effect: { stress: -25, finances: -20, workLifeBalance: 20 }
      },
      {
        text: "Push through and hope it gets better",
        effect: { stress: 10, health: -10, relationshipSatisfaction: -10 }
      }
    ]
  }),

  // Economic and Social Events
  economicDownturn: (character: Character) => ({
    type: "economicDownturn",
    category: "financial",
    priority: "high",
    description: `A recession is affecting your industry. ${character.job ? `Your job at ${character.job.title} may be at risk` : 'Job opportunities are scarce'}. How do you protect your family's financial security?`,
    effect: { stress: 15, finances: -10 },
    choices: [
      {
        text: "Aggressively cut expenses and build emergency fund",
        effect: { finances: 15, stress: -5, happiness: -10 }
      },
      {
        text: "Invest in retraining for recession-proof skills",
        effect: { finances: -10, workEthic: 15, stress: 5 },
        cost: 5000,
        longTermEffects: { finances: 20 }
      },
      {
        text: "Start a side business for additional income",
        effect: { energy: -15, stress: 10, workEthic: 10 },
        longTermEffects: { finances: 15 }
      },
      {
        text: "Relocate to area with better job prospects",
        effect: { finances: -15, stress: 20, happiness: -5, socialConnections: -15 }
      }
    ]
  }),

  // Social and Community Events
  communityInvolvement: (character: Character) => ({
    type: "communityInvolvement",
    category: "social",
    priority: "medium",
    description: `Your local community needs volunteers for ${Math.random() > 0.5 ? 'school board' : 'youth programs'}. Getting involved could benefit your children and community, but requires time commitment.`,
    effect: {},
    choices: [
      {
        text: "Take active leadership role in community",
        effect: { socialConnections: 20, happiness: 15, energy: -10, parentingSkills: 5 },
        timeRequired: 3
      },
      {
        text: "Volunteer occasionally when possible",
        effect: { socialConnections: 10, happiness: 8, energy: -3 }
      },
      {
        text: "Support financially instead of time commitment",
        effect: { finances: -5, happiness: 5, socialConnections: 5 }
      },
      {
        text: "Focus energy on immediate family needs",
        effect: { parentingSkills: 5, energy: 5 }
      }
    ]
  })
};

// Helper function to create contextualized events
export const createEnhancedEvent = (eventType: string, timestamp: number, character: Character): LifeEvent => {
  const eventCreator = enhancedEvents[eventType];
  if (!eventCreator) {
    throw new Error(`Enhanced event type ${eventType} not found`);
  }
  
  const baseEvent = eventCreator(character);
  return {
    ...baseEvent,
    timestamp
  };
};

// Enhanced life stage events with more variety
export const getLifeStageEvents = (age: number): string[] => {
  if (age >= 18 && age <= 25) {
    return [
      "startupOpportunity",
      "communityInvolvement",
      "housingMarketOpportunity"
    ];
  } else if (age >= 25 && age <= 35) {
    return [
      "workLifeBalance",
      "fertilityConsultation",
      "housingMarketOpportunity",
      "economicDownturn",
      "communityInvolvement"
    ];
  } else if (age >= 35 && age <= 45) {
    return [
      "secondChildDecision",
      "childEducationChoice",
      "childTalentDiscovery",
      "parentalBurnout",
      "workLifeBalance",
      "economicDownturn"
    ];
  } else if (age >= 45 && age <= 60) {
    return [
      "childEducationChoice",
      "workLifeBalance",
      "housingMarketOpportunity",
      "economicDownturn",
      "communityInvolvement"
    ];
  } else {
    return [
      "communityInvolvement",
      "housingMarketOpportunity"
    ];
  }
};
