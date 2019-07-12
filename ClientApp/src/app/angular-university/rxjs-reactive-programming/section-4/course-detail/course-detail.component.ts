import {Component, NgModule, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import {ActivatedRoute} from '@angular/router';
import {DatastoreService} from '../datastore.service';
import {ICourse} from '../../shared/model/icourse';
import {ILesson} from '../../shared/model/ilesson';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import _find from 'lodash/find';
import _cloneDeep from 'lodash/cloneDeep';
import {tag} from 'rxjs-spy/operators/tag';

@Component({
  selector: 'ngs-course-detail',
  template: `
    <h2>{{ course?.description }}</h2>

    <table class="table lessons-list card card-strong" *ngIf="lessons">
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

    <div *ngIf="!lessons">Loading ...</div>
  `,
  styleUrls: ['./course-detail.component.scss'],
  })
export class CourseDetailComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();

  course: ICourse;
  lessons: ILesson[];
  constructor(
    private _route: ActivatedRoute,
    private _dataStore: DatastoreService
  ) {
    let courseId: string;
    _route.params
        .pipe(
            takeUntil(this._unsubscribe$),
            tap((params) => (courseId = params['id'])),
            tag('route-params')
        )
        .subscribe();
    _dataStore.courseList$
        .pipe(
            takeUntil(this._unsubscribe$),
            tap((courses: ICourse[]) => {
              this.course = _cloneDeep(
                  _find(courses, (course: ICourse) => course.url === courseId)
              );
              this.lessons = _cloneDeep(this.course.lessons);
            }),
            tag('courses')
        )
        .subscribe();
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
