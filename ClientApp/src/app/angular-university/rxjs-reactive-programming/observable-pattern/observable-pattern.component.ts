import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LessonsCounterModule } from './lessons-counter/lessons-counter.component';
import { LessonsListModule } from './lessons-list/lessons-list.component';
import json from '../shared/model/test-lessons.json';
import { store } from './app-data';

@Component({
    selector: 'ngs-observable-pattern',
    template: `
        <div class="course-container">
            <h2>Observable Pattern</h2>
            <ngs-lessons-counter></ngs-lessons-counter>
            <ngs-lessons-list></ngs-lessons-list>
            <input type="text" #input />
            <button class="btn btn-primary btn-sm" (click)="addLesson(input.value)">Add Lesson</button>
        </div>
    `,
    styleUrls: ['./observable-pattern.component.scss'],
})
export class ObservablePatternComponent implements OnInit {
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

const routes: Routes = [{ path: '', component: ObservablePatternComponent, pathMatch: 'full' }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ObservablePatternRoutingModule {}

@NgModule({
    declarations: [ObservablePatternComponent],
    imports: [CommonModule, SharedModule, ObservablePatternRoutingModule, LessonsCounterModule, LessonsListModule],
    exports: [ObservablePatternComponent],
})
export class ObservablePatternModule {}
