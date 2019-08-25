import { Routes, RouterModule } from '@angular/router';
import { NgrxInDepthComponent } from './ngrx-in-depth/ngrx-in-depth.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: NgrxInDepthComponent,
        children: [
            {
                path: 'section-01',
                loadChildren: () => import('./section-01/section-01.component').then(mod => mod.Section01Module),
            },
            {
                path: 'section-02',
                loadChildren: () => import('./section-02/section-02.component').then(mod => mod.Section02Module),
            },
            {
                path: 'section-03',
                loadChildren: () => import('./section-03/section-03.component').then(mod => mod.Section03Module),
            },
            {
                path: 'section-04',
                loadChildren: () => import('./section-04/section-04.component').then(mod => mod.Section04Module),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NgrxInDepthRoutingModule {}
