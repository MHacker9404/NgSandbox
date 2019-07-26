import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuRxjsComponent } from './au-rxjs.component';
import { BrowserEventsComponent } from './components/browser-events/browser-events.component';

const routes: Routes = [
    {
        path: '',
        component: AuRxjsComponent,
        children: [
            {
                path: 'browser-events',
                component: BrowserEventsComponent,
                pathMatch: 'full',
            },
            {
                path: 'custom-events',
                loadChildren: './components/custom-events/custom-events.component#CustomEventsModule',
            },
            {
                path: 'observable-pattern',
                loadChildren: './observable-pattern/observable-pattern.component#ObservablePatternModule',
            },
            {
                path: 'with-rxjs',
                loadChildren: './with-rxjs/with-rxjs.component#WithRxJsModule',
            },
            {
                path: 'section-4',
                loadChildren: () => import('./section-4/section4.component').then(mod => mod.Section4Module),
            },
            {
                path: 'section-5',
                loadChildren: () => import('./section-5/section-5.component').then(mod => mod.Section5Module),
            },
            {
                path: 'section-6',
                loadChildren: () => import('./section-6/section-6.component').then(mod => mod.Section6Module),
            },
            {
                path: 'section-7',
                loadChildren: () => import('./section-7/section-7.component').then(mod => mod.Section7Module),
            },
            {
                path: 'section-8',
                loadChildren: () => import('./section-8/section-8.component').then(mod => mod.Section8Module),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuRxjsRoutingModule {}
