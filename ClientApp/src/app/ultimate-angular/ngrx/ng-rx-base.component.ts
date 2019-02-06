import { Component, OnInit, Inject } from '@angular/core';
import { ExampleDef } from 'src/app/shared/Models/example.model';

@Component({
    selector: 'ngs-ng-rx-base',
    template: `
        <div class="row">
            <div class="col text-center"><h2>NgRX store</h2></div>
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
    styleUrls: ['./ng-rx-base.component.scss']
})
export class NgRxBaseComponent implements OnInit {
    constructor(@Inject('ngrx') public examples: ExampleDef[]) {}

    ngOnInit() {}
}
