import { Component, Inject, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { ICourse } from '../../model/course';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state';
import { SaveCourse } from '../state/actions';
import { Update } from '@ngrx/entity';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators/tap';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent implements OnInit, OnDestroy {
    courseId: number;

    form: FormGroup;
    description: string;

    constructor(
        private coursesService: CoursesService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: ICourse,
        private _state$: Store<AppState>
    ) {
        this.courseId = course.id;

        this.description = course.description;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            longDescription: [course.longDescription, Validators.required],
            promo: [course.promo, []],
        });
    }

    ngOnInit() {}

    save() {
        const changes = this.form.value;

        this.coursesService
            .saveCourse(this.courseId, changes)
            .pipe(
                tap(() => {
                    const course: Update<ICourse> = {
                        id: this.courseId,
                        changes: changes,
                    };
                    this._state$.dispatch(new SaveCourse({ course }));
                }),
                tap(() => this.dialogRef.close())
            )
            .subscribe();
    }

    close() {
        this.dialogRef.close();
    }

    ngOnDestroy() {}
}
