
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Country } from '@/models/gameTypes';
import { Progress } from "@/components/ui/progress";
import { MapPin, Building, Briefcase, Users, Baby, School, Home, Heart } from 'lucide-react';

interface CountryInfoProps {
  country: Country;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ country }) => {
  return (
    <Card className="w-full border-2 border-indigo-100">
      <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-indigo-500" />
          <CardTitle className="text-lg">{country.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Baby className="h-4 w-4 text-purple-500" />
              <h4 className="text-sm font-medium">Family Policies</h4>
            </div>
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Parental Leave</span>
                  <span className="font-medium">{country.policies.parentalLeave} days</span>
                </div>
                <Progress value={Math.min(country.policies.parentalLeave / 5, 100)} className="bg-purple-100 h-2">
                  <div className="h-full bg-purple-500 rounded-full" />
                </Progress>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Child Benefits</span>
                  <span className="font-medium">{country.policies.childBenefits}/month</span>
                </div>
                <Progress value={Math.min(country.policies.childBenefits / 10, 100)} className="bg-purple-100 h-2">
                  <div className="h-full bg-purple-500 rounded-full" />
                </Progress>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Childcare Support</span>
                  <span className="font-medium">{getRatingText(100 - country.policies.childcareCost)}</span>
                </div>
                <Progress value={100 - country.policies.childcareCost} className="bg-purple-100 h-2">
                  <div className="h-full bg-purple-500 rounded-full" />
                </Progress>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Education Support</span>
                  <span className="font-medium">{getRatingText(100 - country.policies.educationCost)}</span>
                </div>
                <Progress value={100 - country.policies.educationCost} className="bg-purple-100 h-2">
                  <div className="h-full bg-purple-500 rounded-full" />
                </Progress>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Heart className="h-4 w-4 text-red-500" />
              <h4 className="text-sm font-medium">Cultural Values</h4>
            </div>
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Family Orientation</span>
                  <span className="font-medium">{getRatingText(country.culture.familyOriented)}</span>
                </div>
                <Progress value={country.culture.familyOriented} className="bg-red-100 h-2">
                  <div className="h-full bg-red-500 rounded-full" />
                </Progress>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Career Focus</span>
                  <span className="font-medium">{getRatingText(country.culture.careerFocused)}</span>
                </div>
                <Progress value={country.culture.careerFocused} className="bg-red-100 h-2">
                  <div className="h-full bg-red-500 rounded-full" />
                </Progress>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Traditionalism</span>
                  <span className="font-medium">{getRatingText(country.culture.traditionalism)}</span>
                </div>
                <Progress value={country.culture.traditionalism} className="bg-red-100 h-2">
                  <div className="h-full bg-red-500 rounded-full" />
                </Progress>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Building className="h-4 w-4 text-blue-500" />
              <h4 className="text-sm font-medium">Economic Factors</h4>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span>Average Salary</span>
                <span className="font-medium">{formatCurrency(country.economy.averageSalary)}</span>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Unemployment</span>
                  <span className="font-medium">{country.economy.unemployment}%</span>
                </div>
                <Progress value={100 - (country.economy.unemployment * 10)} className="bg-blue-100 h-2">
                  <div className="h-full bg-blue-500 rounded-full" />
                </Progress>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Living Affordability</span>
                  <span className="font-medium">{getRatingText(100 - country.economy.livingCost)}</span>
                </div>
                <Progress value={100 - country.economy.livingCost} className="bg-blue-100 h-2">
                  <div className="h-full bg-blue-500 rounded-full" />
                </Progress>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Housing Affordability</span>
                  <span className="font-medium">{getRatingText(100 - country.economy.housingCost)}</span>
                </div>
                <Progress value={100 - country.economy.housingCost} className="bg-blue-100 h-2">
                  <div className="h-full bg-blue-500 rounded-full" />
                </Progress>
              </div>
            </div>
          </div>
          
          <div className="px-3 py-2 bg-gray-50 rounded-md text-xs border border-gray-100">
            <p className="text-gray-700">
              <span className="font-medium">Research note:</span> The policies and culture in {country.name} have a significant impact on family planning decisions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper functions
const getRatingText = (value: number): string => {
  if (value >= 80) return "Excellent";
  if (value >= 60) return "Good";
  if (value >= 40) return "Average";
  if (value >= 20) return "Poor";
  return "Very Poor";
};

const formatCurrency = (value: number): string => {
  if (value > 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value > 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

export default CountryInfo;
