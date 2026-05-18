import React from 'react';
import { BADGES_CONFIG } from '../config/badges';
import { useBadges } from '../hooks/useBadges';
import { Footprints, Dumbbell, Target, Flame, Moon, Lock } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Footprints,
  Dumbbell,
  Target,
  Flame,
  Moon,
};

export const TrophyRoom: React.FC = () => {
  const { earnedBadges } = useBadges();

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        Trophy Room
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {BADGES_CONFIG.map((badge) => {
          const isUnlocked = earnedBadges.includes(badge.id);
          const IconComponent = iconMap[badge.icon] || Target;

          return (
            <div 
              key={badge.id}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center ${
                isUnlocked 
                  ? 'border-yellow-500/50 bg-gray-800 shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] hover:-translate-y-1' 
                  : 'border-gray-700 bg-gray-800/50 grayscale opacity-60'
              }`}
            >
              {!isUnlocked && (
                <div className="absolute top-4 right-4 text-gray-500">
                  <Lock size={20} />
                </div>
              )}
              
              <div className={`p-4 rounded-full mb-4 ${
                isUnlocked ? 'bg-gray-900 border border-yellow-500/30' : 'bg-gray-800'
              }`}>
                <IconComponent 
                  size={48} 
                  className={isUnlocked ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'text-gray-500'} 
                />
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                {badge.title}
              </h3>
              
              <p className={`text-sm mb-4 flex-grow ${isUnlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                {badge.description}
              </p>

              {isUnlocked ? (
                <span className="text-xs font-semibold text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full mt-auto">
                  Unlocked
                </span>
              ) : (
                <div className="w-full bg-gray-700 rounded-full h-2 mt-auto overflow-hidden">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
