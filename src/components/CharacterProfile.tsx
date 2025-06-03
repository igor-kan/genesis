
import React from 'react';
import { Character } from '@/models/gameTypes';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Briefcase, 
  School, 
  House, 
  Heart, 
  Baby, 
  MapPin, 
  Flag,
  Coins 
} from "lucide-react";

interface CharacterProfileProps {
  character: Character;
  currentYear: number;
}

const CharacterProfile: React.FC<CharacterProfileProps> = ({ character, currentYear }) => {
  const { name, gender, age, educationLevel, relationshipStatus, children, job, housing } = character;

  // Function to get background color based on gender
  const getProfileBgColor = () => {
    return gender === 'female' ? 'bg-purple-100' : 'bg-blue-100';
  };

  return (
    <Card className="w-full overflow-hidden border-2 border-blue-100">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <div className="flex flex-col items-center mb-4">
          <div className={`${getProfileBgColor()} rounded-full w-20 h-20 flex items-center justify-center mb-2 border-2 border-white shadow-md`}>
            <span className="text-2xl font-bold text-gray-700">{name.charAt(0)}</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm mt-1">
            {gender === 'female' ? 'Female' : 'Male'}, {age} years old
          </div>
        </div>
      </div>

      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 rounded-full">
              <Calendar className="h-4 w-4 text-blue-500" />
            </div>
            <span className="text-sm">Year: {currentYear}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-50 rounded-full">
              <School className="h-4 w-4 text-green-500" />
            </div>
            <span className="text-sm capitalize">
              {educationLevel.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-50 rounded-full">
              <Heart className="h-4 w-4 text-red-500" />
            </div>
            <span className="text-sm capitalize">
              {relationshipStatus}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-50 rounded-full">
              <Baby className="h-4 w-4 text-purple-500" />
            </div>
            <span className="text-sm">
              Children: {children.length}
            </span>
          </div>

          {job && (
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-yellow-50 rounded-full">
                <Briefcase className="h-4 w-4 text-yellow-600" />
              </div>
              <span className="text-sm">
                {job.title}
                {job.salary > 0 && <span className="text-xs text-gray-500 ml-1">(${job.salary.toLocaleString()}/yr)</span>}
              </span>
            </div>
          )}

          {housing && (
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-orange-50 rounded-full">
                <House className="h-4 w-4 text-orange-500" />
              </div>
              <span className="text-sm capitalize">{housing.type} in {housing.location}</span>
            </div>
          )}
        </div>

        <div className="mt-6 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-md">
          <div className="flex items-center mb-2">
            <Flag className="h-4 w-4 text-indigo-500 mr-2" />
            <p className="font-semibold text-gray-800">{character.country.name}</p>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {character.country.culture.familyOriented > 70 
              ? "A family-oriented society with strong support systems." 
              : character.country.culture.careerFocused > 70 
                ? "A career-focused society that values professional success." 
                : "A balanced society with mixed values."}
          </p>
          <div className="mt-2 flex items-center text-xs text-gray-600">
            <Coins className="h-3 w-3 text-green-500 mr-1" />
            <span>Economy: {character.country.economy.livingCost > 70 ? "High cost of living" : character.country.economy.livingCost > 40 ? "Moderate cost of living" : "Low cost of living"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterProfile;
