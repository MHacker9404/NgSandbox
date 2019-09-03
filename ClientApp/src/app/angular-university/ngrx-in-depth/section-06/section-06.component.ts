import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { tag } from 'rxjs-spy/operators/tag';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppState } from 'src/app/state';

import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { select, Store, StoreModule } from '@ngrx/store';

import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { Logout } from './auth/state/actions';
import { isLoggedIn, isLoggedOut } from './auth/state/selectors';
import { CoursesModule } from './courses/courses.component';
import * as fromSelf from './state/reducer';

@Component({
    selector: 'ngs-section-06',
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
    styleUrls: ['./section-06.component.scss'],
})
export class Section06Component implements OnInit {
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(
        private _store$: Store<AppState>,
        private _router: Router,
        private _route: ActivatedRoute,
        private _log: NGXLogger
    ) {}

    ngOnInit() {
        this.isLoggedIn$ = this._store$.pipe(
            // map((state: any) => state.auth.isLoggedIn),
            select(isLoggedIn),
            tag('section06:isLoggedIn')
        );

        this.isLoggedOut$ = this._store$.pipe(
            // map((state: any) => !state.auth.isLoggedIn),
            select(isLoggedOut),
            tag('section06:isLoggedOut')
        );
    }

    logout() {
        this._store$.dispatch(new Logout());

        const state = this._router.routerState.snapshot;
        const posn = state.url.search('section-06') + 'section-06'.length;
        const slice = state.url.slice(0, posn);
        // this._log.trace(posn, slice);

        this._router.navigateByUrl(`${slice}/login`);
    }
}

const routes: Routes = [
    {
        path: '',
        component: Section06Component,
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
            {
                path: '**',
                redirectTo: 'login',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Section06RoutingModule {}

@NgModule({
    declarations: [Section06Component],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        SharedModule,
        StoreModule.forFeature(fromSelf.section06FeatureKey, fromSelf.reducer),
        Section06RoutingModule,
        AuthModule.forRoot(),
        CoursesModule,
    ],
})
export class Section06Module {}
