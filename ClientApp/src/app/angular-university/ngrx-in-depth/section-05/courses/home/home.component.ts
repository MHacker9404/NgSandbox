import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/state';

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ICourse } from '../../model/course';
import { RequestAllCourses } from '../state/actions';
import { selectAllCourses } from '../state/selectors';

import _filter from 'lodash/filter';

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

    beginnerCourses$: Observable<ICourse[]>;

    advancedCourses$: Observable<ICourse[]>;

    constructor(private _store$: Store<AppState>) {}

    ngOnInit() {
        this._store$.dispatch(new RequestAllCourses());

        const courses$ = this._store$.pipe(select(selectAllCourses()));

        this.beginnerCourses$ = courses$.pipe(
            map((courses: ICourse[]) => _filter(courses, course => course.category === 'BEGINNER'))
        );
        this.advancedCourses$ = courses$.pipe(
            map((courses: ICourse[]) => _filter(courses, course => course.category === 'ADVANCED'))
        );
        this.promoTotal$ = courses$.pipe(
            map((courses: ICourse[]) => _filter(courses, course => course.promo === true).length)
        );
    }
}
