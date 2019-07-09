import {ILesson} from './ilesson';

export interface ICourse {
  url: string;
  description: string;
  iconUrl: string;
  courseListIcon: string;
  longDescription: string;
  lessons: ILesson[];
}
