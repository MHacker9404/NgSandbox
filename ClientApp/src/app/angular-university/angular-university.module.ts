import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularUniversityRoutingModule } from './angular-university-routing.module';
import { AngularUniversityBaseComponent } from './angular-university-base.component';
import { ExampleDef } from '../shared/Models/example.model';
import { SharedModule } from '../shared/shared.module';

const examples: ExampleDef[] = [
    {
        label: '01 - RxJS',
        name: 'AngularUniversityRxJS',
        path: 'rxjs',
        component: null,
    },
];

@NgModule({
    declarations: [AngularUniversityBaseComponent],
    imports: [CommonModule, SharedModule, AngularUniversityRoutingModule],
    providers: [{ provide: 'AngularUniversity', useValue: examples }],
})
export class AngularUniversityModule {}
