import { Component, NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesModule } from './courses/courses.component';
import { AuthModule } from './auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, select, StoreModule } from '@ngrx/store';
import { AppState } from '../../../state';
import { NGXLogger } from 'ngx-logger';
import { Logout } from './auth/state/actions';
import { Observable } from 'rxjs';
import { tag } from 'rxjs-spy/operators/tag';
import { isLoggedIn, isLoggedOut } from './auth/state/selectors';
import { AuthGuard } from './auth/auth.guard';
import _flatted from 'flatted';
import { EffectsModule } from '@ngrx/effects';
import { section05FeatureKey, reducer } from './state/reducer';

@Component({
    selector: 'ngs-section-05',
    template: `
        <mat-sidenav-container>
            <mat-sidenav #start>
                <mat-nav-list (click)="start.close()">
                    <a mat-list-item routerLink="courses">
                        <mat-icon>library_books</mat-icon>
                        <span>Courses</span>
                    </a>

                    <a *ngIf="isLoggedOut$ | async" mat-list-item routerLink="login">
                        <mat-icon>account_circle</mat-icon>
                        <span>Login</span>
                    </a>

                    <a *ngIf="isLoggedIn$ | async" mat-list-item (click)="logout()">
                        <mat-icon>exit_to_app</mat-icon>
                        <span>Logout</span>
                    </a>
                </mat-nav-list>
            </mat-sidenav>

            <mat-toolbar color="primary">
                <button class="menu-button" mat-icon-button (click)="start.open('mouse')">
                    <mat-icon>menu</mat-icon>
                </button>
            </mat-toolbar>
            <router-outlet></router-outlet>
        </mat-sidenav-container>
    `,
    styleUrls: ['./section-05.component.scss'],
})
export class Section05Component implements OnInit {
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(
        private _state$: Store<AppState>,
        private _router: Router,
        private _route: ActivatedRoute,
        private _log: NGXLogger
    ) {}

    ngOnInit() {
        this.isLoggedIn$ = this._state$.pipe(
            // map((state: any) => state.auth.isLoggedIn),
            select(isLoggedIn),
            tag('section05:isLoggedIn')
        );

        this.isLoggedOut$ = this._state$.pipe(
            // map((state: any) => !state.auth.isLoggedIn),
            select(isLoggedOut),
            tag('section05:isLoggedOut')
        );
    }

    logout() {
        this._state$.dispatch(new Logout());

        const state = this._router.routerState.snapshot;
        const posn = state.url.search('section-05') + 'section-05'.length;
        const slice = state.url.slice(0, posn);
        // this._log.trace(posn, slice);

        this._router.navigateByUrl(`${slice}/login`);
    }
}

const routes: Routes = [
    {
        path: '',
        component: Section05Component,
        children: [
            {
                path: 'login',
                loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
                // loadChildren: './auth/auth.module#AuthModule',
                canActivate: [],
            },
            {
                path: 'courses',
                loadChildren: () => import('./courses/courses.component').then(mod => mod.CoursesModule),
                // loadChildren: './courses/courses.component#CoursesModule',
                // component: HomeComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Section05RoutingModule {}

@NgModule({
    declarations: [Section05Component],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        SharedModule,
        StoreModule.forFeature(section05FeatureKey, reducer),
        Section05RoutingModule,
        AuthModule.forRoot(),
        CoursesModule,
    ],
})
export class Section05Module {}
