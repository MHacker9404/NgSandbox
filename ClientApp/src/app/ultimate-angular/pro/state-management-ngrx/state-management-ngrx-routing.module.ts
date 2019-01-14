import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateManagementRootComponent } from './state-management-root/state-management-root.component';

const routes: Routes = [
    {
        path: '',
        component: StateManagementRootComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StateManagementNgrxRoutingModule {}
