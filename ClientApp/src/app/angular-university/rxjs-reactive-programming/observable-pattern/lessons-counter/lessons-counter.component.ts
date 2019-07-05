import {Component, NgModule, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observer, store} from '../app-data';
import {ILesson} from '../../shared/model/ilesson';

@Component({
  selector: 'ngs-lessons-counter',
  template: `
    <p>Total Lessons: {{ lessonsCounter }}</p>
  `,
  styleUrls: ['./lessons-counter.component.scss'],
  })
export class LessonsCounterComponent implements OnInit, OnDestroy, Observer {
  lessonsCounter = 0;

  constructor() {}

  ngOnInit() {
    store.lessonsList$.subscribe(this);
  }

  next(lessons: ILesson[]) {
    this.lessonsCounter = lessons.length;
  }

  ngOnDestroy() {
    store.lessonsList$.unsubscribe(this);
  }
}

@NgModule({
  declarations: [LessonsCounterComponent],
  imports: [CommonModule],
  exports: [LessonsCounterComponent],
  })
export class LessonsCounterModule {}
