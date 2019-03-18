import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base.component';

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        children: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NetBasalRoutingModule {}