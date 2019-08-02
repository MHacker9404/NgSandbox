import { Injectable } from '@angular/core';
import { ILesson } from '../shared/model/ilesson';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ICourse } from '../shared/model/icourse';
import _cloneDeep from 'lodash/cloneDeep';
import _flatMap from 'lodash/flatMap';
import _shuffle from 'lodash/shuffle';
import _slice from 'lodash/slice';
import _find from 'lodash/find';
import { HttpClient } from '@angular/common/http';
import { tap, publishLast, refCount, map } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';

@Injectable({
    providedIn: null,
})
export class DatastoreService {
    private _courses: ICourse[];
    private _courseListSubject: BehaviorSubject<ICourse[]> = new BehaviorSubject(this._courses);

    public courseList$: Observable<ICourse[]> = this._courseListSubject.asObservable();

    private _lessons: ILesson[];
    private _lessonsListSubject: BehaviorSubject<ILesson[]> = new BehaviorSubject(this._lessons);

    public lessonsList$: Observable<ILesson[]> = this._lessonsListSubject.asObservable();

    constructor(private _http: HttpClient) {
        // this.loadInitialData();
    }

    private loadInitialData() {
        this._http.get<ICourse[]>(`/api/courses`).pipe(
            tap((courses: ICourse[]) => {
                const cs = _cloneDeep(courses);
                const ls = _slice(_cloneDeep(_shuffle(_flatMap(cs, course => course.lessons))), 0, 10);
                this._courseListSubject.next(cs);
                this._lessonsListSubject.next(ls);
            }),
            tag('dataStoreService: loadInitialData')
        );
    }

    getCourses(): Observable<ICourse[]> {
        return this._http.get<ICourse[]>(`/api/courses`).pipe(
            tap((courses: ICourse[]) => this._courseListSubject.next(courses)),
            tag('dataStoreService: getCourses')
        );
    }

    getCourseByUrl(curl: string): Observable<ICourse> {
        return this._http.get<ICourse>(`/api/courses/${curl}`).pipe(tag('dataStoreService: getCourseByUrl'));
    }

    getLessonsForCourse(curl: string): Observable<ILesson[]> {
        return this._http.get<ICourse>(`/api/courses/${curl}`).pipe(
            tap((course: ICourse) => this._lessonsListSubject.next(_cloneDeep(course.lessons))),
            map((course: ICourse) => _cloneDeep(course.lessons)),
            tag('dataStoreService: getLessonsForCourse')
        );
    }

    getLessonByUrl(curl: string, lurl: string): Observable<ILesson> {
        return this._http.get<ILesson>(`/api/courses/${curl}/${lurl}`).pipe(tag('dataStoreService: getLessonByUrl'));
    }
}
