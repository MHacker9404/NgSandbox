import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILesson } from '../../../shared/model/ilesson';
import { TableModule } from 'primeng/table';
import { globalEventBus, Observer, LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON } from '../event-bus-experiments/event-bus';
import _remove from 'lodash/remove';

@Component({
    selector: 'ngs-lessons-list',
    template: `
        <table class="table table-striped table-bordered table-sm lessons-list card card-strong">
            <tbody>
                <tr *ngFor="let lesson of lessons">
                    <td class="viewed">
                        <input type="checkbox" (click)="toggleLessonViewed(lesson)" />
                    </td>
                    <td class="lesson-title">
                        {{ lesson.description }}
                    </td>
                    <td class="duration">
                        <!--
                        <i class="material-icons">schedule</i>
                        <span>{{ lesson.duration }}</span>
                        -->
                        <button class="button btn-highlight" (click)="delete(lesson)">X</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!--
        <p-table [value]="lessons" [columns]="cols" tableStyleClass="table table-bordered table-striped table-sm">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns">
                        {{ col.header }}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowData let-columns="columns">
                <tr>
                    <td *ngFor="let col of columns">
                        {{ rowData[col.field] }}
                    </td>
                </tr>
            </ng-template>
        </p-table>
        -->
    `,
    styleUrls: ['./lessons-list.component.scss'],
})
export class LessonsListComponent implements OnInit, Observer {
    // lessons: ILesson[] = [
    //     { id: 1, description: 'description', duration: 'duration' },
    //     { id: 2, description: 'description - 2', duration: 'duration - 2' },
    // ];
    lessons: ILesson[] = [];

    cols = [
        { field: 'completed' },
        { header: 'Description', field: 'description' },
        { header: 'Duration', field: 'duration' },
    ];

    constructor() {
        console.log('LessonsList registered');
        globalEventBus.registerObserver(LESSONS_LIST_AVAILABLE, this);
        globalEventBus.registerObserver(ADD_NEW_LESSON, {
            notify: lesson => {
                this.lessons.push({ id: Math.random(), description: lesson });
            },
        });
    }

    ngOnInit() {}

    notify(lessons: ILesson[]) {
        this.lessons = lessons;
        console.log('LessonsList received new list');
    }
    toggleLessonViewed(lesson: ILesson) {
        lesson.completed = !lesson.completed;
    }
    delete(deleted: ILesson) {
        _remove(this.lessons, lesson => lesson.id === deleted.id);
    }
}

@NgModule({
    declarations: [LessonsListComponent],
    imports: [CommonModule, TableModule],
    exports: [LessonsListComponent],
})
export class LessonsListModule {}
