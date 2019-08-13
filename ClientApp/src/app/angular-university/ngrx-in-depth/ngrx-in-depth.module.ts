import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgrxInDepthComponent } from './ngrx-in-depth/ngrx-in-depth.component';
import { NgrxInDepthRoutingModule } from './ngrx-in-depth-routing.module';
import { ExampleDef } from 'src/app/shared/Models/example.model';
import { environment } from 'src/environments/environment';

const examples: ExampleDef[] = [
    {
        label: '01 - Intro',
        name: 'Intro',
        path: 'section-01',
        component: null,
    },
    {
        label: '02 - NgRx Store in Detail',
        name: 'NgRxStore',
        path: 'section-02',
        component: null,
    },
];

@NgModule({
    declarations: [NgrxInDepthComponent],
    imports: [CommonModule, SharedModule, NgrxInDepthRoutingModule, HttpClientModule],
    // exports: [NgrxInDepthComponent],
    providers: [{ provide: 'ngrx-in-depth', useValue: examples }],
})
export class NgrxInDepthModule {}
