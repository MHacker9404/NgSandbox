import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators/filter';
import { first } from 'rxjs/operators/first';
import { tap } from 'rxjs/operators/tap';
import { AppState } from 'src/app/state';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { ICourse } from '../../model/course';
import { RequestCourse } from '../state/actions';
import { selectCourseById } from '../state/selectors';
import { CoursesService } from './courses.service';

@Injectable()
export class CourseResolver implements Resolve<ICourse> {
    constructor(private coursesService: CoursesService, private _store$: Store<AppState>) {}

    resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<ICourse> {
        const courseId = _route.params['id'];
        return this._store$.pipe(
            select(selectCourseById(courseId)),
            tap((course: ICourse) => {
                if (!course) {
                    this._store$.dispatch(new RequestCourse({ courseId }));
                }
            }),
            filter((course: ICourse) => !!course),
            first()
        );
    }
}
