import { Component, NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'ngs-section-01',
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
    styleUrls: ['./section-01.component.scss'],
})
export class Section01Component implements OnInit {
    constructor() {}

    ngOnInit() {}
}

const routes: Routes = [
    {
        path: '',
        component: Section01Component,
        children: [
            {
                path: 'courses',
                loadChildren: './courses/courses.component#CoursesModule',
                canActivate: [],
            },
            // {
            //     path: '**',
            //     redirectTo: '/',
            // },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Section01RoutingModule {}

@NgModule({
    declarations: [Section01Component],
    imports: [
        CommonModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        SharedModule,
        Section01RoutingModule,
    ],
    exports: [Section01Component],
})
export class Section01Module {}
