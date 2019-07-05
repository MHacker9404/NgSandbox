import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LessonsCounterModule } from '../lessons-counter/lessons-counter.component';
import { LessonsListModule } from '../lessons-list/lessons-list.component';
import json from '../../../shared/model/test-lessons.json';
import { ILesson } from '../../../shared/model/ilesson';
import { globalEventBus, LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON } from './event-bus';

@Component({
    selector: 'ngs-event-bus-experiments',
    template: `
        <div class="course-container">
            <h2>Event Bus Experiments</h2>
            <ngs-lessons-counter></ngs-lessons-counter>
            <ngs-lessons-list></ngs-lessons-list>
            <input type="text" #input />
            <button class="btn btn-primary btn-sm" (click)="addLesson(input.value)">Add Lesson</button>
        </div>
    `,
    styleUrls: ['./event-bus-experiments.component.scss'],
})
export class EventBusExperimentsComponent implements OnInit {
    private lessons: ILesson[];

    constructor() {
        this.lessons = json.slice();
    }

    ngOnInit() {
        globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE, this.lessons);

        setTimeout(() => {
            this.lessons.push({
                id: Math.random(),
                description: 'New lesson from server',
            });
            globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE, this.lessons.slice());
        }, 10000);
    }

    addLesson(lesson: string) {
        globalEventBus.notifyObservers(ADD_NEW_LESSON, lesson);
    }
}

@NgModule({
    declarations: [EventBusExperimentsComponent],
    imports: [CommonModule, SharedModule, LessonsCounterModule, LessonsListModule],
    exports: [EventBusExperimentsComponent],
})
export class EventBusExperimentsModule {}
