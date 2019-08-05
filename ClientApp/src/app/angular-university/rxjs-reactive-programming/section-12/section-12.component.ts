import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeModule, HomeComponent } from './home/home.component';
import { AllLessonsModule, AllLessonsComponent } from './all-lessons/all-lessons.component';
import { CourseDetailModule, CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesListModule } from './courses-list/courses-list.component';
import { LessonsListModule } from './lessons-list/lessons-list.component';
import { CourseDetailHeaderModule } from './course-detail-header/course-detail-header.component';
import { NewsletterModule } from './newsletter/newsletter.component';
import { LoginModule, LoginComponent } from './login/login.component';
import { CourseModule } from './course/course.component';
import { LessonDetailModule } from './lesson-detail/lesson-detail.component';
import { TopMenuModule } from './top-menu/top-menu.component';
import { MessagesModule } from './messages/messages.component';
import { LoadingModule } from './loading/loading.component';
import { DatastoreService } from './services/datastore.service';
import { MessagesService } from './services/messages.service';
import { CourseDetailResolver } from './course-detail/course-detail.resolver';
import { CreateLessonModule, CreateLessonComponent } from './create-lesson/create-lesson.component';

@Component({
    selector: 'ngs-section-12',
    template: `
        <div class="screen-container">
            <ngs-top-menu></ngs-top-menu>
            <ngs-loading></ngs-loading>
            <ngs-messages></ngs-messages>
            <br />
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./section-12.component.scss'],
})
export class Section12Component implements OnInit {
    constructor() {}

    ngOnInit() {}
}

const routes: Routes = [
    {
        path: '',
        component: Section12Component,
        children: [
            {
                path: 'course/:id',
                component: CourseDetailComponent,
                resolve: {
                    detail: CourseDetailResolver,
                },
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
                path: 'lesson/new',
                component: CreateLessonComponent,
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
export class Section12RoutingModule {}

@NgModule({
    declarations: [Section12Component],
    imports: [
        CommonModule,
        SharedModule,
        Section12RoutingModule,
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
        MessagesModule,
        LoadingModule,
        CreateLessonModule,
    ],
    exports: [Section12Component],
    providers: [DatastoreService, MessagesService, CourseDetailResolver],
})
export class Section12Module {}
