import { Component, OnInit, Inject } from '@angular/core';
import { ExampleDef } from 'src/app/shared/Models/example.model';

@Component({
    selector: 'ngs-pro-base',
    template: `
        <div class="row">
            <div class="col text-center"><h2>Pro</h2></div>
        </div>
        <div class="row">
            <div class="col-3"><ngs-sidebar [items]="examples"></ngs-sidebar></div>
            <div class="col-9"><router-outlet></router-outlet></div>
        </div>
    `,
    styleUrls: ['./pro-base.component.scss']
})
export class ProBaseComponent implements OnInit {
    constructor(@Inject('pro') public examples: ExampleDef[]) {}

    ngOnInit() {}
}
