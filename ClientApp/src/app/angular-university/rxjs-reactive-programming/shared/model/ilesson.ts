export interface ILesson {
  id?: number;
  description: string;
  longDescription?: string;
  duration?: string;
  completed?: boolean;
  tags?: string;
  url?: string;
  videoUrl?: string;
}
