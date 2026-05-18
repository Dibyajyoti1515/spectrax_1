export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // Name of the Lucide icon to render dynamically
  criteriaType: 'reps' | 'workouts' | 'accuracy' | 'streak' | 'time';
  targetValue: number;
}
