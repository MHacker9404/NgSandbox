import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILesson } from '../../../shared/model/ilesson';
import { TableModule } from 'primeng/table';
import { globalEventBus, Observer } from '../event-bus-experiments/event-bus';

@Component({
    selector: 'ngs-lessons-list',
    template: `
        <table class="table table-striped table-bordered table-sm lessons-list card card-strong">
            <tbody>
                <tr *ngFor="let lesson of lessons">
                    <td class="lesson-title">
                        {{ lesson.description }}
                    </td>
                    <td class="duration">
                        <i class="material-icons">schedule</i>
                        <span>{{ lesson.duration }}</span>
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

    cols = [{ header: 'Description', field: 'description' }, { header: 'Duration', field: 'duration' }];

    constructor() {
        console.log('LessonsList registered');
        globalEventBus.registerObserver(this);
    }

    ngOnInit() {}

    notify(lessons: ILesson[]) {
        this.lessons = lessons;
        console.log('LessonsList received new list');
    }
}

@NgModule({
    declarations: [LessonsListComponent],
    imports: [CommonModule, TableModule],
    exports: [LessonsListComponent],
})
export class LessonsListModule {}
