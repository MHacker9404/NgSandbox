import { Component, NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { CoursesModule } from './courses/courses.component';
import { HomeComponent } from './courses/home/home.component';
import { AuthModule } from './auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';

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

                    <a mat-list-item>
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
    constructor() {}

    ngOnInit() {}
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
                component: HomeComponent,
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
