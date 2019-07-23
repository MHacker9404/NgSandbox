import {Component, NgModule, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import {ActivatedRoute} from '@angular/router';
import {DatastoreService} from '../datastore.service';
import {ICourse} from '../../shared/model/icourse';
import {ILesson} from '../../shared/model/ilesson';
import {Observable, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import _find from 'lodash/find';
import _cloneDeep from 'lodash/cloneDeep';
import {tag} from 'rxjs-spy/operators/tag';

@Component({
  selector: 'ngs-course-detail',
  template: `
    <h2>{{ (course$ | async)?.description }}</h2>

    <table
      class="table lessons-list card card-strong"
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
  `,
  styleUrls: ['./course-detail.component.scss'],
  })
export class CourseDetailComponent implements OnInit, OnDestroy {
  course$: Observable<ICourse>;
  lessons$: Observable<ILesson[]>;
  private _unsubscribe$ = new Subject<void>();

  //   course: ICourse;
  //   lessons: ILesson[];
  constructor(
    private _route: ActivatedRoute,
    private _dataStore: DatastoreService
  ) {
    let courseId: string;
    _route.params
        .pipe(
            takeUntil(this._unsubscribe$),
            tap((params) => (courseId = params['id'])),
            tag('course-detail: route-params')
        )
        .subscribe();
    this.course$ = this._dataStore.findCourseByUrl(courseId).pipe(
        takeUntil(this._unsubscribe$),
        tag('course-detail: course')
    );
    this.lessons$ = this._dataStore.findLessonsForCourse(courseId).pipe(
        takeUntil(this._unsubscribe$),
        tag('course-detail: lessons')
    );
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}

@NgModule({
  declarations: [CourseDetailComponent],
  imports: [CommonModule, SharedModule],
  exports: [CourseDetailComponent],
  })
export class CourseDetailModule {}