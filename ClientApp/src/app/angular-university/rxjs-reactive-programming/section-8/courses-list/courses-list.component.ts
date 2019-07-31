import {
    Component,
    NgModule,
    OnInit,
    Input,
    AfterContentInit,
    OnChanges,
    ChangeDetectionStrategy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ICourse } from '../../shared/model/icourse';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'ngs-courses-list',
    template: `
        <table class="table table-bordered table-striped table-sm" *ngIf="courses; else loadingCourses">
            <tr class="course-summary" *ngFor="let course of courses">
                <td>
                    <img class="lesson-logo" src="assets/img/angular.svg" />
                </td>
                <td class="description">
                    {{ course.description }}
                </td>
                <td>
                    <a class="btn btn-primary" [routerLink]="['../course', course.url]">
                        View
                    </a>
                </td>
            </tr>
        </table>

        <ng-template #loadingCourses>
            <div>Loading ...</div>
        </ng-template>
    `,
    styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit, OnChanges {
    constructor() {}
    @Input() courses: ICourse[];

    ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
        console.log(this.courses, changes);
    }

    ngOnInit() {}
}

@NgModule({
    declarations: [CoursesListComponent],
    imports: [CommonModule, RouterModule, SharedModule],
    exports: [CoursesListComponent],
})
export class CoursesListModule {}
