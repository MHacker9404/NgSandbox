import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseDetailComponent, CourseDetailModule } from './course-detail/course-detail.component';
import { LoginComponent } from './login/login.component';
import { CoursesListModule } from './courses-list/courses-list.component';
import { LessonsListModule } from './lessons-list/lessons-list.component';
import { CourseDetailHeaderModule } from './course-detail-header/course-detail-header.component';
import { NewsletterModule } from './newsletter/newsletter.component';
import { LoginModule } from '../section-7/login/login.component';
import { TopMenuModule } from './top-menu/top-menu.component';
import { DatastoreService } from './datastore.service';
import { NewsletterService } from './newsletter.service';
import { UserService } from './user.service';
import { Observable, Subject } from 'rxjs';
import { ICourse } from '../shared/model/icourse';
import { ILesson } from '../shared/model/ilesson';
import { takeUntil } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';

@Component({
    selector: 'ngs-section7',
    template: `
        <div class="screen-container">
            <ngs-top-menu></ngs-top-menu>
            <h2></h2>

            <ngs-courses-list [courses]="courses$ | async"></ngs-courses-list>

            <h2>Latest Lessons Published</h2>
            <ngs-lessons-list [lessons]="lessons$ | async"></ngs-lessons-list>
        </div>
    `,
    styleUrls: ['./section-7.component.scss'],
})
export class Section7Component implements OnInit, OnDestroy {
    courses$: Observable<ICourse[]>;
    lessons$: Observable<ILesson[]>;
    private _unsubscribe$ = new Subject<void>();

    constructor(private _dataStore: DatastoreService) {
        this.courses$ = _dataStore.courseList$.pipe(
            takeUntil(this._unsubscribe$),
            tag('section-7: courses')
        );
        this.lessons$ = _dataStore.lessonsList$.pipe(
            takeUntil(this._unsubscribe$),
            tag('section-7: lessons')
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
        component: Section7Component,
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
export class Section7RoutingModule {}

@NgModule({
    declarations: [Section7Component],
    imports: [
        CommonModule,
        SharedModule,
        Section7RoutingModule,
        CourseDetailModule,
        CoursesListModule,
        LessonsListModule,
        CourseDetailHeaderModule,
        NewsletterModule,
        LoginModule,
        TopMenuModule,
    ],
    exports: [Section7Component],
    providers: [DatastoreService, NewsletterService, UserService],
})
export class Section7Module {}
