
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { getCountryList } from '@/data/countries';
import { Gender, SexualOrientation, PersonalityTrait, LifeValue, GameMode } from '@/models/gameTypes';
import { User, Heart, Brain, Target, Globe, Gamepad2 } from "lucide-react";

interface EnhancedCharacterCreationProps {
  onComplete: (characterData: CharacterCreationData) => void;
}

interface CharacterCreationData {
  name: string;
  gender: Gender;
  sexualOrientation: SexualOrientation;
  country: string;
  personalityTraits: PersonalityTrait[];
  lifeValues: LifeValue[];
  gameMode: GameMode;
  researchDataConsent: boolean;
  scenario?: string;
}

const personalityOptions: { trait: PersonalityTrait; label: string; description: string }[] = [
  { trait: 'ambitious', label: 'Ambitious', description: 'Driven to achieve goals and advance in career' },
  { trait: 'nurturing', label: 'Nurturing', description: 'Caring and supportive, drawn to family life' },
  { trait: 'adventurous', label: 'Adventurous', description: 'Seeks new experiences and challenges' },
  { trait: 'stable', label: 'Stable', description: 'Values security and predictability' },
  { trait: 'creative', label: 'Creative', description: 'Artistic and innovative thinking' },
  { trait: 'analytical', label: 'Analytical', description: 'Logical and detail-oriented approach' },
  { trait: 'social', label: 'Social', description: 'Enjoys connecting with others' },
  { trait: 'independent', label: 'Independent', description: 'Self-reliant and autonomous' }
];

const lifeValueOptions: { value: LifeValue; label: string; description: string }[] = [
  { value: 'career', label: 'Career Success', description: 'Professional achievement and recognition' },
  { value: 'family', label: 'Family Life', description: 'Strong relationships and family bonds' },
  { value: 'stability', label: 'Stability', description: 'Financial and emotional security' },
  { value: 'freedom', label: 'Freedom', description: 'Independence and flexibility' },
  { value: 'wealth', label: 'Wealth', description: 'Financial prosperity and material success' },
  { value: 'creativity', label: 'Creativity', description: 'Artistic expression and innovation' },
  { value: 'social', label: 'Social Impact', description: 'Making a difference in community' },
  { value: 'health', label: 'Health & Wellness', description: 'Physical and mental well-being' }
];

const scenarios = [
  { id: 'balanced', title: 'Balanced Life', description: 'Maintain work-life balance while raising a family' },
  { id: 'career', title: 'Career First', description: 'Focus on professional success before family' },
  { id: 'earlyFamily', title: 'Early Family', description: 'Start a family young and build career around it' },
  { id: 'singleParent', title: 'Single Parent', description: 'Navigate single parenthood challenges' },
  { id: 'fertility', title: 'Fertility Journey', description: 'Overcome fertility challenges to have children' },
  { id: 'migration', title: 'New Country', description: 'Start fresh in a new country' }
];

const EnhancedCharacterCreation: React.FC<EnhancedCharacterCreationProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('female');
  const [sexualOrientation, setSexualOrientation] = useState<SexualOrientation>('heterosexual');
  const [country, setCountry] = useState('usa');
  const [personalityTraits, setPersonalityTraits] = useState<PersonalityTrait[]>([]);
  const [lifeValues, setLifeValues] = useState<LifeValue[]>([]);
  const [gameMode, setGameMode] = useState<GameMode>('sandbox');
  const [scenario, setScenario] = useState<string>('');
  const [researchDataConsent, setResearchDataConsent] = useState(false);
  const [error, setError] = useState('');

  const handlePersonalityChange = (trait: PersonalityTrait, checked: boolean) => {
    if (checked && personalityTraits.length < 3) {
      setPersonalityTraits([...personalityTraits, trait]);
    } else if (!checked) {
      setPersonalityTraits(personalityTraits.filter(t => t !== trait));
    }
  };

  const handleLifeValueChange = (value: LifeValue, checked: boolean) => {
    if (checked && lifeValues.length < 3) {
      setLifeValues([...lifeValues, value]);
    } else if (!checked) {
      setLifeValues(lifeValues.filter(v => v !== value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim().length < 2) {
      setError('Please enter a valid name (at least 2 characters)');
      return;
    }
    
    if (personalityTraits.length === 0) {
      setError('Please select at least one personality trait');
      return;
    }
    
    if (lifeValues.length === 0) {
      setError('Please select at least one life value');
      return;
    }

    onComplete({
      name,
      gender,
      sexualOrientation,
      country,
      personalityTraits,
      lifeValues,
      gameMode,
      researchDataConsent,
      scenario: gameMode === 'scenario' ? scenario : undefined
    });
  };

  return (
    <div className="max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden bg-white p-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-800 mb-2">Create Your Character</h2>
        <p className="text-gray-600">Design your unique life journey with detailed customization</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Basic
            </TabsTrigger>
            <TabsTrigger value="orientation" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Identity
            </TabsTrigger>
            <TabsTrigger value="personality" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Personality
            </TabsTrigger>
            <TabsTrigger value="values" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Values
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Location & Mode
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your character's name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Gender</Label>
                  <RadioGroup value={gender} onValueChange={(value) => setGender(value as Gender)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orientation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sexual Orientation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Label>Orientation</Label>
                  <Select value={sexualOrientation} onValueChange={(value) => setSexualOrientation(value as SexualOrientation)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="heterosexual">Heterosexual</SelectItem>
                      <SelectItem value="homosexual">Homosexual</SelectItem>
                      <SelectItem value="bisexual">Bisexual</SelectItem>
                      <SelectItem value="asexual">Asexual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="personality" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personality Traits</CardTitle>
                <p className="text-sm text-gray-600">Select up to 3 traits that best describe you</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personalityOptions.map((option) => (
                    <div key={option.trait} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={option.trait}
                        checked={personalityTraits.includes(option.trait)}
                        onCheckedChange={(checked) => handlePersonalityChange(option.trait, checked as boolean)}
                        disabled={!personalityTraits.includes(option.trait) && personalityTraits.length >= 3}
                      />
                      <div className="flex-1">
                        <Label htmlFor={option.trait} className="font-medium">{option.label}</Label>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">Selected: {personalityTraits.length}/3</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="values" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Life Values</CardTitle>
                <p className="text-sm text-gray-600">Select up to 3 values that are most important to you</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lifeValueOptions.map((option) => (
                    <div key={option.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={option.value}
                        checked={lifeValues.includes(option.value)}
                        onCheckedChange={(checked) => handleLifeValueChange(option.value, checked as boolean)}
                        disabled={!lifeValues.includes(option.value) && lifeValues.length >= 3}
                      />
                      <div className="flex-1">
                        <Label htmlFor={option.value} className="font-medium">{option.label}</Label>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">Selected: {lifeValues.length}/3</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="location" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Location & Game Mode</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genericland">Genericland (Randomized System)</SelectItem>
                      {getCountryList().map((countryName) => (
                        <SelectItem key={countryName} value={countryName}>
                          {countryName.charAt(0).toUpperCase() + countryName.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label>Game Mode</Label>
                  <RadioGroup value={gameMode} onValueChange={(value) => setGameMode(value as GameMode)}>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="sandbox" id="sandbox" className="mt-1" />
                        <div>
                          <Label htmlFor="sandbox" className="font-medium">Sandbox Mode</Label>
                          <p className="text-sm text-gray-600">Free play - make choices and observe outcomes</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="scenario" id="scenario" className="mt-1" />
                        <div>
                          <Label htmlFor="scenario" className="font-medium">Scenario Mode</Label>
                          <p className="text-sm text-gray-600">Play with specific goals and challenges</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 p-3 border rounded-lg opacity-50">
                        <RadioGroupItem value="multiplayer" id="multiplayer" disabled className="mt-1" />
                        <div>
                          <Label htmlFor="multiplayer" className="font-medium">Multiplayer Mode</Label>
                          <p className="text-sm text-gray-600">Coming soon - compete with others</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                {gameMode === 'scenario' && (
                  <div className="space-y-2">
                    <Label>Scenario</Label>
                    <Select value={scenario} onValueChange={setScenario}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        {scenarios.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            <div>
                              <div className="font-medium">{s.title}</div>
                              <div className="text-sm text-gray-600">{s.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Checkbox
                    id="research"
                    checked={researchDataConsent}
                    onCheckedChange={(checked) => setResearchDataConsent(checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="research" className="font-medium text-blue-800">Research Participation</Label>
                    <p className="text-sm text-blue-700 mt-1">
                      Allow anonymous data collection for fertility and family planning research. 
                      Your choices help researchers understand decision-making patterns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        
        <div className="mt-6 flex justify-center">
          <Button type="submit" size="lg" className="px-8">
            <Gamepad2 className="h-5 w-5 mr-2" />
            Start Your Life Journey
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedCharacterCreation;
