import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { ILesson } from '../../model/lesson';
import { tap, takeUntil, catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state';
import { PageQuery, RequestLessonsPage } from '../state/actions';
import { selectLessonPage } from '../state/selectors';

@Injectable()
export class LessonsDataSource implements DataSource<ILesson> {
    private lessonsSubject = new BehaviorSubject<ILesson[]>([]);

    constructor(private _state$: Store<AppState>, private _log: NGXLogger) {}

    loadLessons(courseId: number, pageQuery: PageQuery) {
        this._state$
            .pipe(
                select(selectLessonPage(courseId, pageQuery)),
                tap((lessons: ILesson[]) => {
                    if (lessons && lessons.length > 0) {
                        this.lessonsSubject.next(lessons);
                    } else {
                        this._state$.dispatch(new RequestLessonsPage({ courseId, pageQuery }));
                    }
                }),
                catchError(error => of([]))
            )
            .subscribe();
    }

    connect(collectionViewer: CollectionViewer): Observable<ILesson[]> {
        this._log.trace('Connecting data source');

        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {}
}
