import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularUniversityComponent } from './angular-university/angular-university.component';

const routes: Routes = [
    {
        path: '',
        component: AngularUniversityComponent,
        // component: () => import('./angular-university.module').then(module => module.AngularUniversityBaseComponent),
        children: [
            {
                path: 'rxjs',
                loadChildren: () => import('./rxjs-reactive-programming/au-rxjs.module').then(mod => mod.AuRxjsModule),
            },
            {
                path: 'ngrx-in-depth',
                loadChildren: () => import('./ngrx-in-depth/ngrx-in-depth.module').then(mod => mod.NgrxInDepthModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AngularUniversityRoutingModule {}
