import { Injectable } from '@angular/core';
import { ILesson } from '../../shared/model/ilesson';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ICourse } from '../../shared/model/icourse';
import _cloneDeep from 'lodash/cloneDeep';
import _flatMap from 'lodash/flatMap';
import _shuffle from 'lodash/shuffle';
import _slice from 'lodash/slice';
import _find from 'lodash/find';
import { HttpClient } from '@angular/common/http';
import { tap, publishLast, refCount, map } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';
import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: null,
})
export class DatastoreService {
    constructor(private _http: HttpClient, private _log: NGXLogger) {}

    getCourses(): Observable<ICourse[]> {
        return this._http.get<ICourse[]>(`/api/courses`).pipe(tag('dataStoreService: getCourses'));
    }

    getLessons(): Observable<ILesson[]> {
        return this._http.get<ILesson[]>(`/api/lessons`).pipe(
            map((lessons: ILesson[]) => _cloneDeep(_slice(_shuffle(lessons), 0, 10))),
            tag('dataStoreService: getCourses')
        );
    }

    getCourseByUrl(curl: string): Observable<ICourse> {
        return this._http.get<ICourse>(`/api/courses/${curl}`).pipe(tag('dataStoreService: getCourseByUrl'));
    }

    getLessonsForCourse(curl: string): Observable<ILesson[]> {
        return this._http.get<ILesson[]>(`/api/lessons/${curl}`).pipe(tag('dataStoreService: getLessonsForCourse'));
    }

    getLessonByUrl(curl: string, lurl: string): Observable<ILesson> {
        this._log.debug(curl, lurl);

        return this._http.get<ILesson>(`/api/lessons/${curl}/${lurl}`).pipe(tag('dataStoreService: getLessonByUrl'));
    }
}
