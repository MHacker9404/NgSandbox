import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ICourse } from '../../shared/model/icourse';
import { ILesson } from '../../shared/model/ilesson';
import { Observable, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { DatastoreService } from '../services/datastore.service';
import { switchMap, map, tap } from 'rxjs/operators';
import _first from 'lodash/first';
import { tag } from 'rxjs-spy/operators/tag';
import _flatted from 'flatted';

@Injectable()
export class CourseDetailResolver implements Resolve<[ICourse, ILesson[]]> {
    constructor(private _dataStore: DatastoreService, private _log: NGXLogger) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[ICourse, ILesson[]]> {
        // this._log.trace(_flatted.stringify({ route, state }));

        return this._dataStore.getCourseByUrl(route.params['id']).pipe(
            switchMap((course: ICourse) =>
                this._dataStore
                    .getLessonsForCourse(course.url)
                    .pipe(switchMap((lessons: ILesson[]) => forkJoin([course], [lessons])))
            ),
            tag('courseDetailResolver')
        );
    }
}
