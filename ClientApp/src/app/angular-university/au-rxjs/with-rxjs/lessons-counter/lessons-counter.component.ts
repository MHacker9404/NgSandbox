import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILesson } from '../../shared/model/ilesson';
import { SharedModule } from 'src/app/shared/shared.module';
import { store } from '../app-data';
import { Observer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'ngs-lessons-counter',
    template: `
        <p>Total Lessons: {{ lessonsCounter }}</p>
    `,
    styleUrls: ['./lessons-counter.component.scss'],
})
export class LessonsCounterComponent implements OnInit {
    lessonsCounter = 0;
    constructor() {}

    ngOnInit() {
        store.lessonsList$.pipe(tap((lessons: ILesson[]) => (this.lessonsCounter = lessons.length))).subscribe();
    }
}

@NgModule({
    declarations: [LessonsCounterComponent],
    imports: [CommonModule, SharedModule],
    exports: [LessonsCounterComponent],
})
export class LessonsCounterModule {}
