import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'angular-university',
    loadChildren:
      './angular-university/angular-university.module#AngularUniversityModule'
  },
  {
    path: 'breeze-js',
    loadChildren: './breeze-js/breeze-js.module#BreezeJSModule'
  },
  {
    path: 'caminte',
    loadChildren: './caminte/caminte.module#CaminteModule'
  },
  {
    path: 'loopback',
    loadChildren: './loopback/loopback.module#LoopbackModule'
  },
  {
    path: 'ng7-book',
    loadChildren: './ng7-book/ng7-book.module#Ng7BookModule'
  },
  {
    path: 'type-orm',
    loadChildren: './type-orm/type-orm.module#TypeORMModule'
  },
  {
    path: 'ultimate-angular',
    loadChildren:
      './ultimate-angular/ultimate-angular.module#UltimateAngularModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
