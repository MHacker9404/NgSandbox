import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { DatastoreService } from '../datastore.service';
import { ICourse } from '../../shared/model/icourse';
import { ILesson } from '../../shared/model/ilesson';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap, switchMap } from 'rxjs/operators';
import _find from 'lodash/find';
import _cloneDeep from 'lodash/cloneDeep';
import { tag } from 'rxjs-spy/operators/tag';
import { CourseDetailHeaderModule } from '../course-detail-header/course-detail-header.component';
import { NewsletterService } from '../newsletter.service';
import { UserService } from '../user.service';
import { LessonsListModule } from '../lessons-list/lessons-list.component';

@Component({
    selector: 'ngs-course-detail',
    template: `
        <ngs-course-detail-header
            [course]="course$ | async"
            [lessons]="lessons$ | async"
            [firstName]="(_userService.user$ | async).firstName"
            (subscribe)="onSubscribe($event)"
        ></ngs-course-detail-header>

        <h2>Lessons</h2>
        <ngs-lessons-list [lessons]="lessons$ | async"></ngs-lessons-list>

        <ng-template #lessonsLoading>
            <div>Loading ...</div>
        </ng-template>
    `,
    styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
    course$: Observable<ICourse>;
    lessons$: Observable<ILesson[]>;
    private _unsubscribe$ = new Subject<void>();

    //   course: ICourse;
    //   lessons: ILesson[];
    constructor(
        private _route: ActivatedRoute,
        private _dataStore: DatastoreService,
        private _newsLetter: NewsletterService,
        public _userService: UserService
    ) {}

    ngOnInit() {
        this.course$ = this._route.params.pipe(
            takeUntil(this._unsubscribe$),
            switchMap(params =>
                this._dataStore.findCourseByUrl(params['id']).pipe(
                    takeUntil(this._unsubscribe$),
                    tag('course-detail: course')
                )
            ),
            tag('course-detail: route-params')
        );

        this.lessons$ = this.course$.pipe(
            switchMap((course: ICourse) =>
                this._dataStore.findLessonsForCourse(course.url).pipe(
                    takeUntil(this._unsubscribe$),
                    tag('course-detail: lessons')
                )
            )
        );
    }

    onSubscribe(email: string) {
        this._newsLetter.subscribeToNewsletter(email).subscribe(response => {
            console.log(response);
            alert(`Subscription successful ...${response.email}`);
        }, console.error);
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}

@NgModule({
    declarations: [CourseDetailComponent],
    imports: [CommonModule, SharedModule, CourseDetailHeaderModule, LessonsListModule],
    exports: [CourseDetailComponent],
})
export class CourseDetailModule {}
