
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Character } from '@/models/gameTypes';
import { Baby, Heart, Users } from "lucide-react";

interface FamilyTreeProps {
  character: Character;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ character }) => {
  const { children, partner } = character;
  const hasFamily = partner || children.length > 0;

  return (
    <Card className="w-full border-2 border-purple-100">
      <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-500" />
          Family Tree
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasFamily ? (
          <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-md border border-gray-100">
            <p className="italic">No family members yet</p>
            <p className="text-xs mt-1">Start a relationship or family to see your family tree grow</p>
          </div>
        ) : (
          <div className="space-y-4">
            {partner && (
              <div className="relative">
                <div className="absolute top-1/2 -left-2 w-4 h-[2px] bg-purple-200"></div>
                <div className="flex items-center p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-md border border-purple-100">
                  <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shadow-sm border border-purple-200">
                    <Heart className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{partner.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{partner.gender === 'female' ? 'Wife' : 'Husband'}</span>
                      <span className="mx-1.5">•</span>
                      <span>{partner.age} years</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {children.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Baby className="h-4 w-4 text-purple-500" />
                  <p className="text-sm font-medium text-purple-700">Children ({children.length})</p>
                </div>
                <div className="pl-3 border-l-2 border-purple-100 space-y-2">
                  {children.map((child, index) => (
                    <div key={index} className="flex items-center p-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-100">
                      <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center mr-3 shadow-sm border border-blue-200">
                        <span className="text-blue-500 font-semibold">{child.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{child.name}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{child.gender === 'female' ? 'Daughter' : 'Son'}</span>
                          <span className="mx-1">•</span>
                          <span>{child.age} years old</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {hasFamily && children.length === 0 && (
              <div className="mt-2 p-2 bg-blue-50 rounded-md text-xs text-blue-700 border border-blue-100">
                <p>Having children can bring joy and new dimensions to your life journey.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FamilyTree;
