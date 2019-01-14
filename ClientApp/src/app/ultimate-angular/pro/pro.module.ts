import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProRoutingModule } from './pro-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProBaseComponent } from './pro-base/pro-base.component';
import { ExampleDef } from 'src/app/shared/Models/example.model';

const examples: ExampleDef[] = [
  {
    label: '07 - StateManagement/Ngrx',
    name: 'StateMangementNgrx',
    path: 'state-management-ngrx',
    component: null
  }
];

@NgModule({
  declarations: [ProBaseComponent],
  imports: [CommonModule, SharedModule, ProRoutingModule],
  providers: [{ provide: 'pro', useValue: examples }]
})
export class ProModule {}
