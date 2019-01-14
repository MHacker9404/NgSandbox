import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProBaseComponent } from './pro-base/pro-base.component';

const routes: Routes = [
  {
    path: '',
    component: ProBaseComponent,
    children: [
      {
        path: 'state-management-ngrx',
        loadChildren:
          './state-management-ngrx/state-management-ngrx.module#StateManagementNgrxModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProRoutingModule {}
