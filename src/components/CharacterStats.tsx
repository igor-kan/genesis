import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Character } from '@/models/gameTypes';

interface CharacterStatsProps {
  character: Character;
}

const CharacterStats: React.FC<CharacterStatsProps> = ({ character }) => {
  const { stats } = character;
  
  // Determine stat color based on value
  const getStatColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 50) return "bg-blue-500";
    if (value >= 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Get corresponding background color for meter
  const getStatBgColor = (value: number) => {
    if (value >= 80) return "bg-green-100";
    if (value >= 50) return "bg-blue-100";
    if (value >= 30) return "bg-yellow-100";
    return "bg-red-100";
  };

  // Get emoji or icon based on stat value
  const getStatEmoji = (stat: string, value: number) => {
    if (stat === 'health') {
      if (value >= 80) return "😄";
      if (value >= 50) return "🙂";
      if (value >= 30) return "😐";
      return "😫";
    }
    if (stat === 'happiness') {
      if (value >= 80) return "🥳";
      if (value >= 50) return "😊";
      if (value >= 30) return "😕";
      return "😢";
    }
    if (stat === 'energy') {
      if (value >= 80) return "⚡";
      if (value >= 50) return "🔋";
      if (value >= 30) return "🔅";
      return "😴";
    }
    if (stat === 'finances') {
      if (value >= 80) return "💰";
      if (value >= 50) return "💵";
      if (value >= 30) return "🪙";
      return "💸";
    }
    return "";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border-2 border-blue-100 w-full">
      <h3 className="text-lg font-semibold mb-4 text-indigo-800">Character Stats</h3>
      
      <div className="space-y-4">
        {/* Core Stats */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium flex items-center gap-1">
              Health {getStatEmoji('health', stats.health)}
            </span>
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100">{stats.health}%</span>
          </div>
          <Progress value={stats.health} className={`h-2.5 ${getStatBgColor(stats.health)}`}>
            <div className={`h-full rounded-full ${getStatColor(stats.health)}`} />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium flex items-center gap-1">
              Happiness {getStatEmoji('happiness', stats.happiness)}
            </span>
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100">{stats.happiness}%</span>
          </div>
          <Progress value={stats.happiness} className={`h-2.5 ${getStatBgColor(stats.happiness)}`}>
            <div className={`h-full rounded-full ${getStatColor(stats.happiness)}`} />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium flex items-center gap-1">
              Energy {getStatEmoji('energy', stats.energy)}
            </span>
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100">{stats.energy}%</span>
          </div>
          <Progress value={stats.energy} className={`h-2.5 ${getStatBgColor(stats.energy)}`}>
            <div className={`h-full rounded-full ${getStatColor(stats.energy)}`} />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium flex items-center gap-1">
              Finances {getStatEmoji('finances', stats.finances)}
            </span>
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100">{stats.finances}%</span>
          </div>
          <Progress value={stats.finances} className={`h-2.5 ${getStatBgColor(stats.finances)}`}>
            <div className={`h-full rounded-full ${getStatColor(stats.finances)}`} />
          </Progress>
        </div>
        
        {/* New Enhanced Stats */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Stress Level</span>
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100">{stats.stress}%</span>
          </div>
          <Progress value={stats.stress} className={`h-2.5 ${getStatBgColor(100 - stats.stress)}`}>
            <div className={`h-full rounded-full ${stats.stress > 70 ? 'bg-red-500' : stats.stress > 40 ? 'bg-yellow-500' : 'bg-green-500'}`} />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Work-Life Balance</span>
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100">{stats.workLifeBalance}%</span>
          </div>
          <Progress value={stats.workLifeBalance} className={`h-2.5 ${getStatBgColor(stats.workLifeBalance)}`}>
            <div className={`h-full rounded-full ${getStatColor(stats.workLifeBalance)}`} />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Social Connections</span>
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100">{stats.socialConnections}%</span>
          </div>
          <Progress value={stats.socialConnections} className={`h-2.5 ${getStatBgColor(stats.socialConnections)}`}>
            <div className={`h-full rounded-full ${getStatColor(stats.socialConnections)}`} />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Work Ethic</span>
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100">{stats.workEthic}%</span>
          </div>
          <Progress value={stats.workEthic} className={`h-2.5 ${getStatBgColor(stats.workEthic)}`}>
            <div className={`h-full rounded-full ${getStatColor(stats.workEthic)}`} />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Relationship</span>
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100">{stats.relationshipSatisfaction}%</span>
          </div>
          <Progress value={stats.relationshipSatisfaction} className={`h-2.5 ${getStatBgColor(stats.relationshipSatisfaction)}`}>
            <div className={`h-full rounded-full ${getStatColor(stats.relationshipSatisfaction)}`} />
          </Progress>
        </div>
        
        {(character.relationshipStatus === 'married' || character.children.length > 0) && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Parenting Skills</span>
              <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100">{stats.parentingSkills}%</span>
            </div>
            <Progress value={stats.parentingSkills} className={`h-2.5 ${getStatBgColor(stats.parentingSkills)}`}>
              <div className={`h-full rounded-full ${getStatColor(stats.parentingSkills)}`} />
            </Progress>
          </div>
        )}
        
        <div className="pt-2 border-t border-gray-100">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Fertility</span>
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100">{stats.fertility}%</span>
          </div>
          <Progress value={stats.fertility} className={`h-2.5 ${getStatBgColor(stats.fertility)}`}>
            <div className={`h-full rounded-full ${getStatColor(stats.fertility)}`} />
          </Progress>
          <p className="text-xs text-gray-500 mt-1 italic">
            {character.gender === 'female' && character.age > 35 
              ? "Fertility naturally decreases with age." 
              : character.gender === 'male' && character.age > 45
                ? "Fertility gradually decreases with age."
                : "Influenced by age, health, and lifestyle factors."}
          </p>
        </div>
        
        {/* Hidden Attributes Hint */}
        <div className="pt-2 border-t border-gray-100 bg-gray-50 rounded-md p-2">
          <p className="text-xs text-gray-600">
            Your personality traits ({character.personalityTraits.join(', ')}) and values 
            ({character.lifeValues.join(', ')}) influence how events affect you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterStats;
