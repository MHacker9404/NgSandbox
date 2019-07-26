import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'ngs-au-section8',
    template: `
        <p>
            section-8 works!
        </p>
    `,
    styleUrls: ['./section-8.component.scss'],
})
export class Section8Component implements OnInit {
    constructor() {}

    ngOnInit() {}
}

const routes: Routes = [
    {
        path: '',
        component: Section8Component,
        pathMatch: 'full',
        children: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Section8RoutingModule {}

@NgModule({
    declarations: [Section8Component],
    imports: [CommonModule, SharedModule, Section8RoutingModule],
    exports: [Section8Component],
})
export class Section8Module {}
