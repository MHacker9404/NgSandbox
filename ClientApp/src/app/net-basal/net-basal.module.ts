import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetBasalRoutingModule } from './net-basal-routing.module';
import { BaseComponent } from './base.component';
import { ExampleDef } from '../shared/Models/example.model';
import { SharedModule } from '../shared/shared.module';

const examples: ExampleDef[] = [
    {
        label: '01 - Own Store',
        name: 'own-store',
        path: '01-own-store',
        component: null,
    },
];

@NgModule({
    declarations: [BaseComponent],
    imports: [CommonModule, SharedModule, NetBasalRoutingModule],
    providers: [{ provide: 'net-basal', useValue: examples }],
})
export class NetBasalModule {}
