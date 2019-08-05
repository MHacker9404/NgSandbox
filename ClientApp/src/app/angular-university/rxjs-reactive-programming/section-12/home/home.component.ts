import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { ICourse } from '../../shared/model/icourse';
import { ILesson } from '../../shared/model/ilesson';
import { takeUntil, tap } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';
import { DatastoreService } from '../services/datastore.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesListModule } from '../courses-list/courses-list.component';
import { LessonsListModule } from '../lessons-list/lessons-list.component';
import { NGXLogger } from 'ngx-logger';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'ngs-home',
    template: `
        <div class="row">
            <div class="col">
                <h2>Reactive Forms</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <!--<a class="btn btn-primary" (click)="navigateToCreateLesson()">Create Lesson</a>-->
                <ul class="nav nav-pills justify-content-center">
                    <li class="nav-item">
                        <!--<a class="nav-link" routerLink="../lesson/new" routerLinkActive="menu-active">Create Lesson</a>-->
                        <button class="btn btn-primary" routerLink="../lesson/new">Create Lesson</button>
                    </li>
                </ul>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <ngs-courses-list [courses]="(courses$ | async)?.courses"></ngs-courses-list>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <h2>Latest Lessons Published</h2>
                <ngs-lessons-list [lessons]="lessons$ | async"></ngs-lessons-list>
            </div>
        </div>
    `,
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    courses$: Observable<ICourse[]>;
    lessons$: Observable<ILesson[]>;
    private _unsubscribe$ = new Subject<void>();

    constructor(private _dataStore: DatastoreService, private _log: NGXLogger) {
        this.courses$ = _dataStore.getCourses().pipe(
            takeUntil(this._unsubscribe$),
            tag('home: courses')
        );
        this.lessons$ = _dataStore.getLessons().pipe(
            takeUntil(this._unsubscribe$),
            tag('home: lessons')
        );
    }

    ngOnInit() {}

    navigateToCreateLesson() {}

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, RouterModule, SharedModule, CoursesListModule, LessonsListModule],
    exports: [HomeComponent],
})
export class HomeModule {}
