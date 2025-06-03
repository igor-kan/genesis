
import { Country } from "../models/gameTypes";

export const countries: Record<string, Country> = {
  custom: {
    name: "Custom Country",
    type: "custom",
    policies: {
      parentalLeave: 0,
      childBenefits: 0,
      childcareCost: 50,
      taxBenefitsForChildren: 0,
      educationCost: 50,
      healthcareCost: 50,
      workLifeBalance: 50,
    },
    culture: {
      familyOriented: 50,
      careerFocused: 50,
      traditionalism: 50,
    },
    economy: {
      averageSalary: 50000,
      unemployment: 5,
      livingCost: 50,
      housingCost: 50,
    },
  },
  sweden: {
    name: "Sweden",
    type: "sweden",
    policies: {
      parentalLeave: 480, // Days
      childBenefits: 1250, // Monthly in SEK
      childcareCost: 20,
      taxBenefitsForChildren: 70,
      educationCost: 10,
      healthcareCost: 15,
      workLifeBalance: 85,
    },
    culture: {
      familyOriented: 75,
      careerFocused: 65,
      traditionalism: 45,
    },
    economy: {
      averageSalary: 42000,
      unemployment: 7.5,
      livingCost: 70,
      housingCost: 75,
    },
  },
  usa: {
    name: "United States",
    type: "usa",
    policies: {
      parentalLeave: 0,
      childBenefits: 300,
      childcareCost: 80,
      taxBenefitsForChildren: 40,
      educationCost: 85,
      healthcareCost: 90,
      workLifeBalance: 40,
    },
    culture: {
      familyOriented: 60,
      careerFocused: 80,
      traditionalism: 55,
    },
    economy: {
      averageSalary: 65000,
      unemployment: 5.5,
      livingCost: 65,
      housingCost: 70,
    },
  },
  japan: {
    name: "Japan",
    type: "japan",
    policies: {
      parentalLeave: 58,
      childBenefits: 15000, // Yen per month
      childcareCost: 60,
      taxBenefitsForChildren: 30,
      educationCost: 60,
      healthcareCost: 30,
      workLifeBalance: 25,
    },
    culture: {
      familyOriented: 70,
      careerFocused: 90,
      traditionalism: 80,
    },
    economy: {
      averageSalary: 4500000, // Yen per year
      unemployment: 2.8,
      livingCost: 75,
      housingCost: 80,
    },
  },
  germany: {
    name: "Germany",
    type: "germany",
    policies: {
      parentalLeave: 360,
      childBenefits: 219, // Euros per month
      childcareCost: 30,
      taxBenefitsForChildren: 60,
      educationCost: 15,
      healthcareCost: 25,
      workLifeBalance: 70,
    },
    culture: {
      familyOriented: 65,
      careerFocused: 70,
      traditionalism: 50,
    },
    economy: {
      averageSalary: 52000,
      unemployment: 5.7,
      livingCost: 65,
      housingCost: 60,
    },
  },
};

export const getCountryList = (): string[] => {
  return Object.keys(countries).filter(key => key !== 'custom');
};

export const getCountry = (countryName: string): Country => {
  return countries[countryName] || countries.custom;
};
