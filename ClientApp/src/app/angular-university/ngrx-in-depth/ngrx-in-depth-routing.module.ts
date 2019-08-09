import { Routes, RouterModule } from '@angular/router';
import { NgrxInDepthComponent } from './ngrx-in-depth/ngrx-in-depth.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: NgrxInDepthComponent,
        children: [
            {
                path: 'intro',
                loadChildren: () => import('./section-01/section-01.component').then(mod => mod.Section01Module),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NgrxInDepthRoutingModule {}
