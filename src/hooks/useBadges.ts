import { useState, useEffect } from 'react';
import { Badge } from '../types/badge';
import { BADGES_CONFIG } from '../config/badges';

export interface WorkoutStats {
  totalWorkouts: number;
  totalSquats: number;
  averageAccuracy: number;
  currentStreak: number;
  workoutDate: Date;
}

export const useBadges = () => {
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [newlyEarned, setNewlyEarned] = useState<Badge | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('spectrax_badges') || '[]');
    setEarnedBadges(saved);
  }, []);

  const checkAndAwardBadges = (stats: WorkoutStats) => {
    const currentEarned = JSON.parse(localStorage.getItem('spectrax_badges') || '[]');
    const newlyUnlocked: string[] = [];

    BADGES_CONFIG.forEach(badge => {
      if (currentEarned.includes(badge.id)) return;

      let isEarned = false;
      switch (badge.criteriaType) {
        case 'workouts':
          if (stats.totalWorkouts >= badge.targetValue) isEarned = true;
          break;
        case 'reps':
          if (stats.totalSquats >= badge.targetValue) isEarned = true;
          break;
        case 'accuracy':
          if (stats.averageAccuracy >= badge.targetValue) isEarned = true;
          break;
        case 'streak':
          if (stats.currentStreak >= badge.targetValue) isEarned = true;
          break;
        case 'time':
          if (stats.workoutDate.getHours() >= badge.targetValue) isEarned = true;
          break;
      }

      if (isEarned) {
        newlyUnlocked.push(badge.id);
        setNewlyEarned(badge);
      }
    });

    if (newlyUnlocked.length > 0) {
      const updatedBadges = [...currentEarned, ...newlyUnlocked];
      localStorage.setItem('spectrax_badges', JSON.stringify(updatedBadges));
      setEarnedBadges(updatedBadges);
    }
  };

  const clearNewlyEarned = () => {
    setNewlyEarned(null);
  };

  return { earnedBadges, checkAndAwardBadges, newlyEarned, clearNewlyEarned };
};
