import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'ngs-custom-events',
    template: `
        <p>
            custom-events works!
        </p>
    `,
    styleUrls: ['./custom-events.component.scss'],
})
export class CustomEventsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

const routes: Routes = [{ path: '', component: CustomEventsComponent, pathMatch: 'full' }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomEventsRoutingModule {}

@NgModule({
    declarations: [CustomEventsComponent],
    imports: [CommonModule, SharedModule, CustomEventsRoutingModule],
})
export class CustomEventsModule {}
