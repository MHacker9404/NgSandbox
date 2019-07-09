import {Component, NgModule, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ICourse} from '../shared/model/icourse';
import {ILesson} from '../shared/model/ilesson';
import {SharedModule} from 'src/app/shared/shared.module';
import {DatastoreService} from './datastore.service';
import {Observable, Subject} from 'rxjs';
import _cloneDeep from 'lodash/cloneDeep';
import {takeUntil, tap} from 'rxjs/operators';
import {
  CourseDetailComponent,
  CourseDetailModule,
} from './course-detail/course-detail.component';

@Component({
  selector: 'ngs-section4',
  template: `
    <div class="screen-container">
      <h2>Stateless Observable Services</h2>

      <table class="courses-list card card-strong" *ngIf="courses">
        <tr class="course-summary" *ngFor="let course of courses">
          <td>
            <img class="lesson-logo" src="assets/img/angular.svg" />
          </td>
          <td class="description">
            {{ course.description }}
          </td>
          <td>
            <button
              class="button button-primary"
              [routerLink]="['course', course.url]"
            >
              View
            </button>
          </td>
        </tr>
      </table>

      <div *ngIf="!courses">Loading ...</div>

      <h2>Latest Lessons Published</h2>

      <table class="table lessons-list card card-strong" *ngIf="latestLessons">
        <tbody>
          <tr *ngFor="let lesson of latestLessons">
            <td class="lesson-title">{{ lesson.description }}</td>
            <td class="duration">
              <i class="material-icons">access_time</i>
              <span>{{ lesson.duration }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="!latestLessons">Loading ...</div>
    </div>
  `,
  styleUrls: ['./section4.component.scss'],
  })
export class Section4Component implements OnInit, OnDestroy {
  courses: ICourse[];
  latestLessons: ILesson[];

  private _courseList$: Observable<ICourse[]>;
  private _lessonsList$: Observable<ILesson[]>;
  private _unsubscribe$ = new Subject<void>();

  constructor(private _dataStore: DatastoreService) {
    this._courseList$ = _dataStore.courseList$;
    this._lessonsList$ = _dataStore.lessonsList$;
  }

  ngOnInit() {
    this._courseList$
        .pipe(
            takeUntil(this._unsubscribe$),
            tap((courses: ICourse[]) => (this.courses = _cloneDeep(courses)))
        )
        .subscribe();
    this._lessonsList$
        .pipe(
            takeUntil(this._unsubscribe$),
            tap((lessons: ILesson[]) => (this.latestLessons = _cloneDeep(lessons)))
        )
        .subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}

const routes: Routes = [
  {
    path: '',
    component: Section4Component,
    // pathMatch: 'full',
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
