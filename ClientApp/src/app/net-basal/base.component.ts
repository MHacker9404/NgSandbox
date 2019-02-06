import { Component, OnInit, Inject } from '@angular/core';
import { ExampleDef } from '../shared/Models/example.model';

@Component({
    selector: 'ngs-base',
    template: `
        <div class="row">
            <div class="col text-center"><h2>Net Basal examples</h2></div>
        </div>
        <div class="row">
            <div class="col-2"><ngs-sidebar [items]="examples"></ngs-sidebar></div>
            <div class="col-10">
                <div class="app">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
    constructor(@Inject('net-basal') public examples: ExampleDef[]) {}

    ngOnInit() {}
}
