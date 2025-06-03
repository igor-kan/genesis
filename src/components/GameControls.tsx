
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PlayCircle, PauseCircle, FastForward, RotateCcw } from "lucide-react";

interface GameControlsProps {
  gameSpeed: number;
  isPaused: boolean;
  onPauseToggle: () => void;
  onSpeedChange: (speed: number) => void;
  onAdvanceYear: () => void;
  onReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameSpeed,
  isPaused,
  onPauseToggle,
  onSpeedChange,
  onAdvanceYear,
  onReset
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold mb-3">Game Controls</h3>
      
      <div className="flex items-center gap-2 mb-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onPauseToggle}
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? (
            <PlayCircle className="h-5 w-5" />
          ) : (
            <PauseCircle className="h-5 w-5" />
          )}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onAdvanceYear}
          aria-label="Advance one year"
        >
          <FastForward className="h-5 w-5" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          aria-label="Reset game"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Game Speed</span>
          <span className="text-sm font-medium">{gameSpeed}x</span>
        </div>
        <Slider
          value={[gameSpeed]}
          min={1}
          max={5}
          step={1}
          onValueChange={(values) => onSpeedChange(values[0])}
        />
      </div>
    </div>
  );
};

export default GameControls;
