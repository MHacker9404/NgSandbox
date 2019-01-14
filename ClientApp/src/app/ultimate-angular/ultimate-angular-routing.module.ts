import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UltimateAngularBaseComponent } from './ultimate-angular-base/ultimate-angular-base.component';

const routes: Routes = [
  {
    path: '',
    component: UltimateAngularBaseComponent,
    children: [
      { path: 'pro', loadChildren: './pro/pro.module#ProModule' },
      { path: 'ngrx', loadChildren: './ngrx/ngrx.module#NgrxModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UltimateAngularRoutingModule {}
