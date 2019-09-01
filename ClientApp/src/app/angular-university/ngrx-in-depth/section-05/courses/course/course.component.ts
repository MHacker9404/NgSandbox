import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CoursesService } from '../services/courses.service';
import { debounceTime, distinctUntilChanged, startWith, tap, delay, takeUntil } from 'rxjs/operators';
import { merge, fromEvent, Subject } from 'rxjs';
import { LessonsDataSource } from '../services/lessons.datasource';
import { NGXLogger } from 'ngx-logger';
import { tag } from 'rxjs-spy/operators/tag';
import { ICourse } from '../../model/course';

@Component({
    selector: 'course',
    template: `
        <div class="course">
            <h2>{{ course?.description }}</h2>

            <img class="course-thumbnail" [src]="course?.iconUrl" />

            <div class="spinner-container" *ngIf="_dataSource.loading$ | async">
                <mat-spinner></mat-spinner>
            </div>

            <div class="mat-elevation-z8">
                <mat-table class="lessons-table" [dataSource]="_dataSource">
                    <ng-container matColumnDef="seqNo">
                        <mat-header-cell *matHeaderCellDef>#</mat-header-cell>

                        <mat-cell *matCellDef="let lesson">{{ lesson.seqNo }}</mat-cell>
                    </ng-container>

                    <ng-container matColumnDef="description">
                        <mat-header-cell *matHeaderCellDef>Description</mat-header-cell>

                        <mat-cell class="description-cell" *matCellDef="let lesson">{{ lesson.description }} </mat-cell>
                    </ng-container>

                    <ng-container matColumnDef="duration">
                        <mat-header-cell *matHeaderCellDef>Duration</mat-header-cell>

                        <mat-cell class="duration-cell" *matCellDef="let lesson">{{ lesson.duration }} </mat-cell>
                    </ng-container>

                    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>

                    <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
                </mat-table>

                <mat-paginator [length]="course?.lessonsCount" [pageSize]="3"></mat-paginator>
            </div>
        </div>
    `,
    styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, AfterViewInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    course: ICourse;

    displayedColumns = ['seqNo', 'description', 'duration'];

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(
        private route: ActivatedRoute,
        private coursesService: CoursesService,
        private _log: NGXLogger,
        public _dataSource: LessonsDataSource
    ) {}

    ngOnInit() {
        this.course = this.route.snapshot.data['course'];

        // this.dataSource = new LessonsDataSource(this.coursesService);

        this._dataSource.loadLessons(this.course.id, 0, 3);
    }

    ngAfterViewInit() {
        this.paginator.page
            .pipe(
                takeUntil(this._unsubscribe$),
                tap(() => this.loadLessonsPage(), tag('CourseComponent: paginator.page'))
            )
            .subscribe();
    }

    loadLessonsPage() {
        this._dataSource.loadLessons(this.course.id, this.paginator.pageIndex, this.paginator.pageSize);
    }

    ngOnDestroy(): void {
        this._log.trace('LessonsPager: OnDestroy');

        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
