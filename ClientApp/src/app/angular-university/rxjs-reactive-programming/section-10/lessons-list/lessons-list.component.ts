import { Component, NgModule, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILesson } from '../../shared/model/ilesson';

@Component({
    selector: 'ngs-lessons-list',
    template: `
        <table class="table table-bordered table-striped table-sm" *ngIf="lessons; else lessonsLoading">
            <tbody>
                <tr *ngFor="let lesson of lessons" (click)="select(lesson)">
                    <td class="lesson-title">{{ lesson.description }}</td>
                    <td class="duration">
                        <i class="material-icons">access_time</i>
                        <span>{{ lesson.duration }}</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <ng-template #lessonsLoading>
            <div>Loading ...</div>
        </ng-template>
    `,
    styleUrls: ['./lessons-list.component.scss'],
})
export class LessonsListComponent implements OnInit {
    @Input() lessons: ILesson[];
    @Output() selected = new EventEmitter<ILesson>();
    constructor() {}

    ngOnInit() {}

    select(lesson: ILesson) {
        this.selected.next(lesson);
    }
}

@NgModule({
    declarations: [LessonsListComponent],
    imports: [CommonModule],
    exports: [LessonsListComponent],
})
export class LessonsListModule {}
