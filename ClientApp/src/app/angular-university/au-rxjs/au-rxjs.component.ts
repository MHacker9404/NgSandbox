import { Component, OnInit, Inject } from '@angular/core';
import { ExampleDef } from 'src/app/shared/Models/example.model';

@Component({
    selector: 'ngs-au-rxjs',
    template: `
        <div class="row">
            <div class="col text-center"><h2>Pro</h2></div>
        </div>
        <div class="row">
            <div class="col-3"><ngs-sidebar [items]="examples"></ngs-sidebar></div>
            <div class="col-9"><router-outlet></router-outlet></div>
        </div>
    `,
    styleUrls: ['./au-rxjs.component.scss'],
})
export class AuRxjsComponent implements OnInit {
    constructor(@Inject('rxjs') public examples: ExampleDef[]) {}

    ngOnInit() {}
}
