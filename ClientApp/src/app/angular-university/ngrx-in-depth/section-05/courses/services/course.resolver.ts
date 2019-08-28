import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ICourse } from '../../model/course';
import { Observable } from 'rxjs';
import { CoursesService } from './courses.service';
import { AppState } from 'src/app/state';
import { Store } from '@ngrx/store';

@Injectable()
export class CourseResolver implements Resolve<ICourse> {
    constructor(private coursesService: CoursesService, private _state$: Store<AppState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICourse> {
        return this.coursesService.findCourseById(route.params['id']);
    }
}
