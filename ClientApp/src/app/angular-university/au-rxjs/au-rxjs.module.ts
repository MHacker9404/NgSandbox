import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuRxjsRoutingModule } from './au-rxjs-routing.module';
import { AuRxjsComponent } from './au-rxjs.component';
import { ExampleDef } from 'src/app/shared/Models/example.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserEventsComponent } from './components/browser-events/browser-events.component';

const examples: ExampleDef[] = [
    { label: '01 - Browser Events', name: 'BrowserEvents', path: 'browser-events', component: null },
    { label: '02 - Custom Events', name: 'CustomEvents', path: 'custom-events', component: null },
    { label: '03 - Observable Pattern', name: 'ObservablePattern', path: 'observable-pattern', component: null },
    { label: '04 - With RxJS', name: 'WithRxJS', path: 'with-rxjs', component: null },
];
@NgModule({
    declarations: [AuRxjsComponent, BrowserEventsComponent],
    imports: [CommonModule, SharedModule, AuRxjsRoutingModule],
    providers: [{ provide: 'rxjs', useValue: examples }],
})
export class AuRxjsModule {}
