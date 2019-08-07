import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'ngs-ngrx-in-depth',
    template: `
        <div class="ngrx-in-depth">
            <router-outlet></router-outlet>
        </div>
    `,
})
export class NgrxInDepthComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

const routes: Routes = [
    {
        path: '',
        component: NgrxInDepthComponent,
        children: [
            // {
            //     path: 'ngrx-in-depth',
            //     loadChildren: () =>
            //         import('./ngrx-in-depth/ngrx-in-depth.component').then(mod => mod.NgrxInDepthModule),
            // },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NgrxInDepthRoutingModule {}

@NgModule({
    declarations: [NgrxInDepthComponent],
    imports: [CommonModule, SharedModule, NgrxInDepthRoutingModule],
    exports: [NgrxInDepthComponent],
})
export class NgrxInDepthModule {}
