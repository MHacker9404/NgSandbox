import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILesson } from '../../../shared/model/ilesson';

@Component({
    selector: 'ngs-lessons-list',
    template: `
        <table class="table lessons-list card card-strong">
            <tbody>
                <tr *ngFor="let lesson of lessons">
                    <td class="lesson-title">
                        {{ lesson.description }}
                    </td>
                    <td class="duration">
                        <i class="fa fa-times">access_time</i>
                        <span>{{ lesson.duration }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    styleUrls: ['./lessons-list.component.scss'],
})
export class LessonsListComponent implements OnInit {
    lessons: ILesson[] = [{ id: 1, description: 'description', duration: 'duration' }];

    constructor() {}

    ngOnInit() {}
}

@NgModule({
    declarations: [LessonsListComponent],
    imports: [CommonModule],
    exports: [LessonsListComponent],
})
export class LessonsListModule {}
