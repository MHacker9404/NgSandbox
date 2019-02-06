import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgRxBaseComponent } from './ng-rx-base.component';
import { OwnStoreComponent } from './own-store/own-store.component';

const routes: Routes = [
    {
        path: '',
        component: NgRxBaseComponent,
        children: [{ path: '01-own-store', component: OwnStoreComponent }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NgrxRoutingModule {}
