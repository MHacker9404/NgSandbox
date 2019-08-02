import {Component, NgModule, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from 'src/app/shared/shared.module';
import {DatastoreService} from './datastore.service';
import {Observable, Subject} from 'rxjs';
import {ICourse} from '../shared/model/icourse';
import {ILesson} from '../shared/model/ilesson';
import {takeUntil} from 'rxjs/operators';
import {tag} from 'rxjs-spy/operators';
import {
  CourseDetailComponent,
  CourseDetailModule,
} from './course-detail/course-detail.component';
import {CoursesListModule} from './courses-list/courses-list.component';
import {LessonsListModule} from './lessons-list/lessons-list.component';

@Component({
  selector: 'ngs-au-section5',
  template: `
    <div class="screen-container">
      <h2>Smart vs Presentational Components</h2>

      <ngs-courses-list [courses]="courses$ | async"></ngs-courses-list>

      <ngs-lessons-list [lessons]="lessons$ | async"></ngs-lessons-list>
    </div>
  `,
  styleUrls: ['./section-5.component.scss'],
  })
export class Section5Component implements OnInit, OnDestroy {
  courses$: Observable<ICourse[]>;
  lessons$: Observable<ILesson[]>;
  private _unsubscribe$ = new Subject<void>();

  constructor(private _dataStore: DatastoreService) {
    this.courses$ = _dataStore.courseList$.pipe(
        takeUntil(this._unsubscribe$),
        tag('section-5: courses')
    );
    this.lessons$ = _dataStore.lessonsList$.pipe(
        takeUntil(this._unsubscribe$),
        tag('section-5: lessons')
    );
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
const routes: Routes = [
  {
    path: '',
    component: Section5Component,
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
export class Section5RoutingModule {}

@NgModule({
  declarations: [Section5Component],
  imports: [
  CommonModule,
  SharedModule,
  Section5RoutingModule,
  CourseDetailModule,
  CoursesListModule,
  LessonsListModule,
  ],
  exports: [Section5Component],
  providers: [DatastoreService],
  })
export class Section5Module {}
