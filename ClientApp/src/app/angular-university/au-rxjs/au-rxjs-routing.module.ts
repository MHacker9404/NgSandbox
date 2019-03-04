import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuRxjsComponent } from './au-rxjs.component';

const routes: Routes = [
    {
        path: '',
        component: AuRxjsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuRxjsRoutingModule {}
