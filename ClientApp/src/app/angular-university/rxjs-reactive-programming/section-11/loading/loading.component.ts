import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, NavigationStart, RoutesRecognized } from '@angular/router';
import { map } from 'rxjs/operators/map';
import { tag } from 'rxjs-spy/operators/tag';

@Component({
    selector: 'ngs-loading',
    template: `
        <div class="loading-indicator" *ngIf="loading$ | async">
            <img src="/assets/img/loading.gif" />
        </div>
    `,
    styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
    loading$: Observable<boolean>;

    constructor(private _router: Router) {}

    ngOnInit() {
        this.loading$ = this._router.events.pipe(
            map(event => event instanceof NavigationStart || event instanceof RoutesRecognized),
            tag('loadingComponent:loading$')
        );
    }
}

@NgModule({
    declarations: [LoadingComponent],
    imports: [CommonModule],
    exports: [LoadingComponent],
})
export class LoadingModule {}
