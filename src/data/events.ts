
import { LifeEvent } from "../models/gameTypes";

// Base events that can occur during the game
export const baseEvents: Record<string, Omit<LifeEvent, 'timestamp'>> = {
  // Career events
  jobOffer: {
    type: "career",
    description: "You've received a job offer with higher pay but longer hours.",
    effect: {},
    choices: [
      {
        text: "Accept the job for better finances but less free time",
        effect: { finances: 10, energy: -5, workEthic: 5 }
      },
      {
        text: "Stay at your current job for work-life balance",
        effect: { happiness: 5, energy: 5, finances: -5 }
      }
    ]
  },
  promotion: {
    type: "career",
    description: "Your boss offers you a promotion with more responsibilities.",
    effect: {},
    choices: [
      {
        text: "Accept the promotion and the challenge",
        effect: { finances: 15, workEthic: 10, energy: -10 }
      },
      {
        text: "Decline and maintain current work-life balance",
        effect: { happiness: 5, relationshipSatisfaction: 5, finances: -5 }
      }
    ]
  },
  careerChange: {
    type: "career",
    description: "You're considering a complete career change to follow your passion.",
    effect: {},
    choices: [
      {
        text: "Take the risk and change careers",
        effect: { happiness: 15, finances: -15, workEthic: 10 }
      },
      {
        text: "Stay in your current field for stability",
        effect: { finances: 5, happiness: -5 }
      },
      {
        text: "Take classes in your passion while keeping your job",
        effect: { energy: -10, happiness: 5, workEthic: 5 }
      }
    ]
  },
  
  // Relationship events
  marriageProposal: {
    type: "relationship",
    description: "Your partner has proposed marriage.",
    effect: {},
    choices: [
      {
        text: "Accept the proposal",
        effect: { happiness: 15, relationshipSatisfaction: 20 }
      },
      {
        text: "Decline, you're not ready for marriage",
        effect: { happiness: -5, relationshipSatisfaction: -15 }
      }
    ]
  },
  relationshipStrain: {
    type: "relationship",
    description: "You and your partner are going through a rough patch.",
    effect: {},
    choices: [
      {
        text: "Work through it together with communication",
        effect: { relationshipSatisfaction: 10, happiness: 5 }
      },
      {
        text: "Focus on yourself for now",
        effect: { relationshipSatisfaction: -10, happiness: -5 }
      },
      {
        text: "Consider ending the relationship",
        effect: { relationshipSatisfaction: -20, happiness: -10 }
      }
    ]
  },
  datingApp: {
    type: "relationship",
    description: "You've matched with someone interesting on a dating app.",
    effect: {},
    choices: [
      {
        text: "Meet them for coffee",
        effect: { happiness: 5, energy: -5, relationshipSatisfaction: 5 }
      },
      {
        text: "Chat longer before meeting in person",
        effect: { relationshipSatisfaction: 2 }
      },
      {
        text: "Focus on your career instead of dating",
        effect: { workEthic: 5, relationshipSatisfaction: -5 }
      }
    ]
  },
  longDistance: {
    type: "relationship",
    description: "Your partner received a job offer in another city that would mean a long-distance relationship.",
    effect: {},
    choices: [
      {
        text: "Support their move and try long-distance",
        effect: { relationshipSatisfaction: -5, happiness: -5 }
      },
      {
        text: "Ask them to decline the offer",
        effect: { relationshipSatisfaction: -10, finances: -5 }
      },
      {
        text: "Move with them to the new city",
        effect: { happiness: 5, finances: -10, workEthic: 5 }
      }
    ]
  },
  
  // Family planning events
  considerChildren: {
    type: "family",
    description: "You and your partner are discussing having children.",
    effect: {},
    choices: [
      {
        text: "Start trying for a baby",
        effect: { happiness: 10, relationshipSatisfaction: 5 }
      },
      {
        text: "Wait until you're more financially stable",
        effect: { finances: 5, happiness: -5 }
      },
      {
        text: "Decide not to have children",
        effect: { finances: 10, energy: 5, happiness: -5 }
      }
    ]
  },
  pregnancy: {
    type: "family",
    description: "You/your partner is pregnant!",
    effect: { happiness: 15, health: -5 },
    choices: [
      {
        text: "Prepare extensively for the baby",
        effect: { parentingSkills: 10, finances: -10 }
      },
      {
        text: "Take a balanced approach to preparation",
        effect: { parentingSkills: 5, finances: -5, energy: 5 }
      }
    ]
  },
  childcare: {
    type: "family",
    description: "You need to arrange childcare for your young child.",
    effect: {},
    choices: [
      {
        text: "Enroll in a premium daycare center",
        effect: { finances: -15, parentingSkills: 5, happiness: 5 }
      },
      {
        text: "Find a more affordable daycare option",
        effect: { finances: -5, happiness: -5 }
      },
      {
        text: "Ask family members to help with childcare",
        effect: { finances: 5, energy: 5, parentingSkills: -5 }
      },
      {
        text: "Reduce work hours to care for your child",
        effect: { finances: -10, parentingSkills: 15, energy: -10 }
      }
    ]
  },
  adoption: {
    type: "family",
    description: "You're considering adopting a child.",
    effect: {},
    choices: [
      {
        text: "Begin the adoption process",
        effect: { happiness: 15, finances: -15, parentingSkills: 10 }
      },
      {
        text: "Research fertility treatments instead",
        effect: { finances: -10, health: -5, happiness: 5 }
      },
      {
        text: "Decide to remain child-free for now",
        effect: { finances: 5, energy: 5 }
      }
    ]
  },
  fertilityTreatment: {
    type: "family",
    description: "You're having difficulty conceiving and considering fertility treatments.",
    effect: { happiness: -5 },
    choices: [
      {
        text: "Pursue expensive fertility treatments",
        effect: { finances: -20, health: -5, happiness: 10 }
      },
      {
        text: "Consider adoption instead",
        effect: { happiness: 5, finances: -10 }
      },
      {
        text: "Take a break from trying for now",
        effect: { health: 5, happiness: -5 }
      }
    ]
  },
  
  // Education events
  educationOpportunity: {
    type: "education",
    description: "You have an opportunity to further your education.",
    effect: {},
    choices: [
      {
        text: "Pursue higher education full-time",
        effect: { finances: -15, energy: -10, workEthic: 15 }
      },
      {
        text: "Take part-time classes while working",
        effect: { finances: -5, energy: -15, workEthic: 10 }
      },
      {
        text: "Skip further education for now",
        effect: { energy: 5, finances: 5, workEthic: -5 }
      }
    ]
  },
  studyAbroad: {
    type: "education",
    description: "You have an opportunity to study abroad for a semester.",
    effect: {},
    choices: [
      {
        text: "Go abroad for the experience",
        effect: { happiness: 15, finances: -15, workEthic: 5 }
      },
      {
        text: "Stay at your current institution",
        effect: { finances: 5, happiness: -5 }
      }
    ]
  },
  
  // Housing events
  housingDecision: {
    type: "housing",
    description: "You're considering changing your living situation.",
    effect: {},
    choices: [
      {
        text: "Move to a bigger place closer to good schools",
        effect: { finances: -15, happiness: 10 }
      },
      {
        text: "Move to a smaller place to save money",
        effect: { finances: 15, happiness: -5 }
      },
      {
        text: "Stay where you are",
        effect: {}
      }
    ]
  },
  homeOwnership: {
    type: "housing",
    description: "You have an opportunity to buy your first home.",
    effect: {},
    choices: [
      {
        text: "Buy a home and take on a mortgage",
        effect: { finances: -20, happiness: 15 }
      },
      {
        text: "Continue renting for flexibility",
        effect: { finances: 5, happiness: -5 }
      },
      {
        text: "Move to a more affordable area to buy",
        effect: { finances: -10, happiness: 5, energy: -5 }
      }
    ]
  },
  relocation: {
    type: "housing",
    description: "You're considering relocating to a different city or country.",
    effect: {},
    choices: [
      {
        text: "Relocate for better opportunities",
        effect: { happiness: 10, finances: 10, energy: -15 }
      },
      {
        text: "Stay where your support network is",
        effect: { happiness: 5, relationshipSatisfaction: 5, finances: -5 }
      }
    ]
  },
  
  // Health events
  healthCrisis: {
    type: "health",
    description: "You're experiencing health issues that affect your daily life.",
    effect: { health: -15 },
    choices: [
      {
        text: "Take time off to fully recover",
        effect: { finances: -10, health: 20, energy: 15 }
      },
      {
        text: "Try to work through it",
        effect: { finances: 5, health: -5, energy: -10 }
      }
    ]
  },
  mentalHealth: {
    type: "health",
    description: "You've been feeling burnt out and stressed lately.",
    effect: { happiness: -10, energy: -10 },
    choices: [
      {
        text: "Seek therapy or counseling",
        effect: { happiness: 15, finances: -5, health: 10 }
      },
      {
        text: "Take a vacation to recharge",
        effect: { happiness: 10, energy: 15, finances: -10 }
      },
      {
        text: "Practice self-care and mindfulness",
        effect: { happiness: 5, health: 5, energy: 5 }
      },
      {
        text: "Ignore it and keep pushing forward",
        effect: { workEthic: 5, health: -10, happiness: -5 }
      }
    ]
  },
  lifestyleChange: {
    type: "health",
    description: "Your doctor recommends a significant lifestyle change for your health.",
    effect: {},
    choices: [
      {
        text: "Follow all recommendations strictly",
        effect: { health: 20, energy: 15, happiness: -5 }
      },
      {
        text: "Make moderate changes gradually",
        effect: { health: 10, energy: 5, happiness: 5 }
      },
      {
        text: "Ignore the recommendations",
        effect: { happiness: 5, health: -15 }
      }
    ]
  },
  
  // Work-life balance events
  overtimeRequest: {
    type: "work",
    description: "Your boss asks if you can work overtime for the next month.",
    effect: {},
    choices: [
      {
        text: "Accept for the extra money",
        effect: { finances: 10, energy: -10, relationshipSatisfaction: -5, happiness: -5 }
      },
      {
        text: "Decline to maintain family time",
        effect: { finances: -5, relationshipSatisfaction: 10, happiness: 5 }
      }
    ]
  },
  sabbatical: {
    type: "work",
    description: "You're considering taking a sabbatical from work to pursue personal interests.",
    effect: {},
    choices: [
      {
        text: "Take the sabbatical",
        effect: { happiness: 15, finances: -15, energy: 15 }
      },
      {
        text: "Continue working but find more time for hobbies",
        effect: { happiness: 5, energy: -5, finances: 5 }
      }
    ]
  },
  entrepreneurship: {
    type: "work",
    description: "You have an idea for a business. Do you want to pursue it?",
    effect: {},
    choices: [
      {
        text: "Quit your job and start a business",
        effect: { workEthic: 15, finances: -15, energy: -10, happiness: 10 }
      },
      {
        text: "Start a side business while keeping your job",
        effect: { workEthic: 10, energy: -15, finances: 5 }
      },
      {
        text: "Shelve the idea for now",
        effect: { happiness: -5, finances: 5 }
      }
    ]
  },
  
  // Child development events
  childEducation: {
    type: "family",
    description: "It's time to make decisions about your child's education.",
    effect: {},
    choices: [
      {
        text: "Enroll in a private school with specialized programs",
        effect: { finances: -15, parentingSkills: 10 }
      },
      {
        text: "Choose the local public school",
        effect: { finances: 5, parentingSkills: 5 }
      },
      {
        text: "Consider homeschooling",
        effect: { finances: -5, energy: -15, parentingSkills: 15 }
      }
    ]
  },
  childActivityChoice: {
    type: "family",
    description: "Your child wants to participate in extracurricular activities.",
    effect: {},
    choices: [
      {
        text: "Enroll them in multiple activities",
        effect: { finances: -10, energy: -10, parentingSkills: 10 }
      },
      {
        text: "Let them choose one activity to focus on",
        effect: { finances: -5, happiness: 5, parentingSkills: 5 }
      },
      {
        text: "Delay extracurriculars until they're older",
        effect: { finances: 5, parentingSkills: -5 }
      }
    ]
  },
  teenageChallenges: {
    type: "family",
    description: "Your teenager is going through a rebellious phase.",
    effect: { happiness: -5 },
    choices: [
      {
        text: "Set strict boundaries and rules",
        effect: { parentingSkills: 5, relationshipSatisfaction: -5 }
      },
      {
        text: "Have open conversations about their feelings",
        effect: { parentingSkills: 10, energy: -5, relationshipSatisfaction: 5 }
      },
      {
        text: "Give them space to figure things out",
        effect: { parentingSkills: -5, happiness: 5 }
      }
    ]
  },
  
  // Work flexibility events
  remoteWorkOption: {
    type: "career",
    description: "Your company is offering the option to work remotely.",
    effect: {},
    choices: [
      {
        text: "Switch to full remote work",
        effect: { energy: 10, happiness: 5, relationshipSatisfaction: 5 }
      },
      {
        text: "Choose a hybrid schedule",
        effect: { energy: 5, happiness: 5 }
      },
      {
        text: "Continue working at the office",
        effect: { workEthic: 5, finances: 5 }
      }
    ]
  },
  workLifePolicy: {
    type: "career",
    description: "Your company is implementing new policies affecting work-life balance.",
    effect: {},
    choices: [
      {
        text: "Advocate for better parental leave policies",
        effect: { happiness: 5, relationshipSatisfaction: 5, workEthic: -5 }
      },
      {
        text: "Push for flexible working hours",
        effect: { happiness: 10, energy: 5, workEthic: -5 }
      },
      {
        text: "Accept the policies as they are",
        effect: { workEthic: 5, happiness: -5 }
      }
    ]
  },
  
  // Financial events
  investment: {
    type: "finances",
    description: "You have some extra money and are considering investment options.",
    effect: {},
    choices: [
      {
        text: "Invest in a high-risk, high-reward opportunity",
        effect: { finances: 15, happiness: 5 }
      },
      {
        text: "Choose safe, low-yield investments",
        effect: { finances: 5, happiness: 2 }
      },
      {
        text: "Save the money for emergencies",
        effect: { finances: 2, happiness: -2 }
      }
    ]
  },
  debtManagement: {
    type: "finances",
    description: "You're considering how to handle your debt situation.",
    effect: {},
    choices: [
      {
        text: "Pay off debt aggressively",
        effect: { finances: 15, happiness: 10, energy: -5 }
      },
      {
        text: "Balance debt repayment with living expenses",
        effect: { finances: 5, happiness: 5 }
      },
      {
        text: "Maintain minimum payments for now",
        effect: { finances: -5, happiness: 5, energy: 5 }
      }
    ]
  },
  
  // Social events
  friendshipOpportunity: {
    type: "social",
    description: "You've been invited to join a club or social group.",
    effect: {},
    choices: [
      {
        text: "Join and make time for new friends",
        effect: { happiness: 10, energy: -5, relationshipSatisfaction: 5 }
      },
      {
        text: "Decline to focus on existing relationships",
        effect: { relationshipSatisfaction: 5, energy: 5 }
      }
    ]
  },
  volunteerWork: {
    type: "social",
    description: "There's an opportunity to volunteer for a cause you care about.",
    effect: {},
    choices: [
      {
        text: "Commit to regular volunteering",
        effect: { happiness: 15, energy: -10, workEthic: 5 }
      },
      {
        text: "Volunteer occasionally",
        effect: { happiness: 5, energy: -2 }
      },
      {
        text: "Donate money instead of time",
        effect: { happiness: 2, finances: -5 }
      }
    ]
  }
};

// Helper function to create a timestamped event
export const createEvent = (eventType: string, timestamp: number): LifeEvent => {
  const baseEvent = baseEvents[eventType];
  if (!baseEvent) {
    throw new Error(`Event type ${eventType} not found`);
  }
  
  return {
    ...baseEvent,
    timestamp
  };
};

// Events that are specific to life stages
export const getLifeStageEvents = (age: number): string[] => {
  if (age >= 18 && age <= 25) {
    return [
      "educationOpportunity", 
      "jobOffer", 
      "datingApp", 
      "studyAbroad", 
      "friendshipOpportunity",
      "investment",
      "housingDecision"
    ];
  } else if (age >= 25 && age <= 35) {
    return [
      "marriageProposal", 
      "promotion", 
      "considerChildren", 
      "housingDecision",
      "careerChange",
      "homeOwnership",
      "longDistance",
      "mentalHealth",
      "workLifePolicy",
      "debtManagement",
      "volunteerWork"
    ];
  } else if (age >= 35 && age <= 45) {
    return [
      "childEducation", 
      "relationshipStrain", 
      "healthCrisis", 
      "remoteWorkOption",
      "childActivityChoice",
      "adoption",
      "fertilityTreatment",
      "promotion",
      "sabbatical",
      "entrepreneurship",
      "lifestyleChange",
      "relocation"
    ];
  } else if (age >= 45 && age <= 60) {
    return [
      "childEducation", 
      "healthCrisis", 
      "promotion", 
      "remoteWorkOption",
      "teenageChallenges",
      "lifestyleChange",
      "relationshipStrain",
      "investment",
      "careerChange"
    ];
  } else if (age > 60) {
    return [
      "retirement",
      "healthCrisis",
      "relocation",
      "volunteerWork",
      "investment"
    ];
  }
  
  return ["educationOpportunity", "jobOffer"];
};

// Add retirement event
baseEvents.retirement = {
  type: "life",
  description: "You're considering retirement options.",
  effect: { energy: 10 },
  choices: [
    {
      text: "Fully retire and enjoy leisure time",
      effect: { happiness: 15, finances: -10, energy: 15 }
    },
    {
      text: "Semi-retire with part-time consulting",
      effect: { finances: 5, happiness: 10, energy: 5 }
    },
    {
      text: "Continue working as long as possible",
      effect: { finances: 15, energy: -10, happiness: -5 }
    }
  ]
};

