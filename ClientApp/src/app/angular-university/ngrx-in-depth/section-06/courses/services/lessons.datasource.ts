import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { ILesson } from '../../model/lesson';
import { CoursesService } from './courses.service';
import { catchError, finalize, tap, takeUntil } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state';
import { PageQuery } from '../state/actions';

@Injectable()
export class LessonsDataSource implements DataSource<ILesson> {
    private _unsubscribe$ = new Subject<void>();
    private lessonsSubject = new BehaviorSubject<ILesson[]>([]);

    constructor(private _state$: Store<AppState>, private _log: NGXLogger) {}

    loadLessons(courseId: number, pageQuery: PageQuery) {}

    connect(collectionViewer: CollectionViewer): Observable<ILesson[]> {
        this._log.trace('Connecting data source');

        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
