import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { globalEventBus, LESSONS_LIST_AVAILABLE, Observer, ADD_NEW_LESSON } from '../event-bus-experiments/event-bus';
import { ILesson } from '../../../shared/model/ilesson';

@Component({
    selector: 'ngs-lessons-counter',
    template: `
        <p>Total Lessons: {{ lessonsCounter }}</p>
    `,
    styleUrls: ['./lessons-counter.component.scss'],
})
export class LessonsCounterComponent implements OnInit, Observer {
    lessonsCounter = 0;
    constructor() {
        globalEventBus.registerObserver(LESSONS_LIST_AVAILABLE, this);
        globalEventBus.registerObserver(ADD_NEW_LESSON, { notify: lesson => (this.lessonsCounter += 1) });
    }

    notify(lessons: ILesson[]) {
        this.lessonsCounter = lessons.length;
    }

    ngOnInit() {}
}

@NgModule({
    declarations: [LessonsCounterComponent],
    imports: [CommonModule],
    exports: [LessonsCounterComponent],
})
export class LessonsCounterModule {}
