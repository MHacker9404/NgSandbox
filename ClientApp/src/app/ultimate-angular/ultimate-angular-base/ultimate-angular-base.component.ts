import { Component, OnInit, Inject } from '@angular/core';
import { ExampleDef } from 'src/app/shared/Models/example.model';

@Component({
    selector: 'ngs-ultimate-angular-base',
    template: `
        <div class="row">
            <div class="col text-center"><h2>Ultimate Angular</h2></div>
        </div>
        <div class="row">
            <div class="col">
                <ul class="nav nav-pills justify-content-center">
                    <li class="nav-item" *ngFor="let example of examples">
                        <a class="nav-link" [routerLink]="[example.path]">{{ example.label }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col"><router-outlet></router-outlet></div>
        </div>
    `,
    styleUrls: ['./ultimate-angular-base.component.scss']
})
export class UltimateAngularBaseComponent implements OnInit {
    constructor(@Inject('UltimateAngular') public examples: ExampleDef[]) {}

    ngOnInit() {}
}
