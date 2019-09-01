import { Action } from '@ngrx/store';
import { ICourse } from '../../model/course';
import { Update } from '@ngrx/entity';

export enum CoursesActionTypes {
    RequestCourse = '[View Course Page] Request Course',
    LoadCourse = '[Course API] Load Course',
    RequestAllCourses = '[Courses Home Page] Request All Courses',
    LoadAllCourses = '[Course API] Load All Courses',
    SaveCourse = '[Edit Course Dialog] Save Course',
}

export class RequestCourse implements Action {
    readonly type = CoursesActionTypes.RequestCourse;
    constructor(public payload: { courseId: number }) {}
}

export class LoadCourse implements Action {
    readonly type = CoursesActionTypes.LoadCourse;
    constructor(public payload: { course: ICourse }) {}
}

export class RequestAllCourses implements Action {
    readonly type = CoursesActionTypes.RequestAllCourses;
    constructor() {}
}

export class LoadAllCourses implements Action {
    readonly type = CoursesActionTypes.LoadAllCourses;
    constructor(public payload: { courses: ICourse[] }) {}
}

export class SaveCourse implements Action {
    readonly type = CoursesActionTypes.SaveCourse;
    constructor(public payload: { course: Update<ICourse> }) {}
}

export type CourseActions = RequestCourse | LoadCourse | RequestAllCourses | LoadAllCourses | SaveCourse;
