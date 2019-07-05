import {Component, NgModule, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ILesson} from '../../shared/model/ilesson';
import {SharedModule} from 'src/app/shared/shared.module';
import {store} from '../app-data';
import {Subject} from 'rxjs';
import {tap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ngs-lessons-counter',
  template: `
    <p>Total Lessons: {{ lessonsCounter }}</p>
  `,
  styleUrls: ['./lessons-counter.component.scss'],
  })
export class LessonsCounterComponent implements OnInit, OnDestroy {
  lessonsCounter = 0;
  private _unsubscribe$ = new Subject<void>();
  constructor() {}

  ngOnInit() {
    store.lessonsList$
        .pipe(
            takeUntil(this._unsubscribe$),
            tap((lessons: ILesson[]) => (this.lessonsCounter = lessons.length))
        )
        .subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}

@NgModule({
  declarations: [LessonsCounterComponent],
  imports: [CommonModule, SharedModule],
  exports: [LessonsCounterComponent],
  })
export class LessonsCounterModule {}
