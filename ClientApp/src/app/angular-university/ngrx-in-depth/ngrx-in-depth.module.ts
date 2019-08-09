import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxInDepthComponent } from './ngrx-in-depth/ngrx-in-depth.component';
import { NgrxInDepthRoutingModule } from './ngrx-in-depth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleDef } from 'src/app/shared/Models/example.model';

const examples: ExampleDef[] = [
    {
        label: '01 - Intro',
        name: 'Intro',
        path: 'intro',
        component: null,
    },
];

@NgModule({
    declarations: [NgrxInDepthComponent],
    imports: [CommonModule, SharedModule, NgrxInDepthRoutingModule],
    exports: [NgrxInDepthComponent],
})
export class NgrxInDepthModule {}
