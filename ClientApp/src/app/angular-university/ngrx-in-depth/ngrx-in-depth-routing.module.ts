import { Routes, RouterModule } from '@angular/router';
import { NgrxInDepthComponent } from './ngrx-in-depth/ngrx-in-depth.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: NgrxInDepthComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NgrxInDepthRoutingModule {}
