import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { httpObservable } from 'src/shared/utils';
import { Course } from '../model/course';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {
        const http$ = httpObservable('http://localhost:5000/api/courses');
        const courses$: Observable<Course[]> = http$.pipe(
            tap(() => console.debug('http request executed')),
            map((obj: any) => Object.values(obj) as Course[]),
            shareReplay()
        );

        this.beginnerCourses$ = courses$.pipe(
            map((courses: Course[]) => courses.filter((course: Course) => course.category === 'BEGINNER'))
        );
        this.advancedCourses$ = courses$.pipe(
            map((courses: Course[]) => courses.filter((course: Course) => course.category === 'ADVANCED'))
        );
    }
    ngOnDestroy(): void {}

    ngOnInit() {}
}
