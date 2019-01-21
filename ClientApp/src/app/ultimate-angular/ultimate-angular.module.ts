import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ExampleDef } from '../shared/Models/example.model';

import { UltimateAngularRoutingModule } from './ultimate-angular-routing.module';
import { UltimateAngularBaseComponent } from './ultimate-angular-base/ultimate-angular-base.component';

const examples: ExampleDef[] = [
    {
        label: '01 - Pro',
        name: 'UltimateAngularPro',
        path: 'pro',
        component: null
    }
];

@NgModule({
    declarations: [UltimateAngularBaseComponent],
    imports: [CommonModule, SharedModule, UltimateAngularRoutingModule],
    providers: [{ provide: 'UltimateAngular', useValue: examples }]
})
export class UltimateAngularModule {}
