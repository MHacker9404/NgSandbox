import _flatted from 'flatted';
import { NGXLogger } from 'ngx-logger';
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ICourse } from '../../model/course';
import { CoursesService } from '../services/courses.service';
import {
    CoursesActionTypes,
    LoadCourse,
    RequestCourse,
    RequestAllCourses,
    LoadAllCourses,
    RequestLessonsPage,
    LoadLessonsPage,
    CancelLessonsPage,
} from './actions';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state';
import { withLatestFrom, filter, catchError } from 'rxjs/operators';
import { allCoursesLoaded } from './selectors';
import { of } from 'rxjs';

@Injectable()
export class CoursesEffects {
    constructor(
        private _actions$: Actions,
        private _router: Router,
        private _route: ActivatedRoute,
        private _service: CoursesService,
        private _log: NGXLogger,
        private _state$: Store<AppState>
    ) {}

    @Effect() loadCourse$ = this._actions$.pipe(
        ofType<RequestCourse>(CoursesActionTypes.RequestCourse),
        mergeMap((action: RequestCourse) => this._service.findCourseById(action.payload.courseId)),
        map((course: ICourse) => new LoadCourse({ course }))
    );

    @Effect() loadAllCourses$ = this._actions$.pipe(
        ofType<RequestAllCourses>(CoursesActionTypes.RequestAllCourses),
        withLatestFrom(this._state$.pipe(select(allCoursesLoaded))),
        filter(([action, coursesLoaded]) => !coursesLoaded),
        mergeMap(() => this._service.findAllCourses()),
        map((courses: ICourse[]) => new LoadAllCourses({ courses }))
    );

    @Effect() loadLessonsPage$ = this._actions$.pipe(
        ofType<RequestLessonsPage>(CoursesActionTypes.RequestLessonsPage),
        mergeMap(({ payload }) => {
            return this._service
                .findLessons(payload.courseId, payload.pageQuery.pageIndex, payload.pageQuery.pageSize)
                .pipe(
                    catchError(error => {
                        this._log.error(error);
                        this._state$.dispatch(new CancelLessonsPage());
                        return of([]);
                    })
                );
        }),
        map(lessons => new LoadLessonsPage({ lessons }))
    );
}
