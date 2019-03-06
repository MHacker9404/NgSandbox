import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuRxjsRoutingModule } from './au-rxjs-routing.module';
import { AuRxjsComponent } from './au-rxjs.component';
import { ExampleDef } from 'src/app/shared/Models/example.model';
import { SharedModule } from 'src/app/shared/shared.module';

const examples: ExampleDef[] = [
    {
        label: '01 - TBD',
        name: 'label',
        path: 'path',
        component: null,
    },
];
@NgModule({
    declarations: [AuRxjsComponent],
    imports: [CommonModule, SharedModule, AuRxjsRoutingModule],
    providers: [{ provide: 'rxjs', useValue: examples }],
})
export class AuRxjsModule {}
