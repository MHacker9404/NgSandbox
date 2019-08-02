import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ICourse } from '../shared/model/icourse';
import { ILesson } from '../shared/model/ilesson';
import { SharedModule } from 'src/app/shared/shared.module';
import { DatastoreService } from './datastore.service';
import { Observable, Subject } from 'rxjs';
import _cloneDeep from 'lodash/cloneDeep';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { CourseDetailComponent, CourseDetailModule } from './course-detail/course-detail.component';
import { tag } from 'rxjs-spy/operators/tag';

@Component({
    selector: 'ngs-au-section4',
    template: `
        <div class="screen-container">
            <h2>Stateless Observable Services</h2>

            <!--<table
        class="table table-bordered table-striped table-sm courses-list card card-strong"
        *ngIf="courses"
      >-->
            <table
                class="table table-bordered table-striped table-sm"
                *ngIf="courses$ | async as courses; else loadingCourses"
            >
                <tr class="course-summary" *ngFor="let course of courses">
                    <td>
                        <img class="lesson-logo" src="assets/img/angular.svg" />
                    </td>
                    <td class="description">
                        {{ course.description }}
                    </td>
                    <td>
                        <button class="btn btn-primary" [routerLink]="['course', course.url]">
                            View
                        </button>
                    </td>
                </tr>
            </table>

            <!--
      <button class="btn btn-primary" (click)="changeCourseData()">
        Mutate Local Data
      </button>
      -->

            <ng-template #loadingCourses>
                <div>Loading ...</div>
            </ng-template>

            <h2>Latest Lessons Published</h2>

            <table
                class="table table-bordered table-striped table-sm"
                *ngIf="lessons$ | async as lessons; else lessonsLoading"
            >
                <tbody>
                    <tr *ngFor="let lesson of lessons">
                        <td class="lesson-title">{{ lesson.description }}</td>
                        <td class="duration">
                            <i class="material-icons">access_time</i>
                            <span>{{ lesson.duration }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <ng-template #lessonsLoading>
                <div>Loading ...</div>
            </ng-template>
        </div>
    `,
    styleUrls: ['./section4.component.scss'],
})
export class Section4Component implements OnInit, OnDestroy {
    //   courses: ICourse[];
    //   latestLessons: ILesson[];

    courses$: Observable<ICourse[]>;
    lessons$: Observable<ILesson[]>;
    private _unsubscribe$ = new Subject<void>();

    constructor(private _dataStore: DatastoreService) {
        this.courses$ = _dataStore.courseList$.pipe(
            takeUntil(this._unsubscribe$),
            tag('section-4: courses')
        );
        this.lessons$ = _dataStore.lessonsList$.pipe(
            takeUntil(this._unsubscribe$),
            tag('section-4: lessons')
        );
    }

    ngOnInit() {}

    //   changeCourseData() {
    //     this.courses.forEach(
    //         (course) => (course.description = `=> ${course.description}`)
    //     );
    //   }

    ngOnDestroy(): void {
        //     this._unsubscribe$.next();
        //     this._unsubscribe$.complete();
    }
}

const routes: Routes = [
    {
        path: '',
        component: Section4Component,
        pathMatch: 'full',
    },
    {
        path: 'course/:id',
        component: CourseDetailComponent,
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Section4RoutingModule {}

@NgModule({
    declarations: [Section4Component],
    imports: [CommonModule, SharedModule, Section4RoutingModule, CourseDetailModule],
    exports: [Section4Component],
    providers: [DatastoreService],
})
export class Section4Module {}
