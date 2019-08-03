import { Component, NgModule, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Observable, Subject } from 'rxjs';
import { ICourse } from '../../shared/model/icourse';
import { DatastoreService } from '../datastore.service';
import { takeUntil } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';
import { LessonsListModule } from '../lessons-list/lessons-list.component';
import { LessonsPagerService } from '../lessons-pager.service';
import { ILesson } from '../../shared/model/ilesson';
import { LessonDetailModule } from '../lesson-detail/lesson-detail.component';
import { NGXLogger } from 'ngx-logger';
import { MessagesService } from '../messages.service';

@Component({
    selector: 'ngs-course',
    template: `
        <div class="code-md">
            <h2>{{ (course$ | async)?.description }}</h2>
            <div *ngIf="detail$ | async as lessonDetail; else masterTemplate">
                <div class="row nav">
                    <div class="col align-self-center">
                        <button (click)="backToMaster()">Back</button>
                        <ngs-lesson-detail [lesson]="lessonDetail"></ngs-lesson-detail>
                    </div>
                </div>
            </div>
            <ng-template #masterTemplate>
                <div class="row nav">
                    <div class="col align-self-center">
                        <button (click)="previousLessonsPage()">Previous</button>
                        <button (click)="nextLessonsPage()">Next</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <ngs-lessons-list
                            [lessons]="lessons$ | async"
                            (selected)="selectDetail($event)"
                        ></ngs-lessons-list>
                    </div>
                </div>
            </ng-template>
        </div>
    `,
    styleUrls: ['./course.component.scss'],
    providers: [LessonsPagerService],
})
export class CourseComponent implements OnInit, OnDestroy {
    @Input() url: string;

    course$: Observable<ICourse>;
    lessons$: Observable<ILesson[]>;
    detail$: Observable<ILesson>;

    private _unsubscribe$ = new Subject<void>();

    constructor(
        private _dataStore: DatastoreService,
        private _lessonsPager: LessonsPagerService,
        private _messagesService: MessagesService,
        private _log: NGXLogger
    ) {}

    ngOnInit() {
        this.course$ = this._dataStore.getCourseByUrl(this.url).pipe(
            takeUntil(this._unsubscribe$),
            tag('course: course')
        );
        this.lessons$ = this._lessonsPager.lessonsPage$.pipe(
            takeUntil(this._unsubscribe$),
            tag('courseComponent: lessonPager')
        );
        this._lessonsPager.loadFirstPage(this.url).subscribe(
            () => {},
            error => {
                this._log.error(error);
                this._messagesService.error('Could not load first page');
            }
        );
    }

    previousLessonsPage() {
        this._lessonsPager.previousPage();
    }
    nextLessonsPage() {
        this._lessonsPager.nextPage();
    }

    selectDetail(lesson: ILesson) {
        this.detail$ = this._dataStore.getLessonByUrl(this.url, lesson.url);
    }

    backToMaster() {
        this.detail$ = undefined;
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}

@NgModule({
    declarations: [CourseComponent],
    imports: [CommonModule, SharedModule, LessonsListModule, LessonDetailModule],
    exports: [CourseComponent],
})
export class CourseModule {}
