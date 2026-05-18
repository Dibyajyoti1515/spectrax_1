import React, { useEffect, useState } from 'react';
import { Badge } from '../types/badge';
import { Footprints, Dumbbell, Target, Flame, Moon } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Footprints: <Footprints className="text-yellow-500 w-6 h-6" />,
  Dumbbell: <Dumbbell className="text-yellow-500 w-6 h-6" />,
  Target: <Target className="text-yellow-500 w-6 h-6" />,
  Flame: <Flame className="text-yellow-500 w-6 h-6" />,
  Moon: <Moon className="text-yellow-500 w-6 h-6" />,
};

interface BadgeNotificationProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeNotification: React.FC<BadgeNotificationProps> = ({ badge, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (badge) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for transition
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [badge, onClose]);

  if (!badge && !isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center p-4 space-x-4 bg-gray-800 rounded-lg shadow-lg border border-yellow-500/50 transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex-shrink-0 p-2 bg-gray-900 rounded-full border border-yellow-500/30">
        {badge && iconMap[badge.icon]}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white">Badge Unlocked!</h4>
        <p className="text-sm text-yellow-400 font-bold">{badge?.title}</p>
        <p className="text-xs text-gray-300 mt-1">{badge?.description}</p>
      </div>
      <button 
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-auto text-gray-400 hover:text-white"
      >
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
