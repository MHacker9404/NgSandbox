import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'ngs-section7',
    template: `
        <div class="screen-container">
            <!--
            <ngs-top-menu></ngs-top-menu>
            <h2></h2>

            <ngs-courses-list [courses]="courses$ | async"></ngs-courses-list>

            <ngs-lessons-list [lessons]="lessons$ | async"></ngs-lessons-list>
            -->
        </div>
    `,
    styleUrls: ['./section-7.component.scss'],
})
export class Section7Component implements OnInit {
    constructor() {}

    ngOnInit() {}
}

const routes: Routes = [
    {
        path: '',
        component: Section7Component,
        pathMatch: 'full',
        children: [],
    },
    // {
    //     path: 'course/:id',
    //     component: CourseDetailComponent,
    // },
    // {
    //     path: 'login',
    //     component: LoginComponent,
    // },
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
    imports: [CommonModule, SharedModule, Section7RoutingModule],
    exports: [Section7Component],
})
export class Section7Module {}
