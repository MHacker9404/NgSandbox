import { NgModule, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleDef } from '../shared/Models/example.model';
import { SharedModule } from '../shared/shared.module';
import { AngularUniversityRoutingModule } from './angular-university-routing.module';
import { AngularUniversityComponent } from './angular-university/angular-university.component';

const examples: ExampleDef[] = [
    {
        label: '01 - RxJs Reactive Programming',
        name: 'RxjsReactiveProgramming',
        path: 'rxjs',
        component: null,
    },
    {
        label: '02 - NgRx in Depth',
        name: 'NgrxInDepth',
        path: 'ngrx-in-depth',
        component: null,
    },
];

@NgModule({
    declarations: [AngularUniversityComponent],
    imports: [CommonModule, SharedModule, AngularUniversityRoutingModule],
    providers: [{ provide: 'a-u', useValue: examples }],
})
export class AngularUniversityModule {}
