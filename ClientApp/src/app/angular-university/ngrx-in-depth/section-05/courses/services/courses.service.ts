import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ICourse } from '../../model/course';
import { map, tap } from 'rxjs/operators';
import { ILesson } from '../../model/lesson';
import { tag } from 'rxjs-spy/operators';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class CoursesService {
    constructor(private http: HttpClient, private _log: NGXLogger) {}

    findCourseById(courseId: number): Observable<ICourse> {
        this._log.debug(courseId);

        return this.http.get<ICourse>(`/api/ngrx/courses/${courseId}`);
    }

    findAllCourses(): Observable<ICourse[]> {
        return this.http.get<ICourse[]>('/api/ngrx/courses').pipe(tag('findAllCourses'));
    }

    findAllCourseLessons(courseId: number): Observable<ILesson[]> {
        this._log.debug(courseId);

        return this.http
            .get<ILesson[]>('/api/ngrx/lessons', {
                params: new HttpParams()
                    .set('courseId', courseId.toString())
                    .set('pageNumber', '0')
                    .set('pageSize', '1000'),
            })
            .pipe(tag('findAllCourseLessons'));
    }

    findLessons(courseId: number, pageNumber = 0, pageSize = 3): Observable<ILesson[]> {
        this._log.debug(courseId, pageNumber, pageSize);

        return this.http
            .get<ILesson[]>(
                `/api/ngrx/lessons/${courseId.toString()}/${pageNumber.toString()}/${pageSize.toString()}//asc`,
                {
                    // .get<Lesson[]>('/api/ngrx/lessons', {
                    //     params: new HttpParams()
                    //         .set('courseId', courseId.toString())
                    //         .set('filter', '')
                    //         .set('sortOrder', 'asc')
                    //         .set('pageNumber', pageNumber.toString())
                    //         .set('pageSize', pageSize.toString()),
                }
            )
            .pipe(tag('findLessons'));
    }

    saveCourse(courseId: number, changes: Partial<ICourse>) {
        this._log.debug(courseId, changes);

        return this.http.put('/api/ngrx/courses/' + courseId, changes).pipe(tag('saveCourse'));
    }
}
