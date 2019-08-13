import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';

@Component({
    selector: 'home',
    template: `
        <div class="courses-panel">
            <h2 class="title">All Courses</h2>

            <div class="counters">
                <p>In Promo: {{ promoTotal$ | async }}</p>
            </div>

            <mat-tab-group>
                <mat-tab label="Beginners">
                    <courses-card-list [courses]="beginnerCourses$ | async"> </courses-card-list>
                </mat-tab>

                <mat-tab label="Advanced">
                    <courses-card-list [courses]="advancedCourses$ | async"></courses-card-list>
                </mat-tab>
            </mat-tab-group>
        </div>
    `,
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private coursesService: CoursesService, private _state$: Store<AppState>) {}

    ngOnInit() {
        const courses$ = this.coursesService.findAllCourses();

        this.beginnerCourses$ = courses$.pipe(map(courses => courses.filter(course => course.category === 'BEGINNER')));

        this.advancedCourses$ = courses$.pipe(map(courses => courses.filter(course => course.category === 'ADVANCED')));

        this.promoTotal$ = courses$.pipe(map(courses => courses.filter(course => course.promo === true).length));
    }
}
