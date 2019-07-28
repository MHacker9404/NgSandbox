import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ngs-all-lessons',
    template: `
        <div class="screen-container">
            <h2>Table Pagination</h2>
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
    imports: [CommonModule],
    exports: [AllLessonsComponent],
})
export class AllLessonsModule {}
