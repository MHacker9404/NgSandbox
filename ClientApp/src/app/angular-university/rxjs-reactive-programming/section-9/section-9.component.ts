import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'ngs-section-9',
    template: `
        <p>
            section-9 works!
        </p>
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
            // {
            //     path: 'course/:id',
            //     component: CourseDetailComponent,
            // },
            // {
            //     path: 'login',
            //     component: LoginComponent,
            // },
            // {
            //     path: 'all-lessons',
            //     component: AllLessonsComponent,
            // },
            // {
            //     path: 'home',
            //     component: HomeComponent,
            // },
            // {
            //     path: '',
            //     redirectTo: 'home',
            // },
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
    imports: [CommonModule, SharedModule, Section9RoutingModule],
    exports: [Section9Component],
})
export class Section9Module {}
