import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ILesson } from '../shared/model/ilesson';
import { DatastoreService } from './datastore.service';
import { map, tap, takeUntil, publishLast, refCount } from 'rxjs/operators';
import _cloneDeep from 'lodash/cloneDeep';
import _slice from 'lodash/slice';
import _take from 'lodash/take';
import { tag } from 'rxjs-spy/operators';
import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: null,
})
export class LessonsPagerService implements OnDestroy {
    private readonly _PAGE_SIZE = 2;
    private _currentUrl: string;
    private _lessons: ILesson[];
    private _subject: BehaviorSubject<ILesson[]> = new BehaviorSubject<ILesson[]>([]);
    private _unsubscribe$: Subject<void> = new Subject<void>();

    lessonsPage$: Observable<ILesson[]> = this._subject.asObservable();
    currentPageNumber = 1;

    private pushData() {
        const offset = (this.currentPageNumber - 1) * this._PAGE_SIZE;
        const lessons = _cloneDeep(_take(_slice(this._lessons, offset), this._PAGE_SIZE));
        this._log.trace(this.currentPageNumber, offset, lessons);

        this._subject.next(lessons);
    }

    constructor(private _dataStore: DatastoreService, private _log: NGXLogger) {
        this._log.trace('lessons-pager');
    }

    loadFirstPage(url: string): Observable<any> {
        this._currentUrl = url;
        this.currentPageNumber = 1;

        return this._dataStore.getLessonsForCourse(this._currentUrl).pipe(
            takeUntil(this._unsubscribe$),
            map((lessons: ILesson[]) => (this._lessons = _cloneDeep(lessons))),
            tap(lessons => this.pushData()),
            publishLast(),
            refCount(),
            tag('lessonsPager: loadFirstPage')
        );
    }

    nextPage() {
        const currentPageNumber = this.currentPageNumber;
        this.currentPageNumber =
            this.currentPageNumber < this._lessons.length / this._PAGE_SIZE
                ? this.currentPageNumber + 1
                : this.currentPageNumber;

        this._log.trace({
            currentPageNumber,
            length: this._lessons.length,
            pageCount: this._lessons.length / this._PAGE_SIZE,
            newPageNumber: this.currentPageNumber,
        });

        this.pushData();
    }

    previousPage() {
        this.currentPageNumber = this.currentPageNumber > 1 ? this.currentPageNumber - 1 : 1;
        this.pushData();
    }

    ngOnDestroy(): void {
        this._log.trace('LessonsPager: OnDestroy');

        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
