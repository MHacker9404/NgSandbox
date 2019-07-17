import {Component, NgModule, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SharedModule} from 'src/app/shared/shared.module';
import {Observable, Subject} from 'rxjs';
import {ICourse} from '../shared/model/icourse';
import {ILesson} from '../shared/model/ilesson';
import {DatastoreService} from './datastore.service';
import {takeUntil} from 'rxjs/operators';
import {tag} from 'rxjs-spy/operators';
import {
  CourseDetailComponent,
  CourseDetailModule,
} from './course-detail/course-detail.component';
import {CoursesListModule} from './courses-list/courses-list.component';
import {LessonsListModule} from './lessons-list/lessons-list.component';
import {CourseDetailHeaderModule} from './course-detail-header/course-detail-header.component';
import {NewsletterModule} from './newsletter/newsletter.component';
import {NewsletterService} from './newsletter.service';
import {LoginModule} from './login/login.component';

@Component({
  selector: 'ngs-section6',
  template: `
    <div class="screen-container">
      <h2>Observable Data Services</h2>

      <ngs-courses-list [courses]="courses$ | async"></ngs-courses-list>

      <ngs-lessons-list [lessons]="lessons$ | async"></ngs-lessons-list>
    </div>
  `,
  styleUrls: ['./section-6.component.scss'],
  })
export class Section6Component implements OnInit, OnDestroy {
  courses$: Observable<ICourse[]>;
  lessons$: Observable<ILesson[]>;
  private _unsubscribe$ = new Subject<void>();

  constructor(private _dataStore: DatastoreService) {
    this.courses$ = _dataStore.courseList$.pipe(
        takeUntil(this._unsubscribe$),
        tag('section-6: courses')
    );
    this.lessons$ = _dataStore.lessonsList$.pipe(
        takeUntil(this._unsubscribe$),
        tag('section-6: lessons')
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
    component: Section6Component,
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
export class Section6RoutingModule {}

@NgModule({
  declarations: [Section6Component],
  imports: [
  CommonModule,
  Section6RoutingModule,
  SharedModule,
  Section6RoutingModule,
  CourseDetailModule,
  CoursesListModule,
  LessonsListModule,
  CourseDetailHeaderModule,
  NewsletterModule,
  LoginModule,
  ],
  exports: [Section6Component],
  providers: [DatastoreService, NewsletterService],
  })
export class Section6Module {}
