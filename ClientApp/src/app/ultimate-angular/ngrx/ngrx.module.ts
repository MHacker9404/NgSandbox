import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgrxRoutingModule } from './ngrx-routing.module';
import { NgRxBaseComponent } from './ng-rx-base.component';
import { ExampleDef } from 'src/app/shared/Models/example.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwnStoreComponent } from './own-store/own-store.component';

const examples: ExampleDef[] = [
    {
        label: '01 - Own Store',
        name: 'own-store',
        path: '01-own-store',
        component: null
    }
];

@NgModule({
    declarations: [NgRxBaseComponent, OwnStoreComponent],
    imports: [CommonModule, SharedModule, NgrxRoutingModule],
    providers: [{ provide: 'ngrx', useValue: examples }]
})
export class NgrxModule {}
