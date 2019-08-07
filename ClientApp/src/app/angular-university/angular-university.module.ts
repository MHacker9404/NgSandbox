import { NgModule, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleDef } from '../shared/Models/example.model';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const examples: ExampleDef[] = [
    {
        label: '01 - RxJs Reactive Programming',
        name: 'RxjsReactiveProgramming',
        path: 'rxjs',
        component: null,
    },
    {
        label: '02 - NgRx in Depth',
        name: 'NgrxInDepth',
        path: 'ngrx-in-depth',
        component: null,
    },
];

@Component({
    selector: 'ngs-angular-university-base',
    template: `
        <div class="row">
            <div class="col text-center"><h2>Angular University</h2></div>
        </div>
        <div class="row">
            <div class="col">
                <ul class="nav nav-pills justify-content-center">
                    <li class="nav-item" *ngFor="let example of _examples">
                        <a class="nav-link" [routerLink]="[example.path]">{{ example.label }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row angular-university">
            <div class="col"><router-outlet></router-outlet></div>
        </div>
    `,
})
export class AngularUniversityBaseComponent implements OnInit {
    constructor(@Inject('a-u') public _examples: ExampleDef[]) {}

    ngOnInit() {}
}

export function ngrxModule() {
    return import('./ngrx-in-depth/ngrx-in-depth.component').then(mod => mod.NgrxInDepthModule);
}
const routes: Routes = [
    {
        path: '',
        component: AngularUniversityBaseComponent,
        children: [
            {
                path: 'rxjs',
                loadChildren: './rxjs-reactive-programming/au-rxjs.module#AuRxjsModule',
            },
            {
                path: 'ngrx-in-depth',
                // loadChildren: () =>
                // import('./ngrx-in-depth/ngrx-in-depth.component').then(mod => mod.NgrxInDepthModule),
                loadChildren: ngrxModule,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AngularUniversityRoutingModule {}

@NgModule({
    declarations: [AngularUniversityBaseComponent],
    imports: [CommonModule, SharedModule, AngularUniversityRoutingModule],
    providers: [{ provide: 'a-u', useValue: examples }],
})
export class AngularUniversityModule {}
