import {Component, NgModule, OnInit, Input} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ICourse} from '../../shared/model/icourse';

@Component({
  selector: 'ngs-courses-list',
  template: `
    <table
      class="table table-bordered table-striped table-sm"
      *ngIf="courses; else loadingCourses"
    >
      <tr class="course-summary" *ngFor="let course of courses">
        <td>
          <img class="lesson-logo" src="assets/img/angular.svg" />
        </td>
        <td class="description">
          {{ course.description }}
        </td>
        <td>
          <button class="btn btn-primary" [routerLink]="['course', course.url]">
            View
          </button>
        </td>
      </tr>
    </table>

    <ng-template #loadingCourses>
      <div>Loading ...</div>
    </ng-template>
  `,
  styleUrls: ['./courses-list.component.scss'],
  })
export class CoursesListComponent implements OnInit {
  @Input() courses: ICourse[];

  constructor() {}

  ngOnInit() {}
}

@NgModule({
  declarations: [CoursesListComponent],
  imports: [CommonModule, RouterModule],
  exports: [CoursesListComponent],
  })
export class CoursesListModule {}
