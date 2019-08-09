import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'ngs-section-01',
    template: `
        <p>
            section-01 works!
        </p>
    `,
    styleUrls: ['./section-01.component.scss'],
})
export class Section01Component implements OnInit {
    constructor() {}

    ngOnInit() {}
}

const routes: Routes = [
    {
        path: '',
        component: Section01Component,
        children: [
            // {
            //     path: 'course/:id',
            //     component: CourseDetailComponent,
            //     resolve: {
            //         detail: CourseDetailResolver,
            //     },
            // },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Section01RoutingModule {}

@NgModule({
    declarations: [Section01Component],
    imports: [CommonModule, SharedModule, Section01RoutingModule],
    exports: [Section01Component],
})
export class Section01Module {}
