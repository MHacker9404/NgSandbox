import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { CourseResolver } from './services/course.resolver';
import { CoursesService } from './services/courses.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from '../state/effects';
import * as fromSelf from './state/reducer';

@Component({
    selector: 'ngs-courses',
    template: `
        <p>
            courses works!
        </p>
    `,
    styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        children: [],
    },
    {
        path: ':id',
        component: CourseComponent,
        resolve: {
            course: CourseResolver,
        },
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoursesRoutingModule {}

@NgModule({
    declarations: [CoursesComponent, CourseComponent, CourseDialogComponent, CoursesCardListComponent, HomeComponent],
    imports: [
        CommonModule,
        SharedModule,
        CoursesRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        StoreModule.forFeature(fromSelf.coursesFeatureKey, fromSelf.reducer),
        EffectsModule.forFeature([CourseEffects]),
    ],
    // exports: [HomeComponent],
    providers: [CoursesService, CourseResolver],
})
export class CoursesModule {}
