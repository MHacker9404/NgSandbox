import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { ICourse } from '../../shared/model/icourse';
import { ILesson } from '../../shared/model/ilesson';
import { takeUntil } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';
import { DatastoreService } from '../datastore.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesListModule } from '../courses-list/courses-list.component';
import { LessonsListModule } from '../lessons-list/lessons-list.component';

@Component({
    selector: 'ngs-home',
    template: `
        <h2></h2>

        <ngs-courses-list [courses]="courses$ | async"></ngs-courses-list>

        <h2>Latest Lessons Published</h2>
        <ngs-lessons-list [lessons]="lessons$ | async"></ngs-lessons-list>
    `,
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    courses$: Observable<ICourse[]>;
    lessons$: Observable<ILesson[]>;
    private _unsubscribe$ = new Subject<void>();

    constructor(private _dataStore: DatastoreService) {
        this.courses$ = _dataStore.courseList$.pipe(
            takeUntil(this._unsubscribe$),
            tag('home: courses')
        );
        this.lessons$ = _dataStore.lessonsList$.pipe(
            takeUntil(this._unsubscribe$),
            tag('home: lessons')
        );
    }

    ngOnInit() {}

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, SharedModule, CoursesListModule, LessonsListModule],
    exports: [HomeComponent],
})
export class HomeModule {}
