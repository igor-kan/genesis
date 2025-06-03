
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LifeEvent } from '@/models/gameTypes';
import { 
  Briefcase, 
  Heart, 
  GraduationCap, 
  Home, 
  Users,
  Activity,
  Baby,
  Coins,
  Clock
} from "lucide-react";

interface EventCardProps {
  event: LifeEvent;
  onChoice: (index: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onChoice }) => {
  // Get icon based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'career':
        return <Briefcase className="w-5 h-5" />;
      case 'relationship':
        return <Heart className="w-5 h-5" />;
      case 'family':
        return <Baby className="w-5 h-5" />;
      case 'education':
        return <GraduationCap className="w-5 h-5" />;
      case 'housing':
        return <Home className="w-5 h-5" />;
      case 'health':
        return <Activity className="w-5 h-5" />;
      case 'work':
        return <Clock className="w-5 h-5" />;
      case 'finances':
        return <Coins className="w-5 h-5" />;
      case 'social':
        return <Users className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  // Get background gradient based on event type
  const getEventGradient = (type: string) => {
    switch (type) {
      case 'career':
        return 'from-blue-50 to-cyan-50';
      case 'relationship':
        return 'from-pink-50 to-red-50';
      case 'family':
        return 'from-purple-50 to-violet-50';
      case 'education':
        return 'from-emerald-50 to-green-50';
      case 'housing':
        return 'from-amber-50 to-yellow-50';
      case 'health':
        return 'from-lime-50 to-emerald-50';
      case 'work':
        return 'from-sky-50 to-indigo-50';
      case 'finances':
        return 'from-yellow-50 to-amber-50';
      case 'social':
        return 'from-violet-50 to-purple-50';
      case 'life':
        return 'from-gray-50 to-slate-50';
      default:
        return 'from-blue-50 to-purple-50';
    }
  };

  // Get button style based on event type
  const getChoiceButtonStyle = (type: string) => {
    switch (type) {
      case 'career':
        return 'hover:bg-blue-50 hover:border-blue-200';
      case 'relationship':
        return 'hover:bg-pink-50 hover:border-pink-200';
      case 'family':
        return 'hover:bg-purple-50 hover:border-purple-200';
      case 'education':
        return 'hover:bg-green-50 hover:border-green-200';
      case 'housing':
        return 'hover:bg-amber-50 hover:border-amber-200';
      case 'health':
        return 'hover:bg-lime-50 hover:border-lime-200';
      case 'work':
        return 'hover:bg-sky-50 hover:border-sky-200';
      case 'finances':
        return 'hover:bg-yellow-50 hover:border-yellow-200';
      case 'social':
        return 'hover:bg-violet-50 hover:border-violet-200';
      default:
        return 'hover:bg-gray-50 hover:border-gray-200';
    }
  };

  return (
    <Card className="w-full max-w-md animate-float border-2 shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className={`bg-gradient-to-r ${getEventGradient(event.type)}`}>
        <div className="flex items-center gap-2">
          {getEventIcon(event.type)}
          <CardTitle>{getEventTitle(event.type)}</CardTitle>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> 
          <span>Age: {event.timestamp}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="mb-4 text-gray-700">{event.description}</p>
        
        {event.effect && Object.keys(event.effect).length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md text-sm border border-gray-100">
            <p className="font-medium text-gray-700 mb-1">Immediate Effects:</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(event.effect).map(([key, value]) => (
                <div key={key} 
                  className={`flex items-center p-1 rounded ${
                    value > 0 ? "text-green-700 bg-green-50" : 
                    value < 0 ? "text-red-700 bg-red-50" : 
                    "text-gray-700"
                  }`}
                >
                  <span className="capitalize text-xs">{formatEffectName(key)}:</span>
                  <span className="ml-1 font-semibold">{value > 0 ? "+" : ""}{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      {event.choices && event.choices.length > 0 && (
        <CardFooter className="flex flex-col gap-2">
          <p className="w-full text-sm font-medium mb-1 text-gray-700">What will you do?</p>
          {event.choices.map((choice, index) => {
            // Highlight potential effects of choices
            const positiveEffects = Object.entries(choice.effect)
              .filter(([_, value]) => value > 0)
              .map(([key]) => key);
              
            const negativeEffects = Object.entries(choice.effect)
              .filter(([_, value]) => value < 0)
              .map(([key]) => key);

            return (
              <Button 
                key={index} 
                variant="outline" 
                className={`w-full justify-start hover:bg-opacity-70 text-left group transition-all ${getChoiceButtonStyle(event.type)}`}
                onClick={() => onChoice(index)}
              >
                <div className="flex flex-col">
                  <span>{choice.text}</span>
                  {(positiveEffects.length > 0 || negativeEffects.length > 0) && (
                    <div className="mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {positiveEffects.length > 0 && (
                        <span className="text-green-600 mr-2">
                          +{positiveEffects.map(effect => formatEffectName(effect)).join(', ')}
                        </span>
                      )}
                      {negativeEffects.length > 0 && (
                        <span className="text-red-600">
                          -{negativeEffects.map(effect => formatEffectName(effect)).join(', ')}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Button>
            );
          })}
        </CardFooter>
      )}
    </Card>
  );
};

// Helper functions
const getEventTitle = (type: string): string => {
  switch (type) {
    case 'career':
      return 'Career Decision';
    case 'relationship':
      return 'Relationship Event';
    case 'family':
      return 'Family Matter';
    case 'education':
      return 'Education Opportunity';
    case 'housing':
      return 'Housing Decision';
    case 'health':
      return 'Health Situation';
    case 'work':
      return 'Work-Life Balance';
    case 'finances':
      return 'Financial Decision';
    case 'social':
      return 'Social Opportunity';
    case 'life':
      return 'Life Milestone';
    default:
      return 'Life Event';
  }
};

const formatEffectName = (key: string): string => {
  const formatted = key.replace(/([A-Z])/g, ' $1').toLowerCase();
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export default EventCard;
