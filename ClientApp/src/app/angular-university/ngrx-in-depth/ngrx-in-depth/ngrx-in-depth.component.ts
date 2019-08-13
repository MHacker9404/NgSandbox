import { Component, OnInit, Inject } from '@angular/core';
import { ExampleDef } from 'src/app/shared/Models/example.model';

@Component({
    selector: 'ngs-ngrx-in-depth',
    template: `
        <div class="ngrx-in-depth">
            <div class="row">
                <div class="col text-center"><h2>NgRx in Depth</h2></div>
            </div>
            <div class="row">
                <div class="col">
                    <ul class="nav nav-tabs nav-fill justify-content-center">
                        <li class="nav-item" *ngFor="let example of _examples">
                            <a class="nav-link" [routerLink]="[example.path]">{{ example.label }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col"><router-outlet></router-outlet></div>
            </div>
        </div>
    `,
    styleUrls: ['./ngrx-in-depth.component.scss'],
})
export class NgrxInDepthComponent implements OnInit {
    constructor(@Inject('ngrx-in-depth') public _examples: ExampleDef[]) {}

    ngOnInit() {}
}
