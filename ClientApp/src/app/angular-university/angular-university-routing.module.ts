import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularUniversityBaseComponent } from './angular-university-base.component';

const routes: Routes = [
    {
        path: '',
        component: AngularUniversityBaseComponent,
        children: [{ path: 'rxjs', loadChildren: './au-rxjs/au-rxjs.module#AuRxjsModule' }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AngularUniversityRoutingModule {}
