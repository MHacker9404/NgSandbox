import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILesson } from '../../shared/model/ilesson';
import { TableModule } from 'primeng/table';
import _remove from 'lodash/remove';
import { SharedModule } from 'src/app/shared/shared.module';
import { Observer, store } from '../app-data';

@Component({
    selector: 'ngs-lessons-list',
    template: `
        <table class="table table-striped table-bordered table-sm lessons-list card card-strong">
            <tbody>
                <tr *ngFor="let lesson of lessons">
                    <td class="viewed">
                        <input type="checkbox" [checked]="lesson.completed" (click)="toggleLessonViewed(lesson)" />
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
    `,
    styleUrls: ['./lessons-list.component.scss'],
})
export class LessonsListComponent implements OnInit, Observer {
    lessons: ILesson[] = [];

    cols = [
        { field: 'completed' },
        { header: 'Description', field: 'description' },
        { header: 'Duration', field: 'duration' },
    ];
    constructor() {}

    ngOnInit() {
        store.lessonsList$.subscribe(this);
    }

    next(lessons: ILesson[]) {
        this.lessons = lessons.slice();
    }

    toggleLessonViewed(lesson: ILesson) {
        store.toggleLessonViewed(lesson);
    }
    delete(deleted: ILesson) {
        store.deleteLesson(deleted);
    }
}

@NgModule({
    declarations: [LessonsListComponent],
    imports: [CommonModule, SharedModule, TableModule],
    exports: [LessonsListComponent],
})
export class LessonsListModule {}
