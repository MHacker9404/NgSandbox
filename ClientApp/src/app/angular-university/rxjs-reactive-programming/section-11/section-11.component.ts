import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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
import { TopMenuModule } from './top-menu/top-menu.component';
import { MessagesModule } from './messages/messages.component';
import { LessonDetailModule } from './lesson-detail/lesson-detail.component';
import { MessagesService } from './services/messages.service';
import { DatastoreService } from './services/datastore.service';
import { CourseDetailResolver } from './course-detail/course-detail.resolver';
import { LoadingModule } from './loading/loading.component';

@Component({
    selector: 'ngs-section-11',
    template: `
        <div class="screen-container">
            <ngs-top-menu></ngs-top-menu>
            <ngs-loading></ngs-loading>
            <ngs-messages></ngs-messages>
            <br />
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./section-11.component.scss'],
})
export class Section11Component implements OnInit {
    constructor() {}

    ngOnInit() {}
}

const routes: Routes = [
    {
        path: '',
        component: Section11Component,
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
export class Section11RoutingModule {}

@NgModule({
    declarations: [Section11Component],
    imports: [
        CommonModule,
        SharedModule,
        Section11RoutingModule,
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
    ],
    exports: [Section11Component],
    providers: [DatastoreService, MessagesService, CourseDetailResolver],
})
export class Section11Module {}
