import { Component, NgModule, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILesson } from '../../shared/model/ilesson';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'ngs-lesson-detail',
    template: `
        <h3>{{ lesson?.description }}</h3>
        <h5>Duration: {{ lesson?.duration }}</h5>

        <iframe
            *ngIf="lesson?.videoUrl"
            width="260"
            height="150"
            frameborder="0"
            allowfullscreen
            [src]="lesson?.videoUrl | safeUrl"
        >
        </iframe>

        <h5>Description</h5>
        <p>{{ lesson?.longDescription }}</p>

        <div class="lessons-nav">
            <button>Edit</button>
        </div>
    `,
    styleUrls: ['./lesson-detail.component.scss'],
})
export class LessonDetailComponent implements OnInit {
    @Input() lesson: ILesson;
    constructor() {}

    ngOnInit() {}
}

@NgModule({
    declarations: [LessonDetailComponent],
    imports: [CommonModule, SharedModule],
    exports: [LessonDetailComponent],
})
export class LessonDetailModule {}
