import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularUniversityBaseComponent } from './angular-university-base.component';

const routes: Routes = [
    {
        path: '',
        component: AngularUniversityBaseComponent,
        children: [
            {
                path: 'rxjs',
                loadChildren: './rxjs-reactive-programming/au-rxjs.module#AuRxjsModule',
            },
            {
                path: 'ngrx-in-depth',
                loadChildren: () =>
                    import('./ngrx-in-depth/ngrx-in-depth.component').then(mod => mod.NgrxInDepthModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AngularUniversityRoutingModule {}
