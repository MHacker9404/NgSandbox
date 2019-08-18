import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from '../../model/course';
import { map, tap } from 'rxjs/operators';
import { Lesson } from '../../model/lesson';
import { tag } from 'rxjs-spy/operators';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class CoursesService {
    constructor(private http: HttpClient, private _log:NGXLogger) {}

    findCourseById(courseId: number): Observable<Course> {
        this._log.debug(courseId);

        return this.http.get<Course>(`/api/ngrx/courses/${courseId}`);
    }

    findAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>('/api/ngrx/courses').pipe(tag('findAllCourses'));
    }

    findAllCourseLessons(courseId: number): Observable<Lesson[]> {
        this._log.debug(courseId);

        return this.http
            .get<Lesson[]>('/api/ngrx/lessons', {
                params: new HttpParams()
                    .set('courseId', courseId.toString())
                    .set('pageNumber', '0')
                    .set('pageSize', '1000'),
            })
            .pipe(tag('findAllCourseLessons'));
    }

    findLessons(courseId: number, pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
        this._log.debug(courseId, pageNumber, pageSize);

        return this.http
            .get<Lesson[]>(
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

    saveCourse(courseId: number, changes: Partial<Course>) {
        this._log.debug(courseId, changes);

        return this.http.put('/api/ngrx/courses/' + courseId, changes).pipe(tag('saveCourse'));
    }
}
