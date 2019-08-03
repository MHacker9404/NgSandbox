import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TopMenuModule } from './top-menu/top-menu.component';
import { HomeModule, HomeComponent } from './home/home.component';
import { AllLessonsModule, AllLessonsComponent } from './all-lessons/all-lessons.component';
import { CourseDetailModule } from './course-detail/course-detail.component';
import { CoursesListModule } from './courses-list/courses-list.component';
import { LessonsListModule } from '../with-rxjs/lessons-list/lessons-list.component';
import { CourseDetailHeaderModule } from './course-detail-header/course-detail-header.component';
import { NewsletterModule } from './newsletter/newsletter.component';
import { LoginModule } from './login/login.component';
import { CourseModule } from './course/course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { LoginComponent } from './login/login.component';
import { DatastoreService } from './datastore.service';
import { LessonDetailModule } from './lesson-detail/lesson-detail.component';
import { MessagesModule } from '../section-10/messages/messages.component';
import { MessagesService } from '../section-10/messages.service';

@Component({
    selector: 'ngs-section-9',
    template: `
        <div class="screen-container">
            <ngs-top-menu></ngs-top-menu>
            <br />
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./section-9.component.scss'],
})
export class Section9Component implements OnInit {
    constructor() {}

    ngOnInit() {}
}

const routes: Routes = [
    {
        path: '',
        component: Section9Component,
        children: [
            {
                path: 'course/:id',
                component: CourseDetailComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'all-lessons',
                component: AllLessonsComponent,
            },
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: '',
                redirectTo: 'home',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Section9RoutingModule {}

@NgModule({
    declarations: [Section9Component],
    imports: [
        CommonModule,
        SharedModule,
        Section9RoutingModule,
        HomeModule,
        AllLessonsModule,
        CourseDetailModule,
        CoursesListModule,
        LessonsListModule,
        CourseDetailHeaderModule,
        NewsletterModule,
        LoginModule,
        CourseModule,
        TopMenuModule,
        LessonDetailModule,
    ],
    exports: [Section9Component],
    providers: [DatastoreService],
})
export class Section9Module {}
