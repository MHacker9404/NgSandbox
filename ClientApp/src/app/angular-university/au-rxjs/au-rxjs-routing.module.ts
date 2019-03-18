import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuRxjsComponent } from './au-rxjs.component';
import { BrowserEventsComponent } from './components/browser-events/browser-events.component';

const routes: Routes = [
    {
        path: '',
        component: AuRxjsComponent,
        children: [
            { path: 'browser-events', component: BrowserEventsComponent, pathMatch: 'full' },
            {
                path: 'custom-events',
                loadChildren: './components/custom-events/custom-events.component#CustomEventsModule',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuRxjsRoutingModule {}
