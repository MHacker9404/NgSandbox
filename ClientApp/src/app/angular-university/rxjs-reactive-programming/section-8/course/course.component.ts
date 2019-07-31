import { Component, NgModule, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Observable, Subject } from 'rxjs';
import { ICourse } from '../../shared/model/icourse';
import { DatastoreService } from '../datastore.service';
import { takeUntil } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';
import { LessonsListModule } from '../lessons-list/lessons-list.component';

@Component({
    selector: 'ngs-course',
    template: `
        <div class="code-md">
            <h2>{{ (course$ | async)?.description }}</h2>
            <ngs-lessons-list></ngs-lessons-list>
        </div>
    `,
    styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy {
    course$: Observable<ICourse>;
    @Input() url: string;
    private _unsubscribe$ = new Subject<void>();

    constructor(private _dataStore: DatastoreService) {}

    ngOnInit() {
        this.course$ = this._dataStore.getCourseByUrl(this.url).pipe(
            takeUntil(this._unsubscribe$),
            tag('course: course')
        );
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}

@NgModule({
    declarations: [CourseComponent],
    imports: [CommonModule, SharedModule, LessonsListModule],
    exports: [CourseComponent],
})
export class CourseModule {}
