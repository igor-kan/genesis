
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerDecision, Character } from '@/models/gameTypes';

interface GameSummaryProps {
  character: Character;
  decisions: PlayerDecision[];
  onRestart: () => void;
  onClose: () => void;
}

const GameSummary: React.FC<GameSummaryProps> = ({ character, decisions, onRestart, onClose }) => {
  // Filter and count family-related decisions
  const familyDecisions = decisions.filter(d => 
    d.event.includes('family') || 
    d.event.includes('child') || 
    d.event.includes('marriage')
  );
  
  // Count how many positive decisions were made about having children
  const positiveChildDecisions = familyDecisions.filter(d => 
    d.choice.includes('baby') || 
    d.choice.includes('child') && 
    !d.choice.includes('not to have')
  ).length;
  
  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle>Life Journey Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Your Life Stats</h3>
            <ul className="mt-2 space-y-1">
              <li className="flex justify-between">
                <span>Final Age:</span>
                <span>{character.age} years</span>
              </li>
              <li className="flex justify-between">
                <span>Number of Children:</span>
                <span>{character.children.length}</span>
              </li>
              <li className="flex justify-between">
                <span>Final Relationship Status:</span>
                <span className="capitalize">{character.relationshipStatus}</span>
              </li>
              <li className="flex justify-between">
                <span>Country:</span>
                <span>{character.country.name}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg">Life Decisions</h3>
            <ul className="mt-2 space-y-1">
              <li className="flex justify-between">
                <span>Total Decisions Made:</span>
                <span>{decisions.length}</span>
              </li>
              <li className="flex justify-between">
                <span>Family-related Decisions:</span>
                <span>{familyDecisions.length}</span>
              </li>
              <li className="flex justify-between">
                <span>Career-related Decisions:</span>
                <span>{decisions.filter(d => d.event.includes('career') || d.event.includes('job')).length}</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold">Your Life Pattern:</h3>
            <p className="mt-2">
              {positiveChildDecisions > 2 
                ? "You made many positive decisions about having and raising children." 
                : positiveChildDecisions > 0 
                  ? "You showed some interest in having children but were also focused on other aspects of life."
                  : "You prioritized aspects of life other than having children."
              }
            </p>
            <p className="mt-2">
              {character.stats.workEthic > 70 
                ? "You were very career-focused throughout your life." 
                : character.stats.workEthic > 50 
                  ? "You maintained a good balance between work and other aspects of life."
                  : "You prioritized personal life over professional advancement."
              }
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>Continue Exploring</Button>
        <Button onClick={onRestart}>Start New Life</Button>
      </CardFooter>
    </Card>
  );
};

export default GameSummary;
