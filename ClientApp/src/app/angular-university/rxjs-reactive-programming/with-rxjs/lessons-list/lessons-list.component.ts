import {Component, NgModule, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ILesson} from '../../shared/model/ilesson';
import {TableModule} from 'primeng/table';
import _remove from 'lodash/remove';
import {SharedModule} from 'src/app/shared/shared.module';
import {store} from '../app-data';
import {tap, takeUntil} from 'rxjs/operators';
import _deepClone from 'lodash/clone';
import {Subject} from 'rxjs';

@Component({
  selector: 'ngs-lessons-list',
  template: `
    <table
      class="table table-striped table-bordered table-sm lessons-list card card-strong"
    >
      <tbody>
        <tr *ngFor="let lesson of lessons">
          <td class="viewed">
            <input
              type="checkbox"
              [checked]="lesson.completed"
              (click)="toggleLessonViewed(lesson)"
            />
          </td>
          <td
            class="lesson-title"
            [ngClass]="{ 'lesson-viewed': lesson.completed }"
          >
            {{ lesson.description }}
          </td>
          <td class="duration">
            <i class="material-icons">schedule</i>{{ lesson.duration }}
          </td>
          <td class="duration">
            <button class="button btn-highlight" (click)="delete(lesson)">
              X
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./lessons-list.component.scss'],
  })
export class LessonsListComponent implements OnInit, OnDestroy {
  lessons: ILesson[] = [];
  private _unsubscribe$ = new Subject<void>();
  cols = [
    {field: 'completed'},
    {header: 'Description', field: 'description'},
    {header: 'Duration', field: 'duration'},
  ];

  constructor() {}
  ngOnInit() {
    store.lessonsList$
        .pipe(
            takeUntil(this._unsubscribe$),
            tap((lessons: ILesson[]) => (this.lessons = _deepClone(lessons)))
        )
        .subscribe();
  }

  toggleLessonViewed(lesson: ILesson) {
    store.toggleLessonViewed(lesson);
  }

  delete(deleted: ILesson) {
    store.deleteLesson(deleted);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}

@NgModule({
  declarations: [LessonsListComponent],
  imports: [CommonModule, SharedModule, TableModule],
  exports: [LessonsListComponent],
  })
export class LessonsListModule {}
