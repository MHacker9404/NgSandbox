import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../shared/model/icourse';
import { ILesson } from '../../shared/model/ilesson';
import { Observable, Subject } from 'rxjs';
import _cloneDeep from 'lodash/cloneDeep';
import { tag } from 'rxjs-spy/operators/tag';
import { CourseDetailHeaderModule } from '../course-detail-header/course-detail-header.component';
import { LessonsListModule } from '../lessons-list/lessons-list.component';
import { TopMenuModule } from '../top-menu/top-menu.component';
import { MessagesService } from '../../section-10/messages.service';
import { map } from 'rxjs/operators/map';
import { NGXLogger } from 'ngx-logger';
import _flatted from 'flatted';

@Component({
    selector: 'ngs-course-detail',
    template: `
        <ngs-course-detail-header [course]="course$ | async" [lessons]="lessons$ | async"></ngs-course-detail-header>

        <h2>Lessons</h2>
        <ngs-lessons-list [lessons]="lessons$ | async"></ngs-lessons-list>
    `,
    styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
    course$: Observable<ICourse>;
    lessons$: Observable<ILesson[]>;

    constructor(private _route: ActivatedRoute, private _messagesService: MessagesService, private _log: NGXLogger) {}

    ngOnInit() {
        this.course$ = this._route.data.pipe(
            map(data => _cloneDeep(data['detail'][0])),
            tag('courseDetailComponent:course$')
        );
        this.lessons$ = this._route.data.pipe(
            map(data => _cloneDeep(data['detail'][1])),
            tag('courseDetailComponent:lessons$')
        );
    }

    ngOnDestroy(): void {}
}

@NgModule({
    declarations: [CourseDetailComponent],
    imports: [CommonModule, SharedModule, TopMenuModule, CourseDetailHeaderModule, LessonsListModule],
    exports: [CourseDetailComponent],
})
export class CourseDetailModule {}
