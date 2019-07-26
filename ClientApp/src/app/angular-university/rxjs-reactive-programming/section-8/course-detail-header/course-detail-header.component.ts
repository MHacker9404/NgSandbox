import { Component, NgModule, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsletterModule } from '../newsletter/newsletter.component';
import { ICourse } from '../../shared/model/icourse';
import { ILesson } from '../../shared/model/ilesson';

@Component({
    selector: 'ngs-course-detail-header',
    template: `
        <h2>{{ course?.description }}</h2>

        <h5>
            Total lessons: <span class="length-border">{{ lessons?.length }}</span>
        </h5>

        <ngs-newsletter></ngs-newsletter>
    `,
    styleUrls: ['./course-detail-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailHeaderComponent implements OnInit {
    @Input()
    course: ICourse;

    @Input()
    lessons: ILesson[];

    ngOnInit(): void {}
}

@NgModule({
    declarations: [CourseDetailHeaderComponent],
    imports: [CommonModule, SharedModule, NewsletterModule],
    exports: [CourseDetailHeaderComponent],
})
export class CourseDetailHeaderModule {}
