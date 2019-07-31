import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseModule } from '../course/course.component';

@Component({
    selector: 'ngs-all-lessons',
    template: `
        <div class="screen-container">
            <h2>Table Pagination</h2>
            <ngs-course url="getting-started-with-angular2"></ngs-course>
        </div>
    `,
    styleUrls: ['./all-lessons.component.scss'],
})
export class AllLessonsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

@NgModule({
    declarations: [AllLessonsComponent],
    imports: [CommonModule, SharedModule, CourseModule],
    exports: [AllLessonsComponent],
})
export class AllLessonsModule {}
