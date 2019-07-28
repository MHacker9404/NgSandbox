import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { Observable, Subject } from 'rxjs';
import { ICourse } from '../shared/model/icourse';
import { ILesson } from '../shared/model/ilesson';
import { DatastoreService } from './datastore.service';
import { takeUntil } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';
import { CourseDetailModule, CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesListModule } from './courses-list/courses-list.component';
import { LessonsListModule } from './lessons-list/lessons-list.component';
import { CourseDetailHeaderModule } from './course-detail-header/course-detail-header.component';
import { NewsletterModule } from './newsletter/newsletter.component';
import { LoginModule, LoginComponent } from './login/login.component';
import { TopMenuModule } from './top-menu/top-menu.component';
import { CourseModule } from './course/course.component';

@Component({
    selector: 'ngs-au-section8',
    template: `
        <div class="screen-container">
            <ngs-top-menu></ngs-top-menu>
            <h2></h2>

            <ngs-courses-list [courses]="courses$ | async"></ngs-courses-list>

            <h2>Latest Lessons Published</h2>
            <ngs-lessons-list [lessons]="lessons$ | async"></ngs-lessons-list>
        </div>
    `,
    styleUrls: ['./section-8.component.scss'],
})
export class Section8Component implements OnInit, OnDestroy {
    courses$: Observable<ICourse[]>;
    lessons$: Observable<ILesson[]>;
    private _unsubscribe$ = new Subject<void>();

    constructor(private _dataStore: DatastoreService) {
        this.courses$ = _dataStore.courseList$.pipe(
            takeUntil(this._unsubscribe$),
            tag('section-8: courses')
        );
        this.lessons$ = _dataStore.lessonsList$.pipe(
            takeUntil(this._unsubscribe$),
            tag('section-8: lessons')
        );
    }

    ngOnInit() {}

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}

const routes: Routes = [
    {
        path: '',
        component: Section8Component,
        pathMatch: 'full',
        children: [],
    },
    {
        path: 'course/:id',
        component: CourseDetailComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Section8RoutingModule {}

@NgModule({
    declarations: [Section8Component],
    imports: [
        CommonModule,
        SharedModule,
        Section8RoutingModule,
        CourseDetailModule,
        CoursesListModule,
        LessonsListModule,
        CourseDetailHeaderModule,
        NewsletterModule,
        LoginModule,
        TopMenuModule,
        CourseModule
    ],
    exports: [Section8Component],
})
export class Section8Module {}
