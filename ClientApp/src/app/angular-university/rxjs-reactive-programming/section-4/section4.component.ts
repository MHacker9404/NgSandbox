import {Component, NgModule, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ICourse} from '../shared/model/icourse';
import {ILesson} from '../shared/model/ilesson';
import {SharedModule} from 'src/app/shared/shared.module';
import {DatastoreService} from './datastore.service';
import {Observable, Subject} from 'rxjs';
import _cloneDeep from 'lodash/cloneDeep';
import {takeUntil} from 'rxjs/operators';
import {
  CourseDetailComponent,
  CourseDetailModule,
} from './course-detail/course-detail.component';
import {tag} from 'rxjs-spy/operators/tag';

@Component({
  selector: 'ngs-section4',
  template: `
    <div class="screen-container">
      <h2>Stateless Observable Services</h2>

      <!--<table
        class="table table-bordered table-striped table-sm courses-list card card-strong"
        *ngIf="courses"
      >-->
      <table
        class="table table-bordered table-striped table-sm"
        *ngIf="courses$ | async"
      >
        <tr class="course-summary" *ngFor="let course of courses$ | async">
          <td>
            <img class="lesson-logo" src="assets/img/angular.svg" />
          </td>
          <td class="description">
            {{ course.description }}
          </td>
          <td>
            <button
              class="btn btn-primary"
              [routerLink]="['course', course.url]"
            >
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

      <div *ngIf="!(courses$ | async)">Loading ...</div>

      <h2>Latest Lessons Published</h2>

      <table
        class="table table-bordered table-striped table-sm"
        *ngIf="lessons$ | async"
      >
        <tbody>
          <tr *ngFor="let lesson of lessons$ | async">
            <td class="lesson-title">{{ lesson.description }}</td>
            <td class="duration">
              <i class="material-icons">access_time</i>
              <span>{{ lesson.duration }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="!(lessons$ | async)">Loading ...</div>
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
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
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
  imports: [
  CommonModule,
  SharedModule,
  Section4RoutingModule,
  CourseDetailModule,
  ],
  exports: [Section4Component],
  providers: [DatastoreService],
  })
export class Section4Module {}
