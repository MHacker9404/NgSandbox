import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { LessonsListModule } from './lessons-list/lessons-list.component';
import { LessonsCounterModule } from './lessons-counter/lessons-counter.component';
import { store } from './app-data';
import json from '../shared/model/test-lessons.json';

@Component({
    selector: 'ngs-with-rxjs',
    template: `
        <div class="course-container">
            <h2>With RxJS</h2>
            <ngs-lessons-counter></ngs-lessons-counter>
            <ngs-lessons-list></ngs-lessons-list>
            <input type="text" #input />
            <button class="btn btn-primary btn-sm" (click)="addLesson(input.value)">Add Lesson</button>
        </div>
    `,
    styleUrls: ['./with-rxjs.component.scss'],
})
export class WithRxJsComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        store.initializeLessonsList(json.slice());
        setTimeout(() => {
            const newLesson = {
                id: Math.random(),
                description: 'New lesson from server',
            };
            store.addLesson(newLesson);
        }, 10000);
    }

    addLesson(lesson: string) {
        const newLesson = {
            id: Math.random(),
            description: lesson,
        };
        store.addLesson(newLesson);
    }
}

const routes: Routes = [{ path: '', component: WithRxJsComponent, pathMatch: 'full' }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WithRxJsRoutingModule {}

@NgModule({
    declarations: [WithRxJsComponent],
    imports: [CommonModule, SharedModule, WithRxJsRoutingModule, LessonsCounterModule, LessonsListModule],
    exports: [WithRxJsComponent],
})
export class WithRxJsModule {}
