import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

const routes: Routes = [
    {
        path: 'angular-university',
        loadChildren: './angular-university/angular-university.module#AngularUniversityModule',
    },
    {
        path: 'ng7-book',
        loadChildren: './ng7-book/ng7-book.module#Ng7BookModule',
    },
    {
        path: 'type-orm',
        loadChildren: './type-orm/type-orm.module#TypeORMModule',
    },
    {
        path: 'ultimate-angular',
        loadChildren: './ultimate-angular/ultimate-angular.module#UltimateAngularModule',
    },
    {
        path: 'net-basal',
        loadChildren: './net-basal/net-basal.module#NetBasalModule',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: environment.enableRouteTracing })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
