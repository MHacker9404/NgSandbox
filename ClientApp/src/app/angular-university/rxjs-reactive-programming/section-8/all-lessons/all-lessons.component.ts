import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseModule } from '../course/course.component';

@Component({
    selector: 'ngs-all-lessons',
    template: `
        <div class="screen-container">
            <div class="row">
                <div class="col">
                    <h2>Table Pagination</h2>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <ngs-course url="getting-started-with-angular2"></ngs-course>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <ngs-course url="angular2-http"></ngs-course>
                </div>
            </div>
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
