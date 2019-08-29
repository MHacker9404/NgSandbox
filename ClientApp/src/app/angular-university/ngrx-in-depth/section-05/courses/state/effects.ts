import _flatted from 'flatted';
import { NGXLogger } from 'ngx-logger';
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ICourse } from '../../model/course';
import { CoursesService } from '../services/courses.service';
import { CoursesActionTypes, LoadCourse, RequestCourse } from './actions';

@Injectable()
export class CoursesEffects {
    constructor(
        private _actions$: Actions,
        private _router: Router,
        private _route: ActivatedRoute,
        private _service: CoursesService,
        private _log: NGXLogger
    ) {}

    @Effect() loadCourse$ = this._actions$.pipe(
        ofType<RequestCourse>(CoursesActionTypes.RequestCourse),
        mergeMap((action: RequestCourse) => this._service.findCourseById(action.payload.courseId)),
        map((course: ICourse) => new LoadCourse({ course }))
    );
}
