import { Action } from '@ngrx/store';
import { ICourse } from '../../model/course';
import { Update } from '@ngrx/entity';
import { ILesson } from '../../model/lesson';

export enum CoursesActionTypes {
    RequestCourse = '[View Course Page] Request Course',
    LoadCourse = '[Course API] Load Course',
    RequestAllCourses = '[Courses Home Page] Request All Courses',
    LoadAllCourses = '[Course API] Load All Courses',
    SaveCourse = '[Edit Course Dialog] Save Course',
    RequestLessonsPage = '[Course Landing Page] Request Lessons Page',
    LoadLessonsPage = '[Course API] Load Lessons Page',
    CancelLessonsPage = '[Course API] Cancel Lessons Page',
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

export interface PageQuery {
    pageIndex: number;
    pageSize: number;
}
export class RequestLessonsPage implements Action {
    readonly type = CoursesActionTypes.RequestLessonsPage;
    constructor(public payload: { courseId: number; pageQuery: PageQuery }) {}
}

export class LoadLessonsPage implements Action {
    readonly type = CoursesActionTypes.LoadLessonsPage;
    constructor(public payload: { lessons: ILesson[] }) {}
}

export class CancelLessonsPage implements Action {
    readonly type = CoursesActionTypes.CancelLessonsPage;
}

export type CourseActions =
    | RequestCourse
    | LoadCourse
    | RequestAllCourses
    | LoadAllCourses
    | SaveCourse
    | RequestLessonsPage
    | LoadLessonsPage
    | CancelLessonsPage;
