import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DatastoreService } from './datastore.service';
import { CourseDetailModule, CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesListModule } from './courses-list/courses-list.component';
import { LessonsListModule } from './lessons-list/lessons-list.component';
import { CourseDetailHeaderModule } from './course-detail-header/course-detail-header.component';
import { NewsletterModule } from './newsletter/newsletter.component';
import { LoginModule, LoginComponent } from './login/login.component';
import { TopMenuModule } from './top-menu/top-menu.component';
import { CourseModule } from './course/course.component';
import { HomeComponent, HomeModule } from './home/home.component';
import { AllLessonsModule, AllLessonsComponent } from './all-lessons/all-lessons.component';

@Component({
    selector: 'ngs-au-section8',
    template: `
        <div class="screen-container">
            <ngs-top-menu></ngs-top-menu>
            <br />
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./section-8.component.scss'],
})
export class Section8Component implements OnInit, OnDestroy {
    constructor() {}

    ngOnInit() {}

    ngOnDestroy(): void {}
}

const routes: Routes = [
    {
        path: '',
        component: Section8Component,
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
export class Section8RoutingModule {}

@NgModule({
    declarations: [Section8Component],
    imports: [
        CommonModule,
        SharedModule,
        Section8RoutingModule,
        HomeModule,
        AllLessonsModule,
        CourseDetailModule,
        CoursesListModule,
        LessonsListModule,
        CourseDetailHeaderModule,
        NewsletterModule,
        LoginModule,
        TopMenuModule,
        CourseModule,
    ],
    exports: [Section8Component],
    providers: [DatastoreService],
})
export class Section8Module {}
