import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILesson } from '../../../shared/model/ilesson';
import { AgGridModule } from 'ag-grid-angular';

@Component({
    selector: 'ngs-lessons-list',
    template: `
        <!--
        <table class="table table-striped table-bordered table-sm lessons-list card card-strong">
            <tbody>
                <tr *ngFor="let lesson of lessons">
                    <td class="lesson-title">
                        {{ lesson.description }}
                    </td>
                    <td class="duration">
                        <i class="material-icons">favorite_border</i>
                        <span>{{ lesson.duration }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        -->
        <ag-grid-angular class="ag-theme-balham" [rowData]="lessons" [columnDefs]="cols"> </ag-grid-angular>
    `,
    styleUrls: ['./lessons-list.component.scss'],
})
export class LessonsListComponent implements OnInit {
    lessons: ILesson[] = [
        { id: 1, description: 'description', duration: 'duration' },
        { id: 2, description: 'description - 2', duration: 'duration - 2' },
    ];

    cols = [{ headerName: 'Description', field: 'description' }, { headerName: 'Duration', field: 'duration' }];

    constructor() {}

    ngOnInit() {}
}

@NgModule({
    declarations: [LessonsListComponent],
    imports: [CommonModule, AgGridModule],
    exports: [LessonsListComponent],
})
export class LessonsListModule {}
