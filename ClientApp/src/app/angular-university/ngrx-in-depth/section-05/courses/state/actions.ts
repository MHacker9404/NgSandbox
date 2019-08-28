import { Action } from '@ngrx/store';
import { ICourse } from '../../model/course';

export enum CoursesActionTypes {
    RequestCourse = '[View Course Page] Request Course',
    LoadCourse = '[Course API] Load Course',
}

export class RequestCourse implements Action {
    readonly type = CoursesActionTypes.RequestCourse;
    constructor(public payload: { courseId: number }) {}
}

export class LoadCourse implements Action {
    readonly type = CoursesActionTypes.LoadCourse;
    constructor(public payload: { course: ICourse }) {}
}

export type CourseActions = RequestCourse | LoadCourse;
