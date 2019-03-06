import { Component, OnInit, Inject } from '@angular/core';
import { ExampleDef } from '../shared/Models/example.model';

@Component({
    selector: 'ngs-angular-university-base',
    template: `
        <div class="row">
            <div class="col text-center"><h2>Angular University</h2></div>
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
    styleUrls: ['./angular-university-base.component.scss'],
})
export class AngularUniversityBaseComponent implements OnInit {
    constructor(@Inject('AngularUniversity') public examples: ExampleDef[]) {}

    ngOnInit() {}
}
