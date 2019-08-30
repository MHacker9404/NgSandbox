import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ILesson } from '../../model/lesson';
import { CoursesService } from './courses.service';
import { catchError, finalize } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';

@Injectable()
export class LessonsDataSource implements DataSource<ILesson> {
    private lessonsSubject = new BehaviorSubject<ILesson[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private coursesService: CoursesService, private _log: NGXLogger) {}

    loadLessons(courseId: number, pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);

        this.coursesService
            .findLessons(courseId, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(lessons => this.lessonsSubject.next(lessons));
    }

    connect(collectionViewer: CollectionViewer): Observable<ILesson[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }
}
