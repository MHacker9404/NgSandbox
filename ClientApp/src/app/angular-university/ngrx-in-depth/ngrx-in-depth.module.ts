import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxInDepthComponent } from './ngrx-in-depth/ngrx-in-depth.component';
import { NgrxInDepthRoutingModule } from './ngrx-in-depth-routing.module';

@NgModule({
    declarations: [NgrxInDepthComponent],
    imports: [CommonModule, NgrxInDepthRoutingModule],
    exports: [NgrxInDepthComponent],
})
export class NgrxInDepthModule {}
