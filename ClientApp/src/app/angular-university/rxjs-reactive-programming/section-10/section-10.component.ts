import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeModule, HomeComponent } from './home/home.component';
import { CourseDetailModule, CourseDetailComponent } from './course-detail/course-detail.component';
import { AllLessonsModule, AllLessonsComponent } from './all-lessons/all-lessons.component';
import { CoursesListModule } from './courses-list/courses-list.component';
import { LessonsListModule } from './lessons-list/lessons-list.component';
import { CourseDetailHeaderModule } from './course-detail-header/course-detail-header.component';
import { NewsletterModule } from './newsletter/newsletter.component';
import { LoginModule, LoginComponent } from './login/login.component';
import { CourseModule } from './course/course.component';
import { TopMenuModule } from './top-menu/top-menu.component';
import { LessonDetailModule } from './lesson-detail/lesson-detail.component';
import { DatastoreService } from './datastore.service';

@Component({
    selector: 'ngs-section-10',
    template: `
        <div class="screen-container">
            <ngs-top-menu></ngs-top-menu>
            <br />
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./section-10.component.scss'],
})
export class Section10Component implements OnInit {
    constructor() {}

    ngOnInit() {}
}

const routes: Routes = [
    {
        path: '',
        component: Section10Component,
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
export class Section10RoutingModule {}

@NgModule({
    declarations: [Section10Component],
    imports: [
        CommonModule,
        SharedModule,
        Section10RoutingModule,
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
    exports: [Section10Component],
    providers: [DatastoreService],
})
export class Section10Module {}
