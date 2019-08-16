import { Component, NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { NGXLogger } from 'ngx-logger';
import { Logout } from './auth/auth/auth.actions';

@Component({
    selector: 'ngs-section-02',
    template: `
        <mat-sidenav-container>
            <mat-sidenav #start>
                <mat-nav-list (click)="start.close()">
                    <a mat-list-item routerLink="courses">
                        <mat-icon>library_books</mat-icon>
                        <span>Courses</span>
                    </a>

                    <a mat-list-item routerLink="login">
                        <mat-icon>account_circle</mat-icon>
                        <span>Login</span>
                    </a>

                    <a mat-list-item (click)="logout()">
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
    styleUrls: ['./section-02.component.scss'],
})
export class Section02Component implements OnInit {
    constructor(private _state$: Store<AppState>, private _log: NGXLogger) {}

    ngOnInit() {}

    logout() {
        this._state$.dispatch(new Logout());
    }
}

const routes: Routes = [
    {
        path: '',
        component: Section02Component,
        children: [
            {
                path: 'login',
                loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
                canActivate: [],
            },
            {
                path: 'courses',
                loadChildren: () => import('./courses/courses.component').then(mod => mod.CoursesModule),
                // component: HomeComponent,
                canActivate: [],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Section02RoutingModule {}

@NgModule({
    declarations: [Section02Component],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        SharedModule,
        Section02RoutingModule,
        AuthModule.forRoot(),
        CoursesModule,
    ],
})
export class Section02Module {}
