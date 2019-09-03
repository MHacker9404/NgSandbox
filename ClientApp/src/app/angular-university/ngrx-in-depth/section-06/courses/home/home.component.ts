import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/state';

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ICourse } from '../../model/course';
import { RequestAllCourses } from '../state/actions';
import {
    selectAllCourses,
    selectBeginnersCourses,
    selectAdvancedCourses,
    selectPromoCount,
    selectIntermediateCourses,
} from '../state/selectors';

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

                <mat-tab label="Intermediate">
                    <courses-card-list [courses]="intermediateCourses$ | async"> </courses-card-list>
                </mat-tab>

                <mat-tab label="Advanced">
                    <courses-card-list [courses]="advancedCourses$ | async"></courses-card-list>
                </mat-tab>
            </mat-tab-group>
        </div>
    `,
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    promoTotal$: Observable<number>;
    beginnerCourses$: Observable<ICourse[]>;
    intermediateCourses$: Observable<ICourse[]>;
    advancedCourses$: Observable<ICourse[]>;

    constructor(private _store$: Store<AppState>) {}

    ngOnInit() {
        this._store$.dispatch(new RequestAllCourses());

        this.beginnerCourses$ = this._store$.pipe(select(selectBeginnersCourses));
        this.intermediateCourses$ = this._store$.pipe(select(selectIntermediateCourses));
        this.advancedCourses$ = this._store$.pipe(select(selectAdvancedCourses));
        this.promoTotal$ = this._store$.pipe(select(selectPromoCount));
    }
}
