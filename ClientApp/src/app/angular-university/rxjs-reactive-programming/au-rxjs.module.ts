//    https://www.udemy.com/rxjs-reactive-angular-course

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuRxjsRoutingModule } from './au-rxjs-routing.module';
import { AuRxjsComponent } from './au-rxjs.component';
import { ExampleDef } from 'src/app/shared/Models/example.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserEventsComponent } from './components/browser-events/browser-events.component';

const examples: ExampleDef[] = [
    {
        label: '01 - Browser Events',
        name: 'BrowserEvents',
        path: 'browser-events',
        component: null,
    },
    {
        label: '02 - Custom Events',
        name: 'CustomEvents',
        path: 'custom-events',
        component: null,
    },
    {
        label: '03 - Observable Pattern',
        name: 'ObservablePattern',
        path: 'observable-pattern',
        component: null,
    },
    {
        label: '04 - With RxJS',
        name: 'WithRxJS',
        path: 'with-rxjs',
        component: null,
    },
    {
        label: '05 - Stateless Observable Services',
        name: 'Section4',
        path: 'section-4',
        component: null,
    },
    {
        label: '06 - Smart vs Presentational Components',
        name: 'Section5',
        path: 'section-5',
        component: null,
    },
    {
        label: 'Section 6 - Observable Data Services',
        name: 'Section6',
        path: 'section-6',
        component: null,
    },
    {
        label: 'Section 7 - Deeply Nested Smart Components',
        name: 'Section7',
        path: 'section-7',
        component: null,
    },
    {
        label: 'Section 8 - Data Table Pagination Service',
        name: 'Section8',
        path: 'section-8',
        component: null,
    },
    {
        label: 'Section 9 - Master Detail Design Pattern',
        name: 'Section9',
        path: 'section-9',
        component: null,
    },
    {
        label: 'Section 10 - Error Handling',
        name: 'Section10',
        path: 'section-10',
        component: null,
    },
    {
        label: 'Section 11 - Router Data',
        name: 'Section11',
        path: 'section-11',
        component: null,
    },
];
@NgModule({
    declarations: [AuRxjsComponent, BrowserEventsComponent],
    imports: [CommonModule, SharedModule, AuRxjsRoutingModule],
    providers: [{ provide: 'rxjs', useValue: examples }],
})
export class AuRxjsModule {}
