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
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state';
import { PageQuery } from '../state/actions';

@Component({
    selector: 'course',
    template: `
        <div class="course">
            <h2>{{ course?.description }}</h2>

            <img class="course-thumbnail" [src]="course?.iconUrl" />

            <div class="spinner-container" *ngIf="dataSource.loading$ | async">
                <mat-spinner></mat-spinner>
            </div>

            <div class="mat-elevation-z8">
                <mat-table class="lessons-table" [dataSource]="dataSource">
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
    course: ICourse;
    displayedColumns = ['seqNo', 'description', 'duration'];

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(
        public dataSource: LessonsDataSource,
        private route: ActivatedRoute,
        private _state$: Store<AppState>,
        private _log: NGXLogger
    ) {}

    ngOnInit() {
        this.course = this.route.snapshot.data['course'];

        const initialPage: PageQuery = {
            pageIndex: 0,
            pageSize: 3,
        };

        this.dataSource.loadLessons(this.course.id, initialPage);
    }

    ngAfterViewInit() {}

    loadLessonsPage() {}

    ngOnDestroy(): void {
        this._log.trace('LessonsPager: OnDestroy');
    }
}
