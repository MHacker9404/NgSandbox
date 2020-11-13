import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent implements OnInit, AfterViewInit, OnDestroy {
    form: FormGroup;
    course: Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

    private _sub: Subscription;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: Course
    ) {
        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required],
        });
    }
    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    ngOnInit() {
        // this._sub = this.form.valueChanges.pipe(filter(() => this.form.valid)).subscribe((changes) => {
        this._sub = this.form.valueChanges
            .pipe(
                filter(() => this.form.valid),
                concatMap((changes: any) => this._saveCourses(changes))
            )
            // .subscribe((changes) => {
            //     const saveCourses$ = this._saveCourses(changes);
            //     this._sub = saveCourses$.subscribe();
            // });
            .subscribe();
    }

    private _saveCourses(changes): Observable<Response> {
        return fromPromise(
            fetch(
                `http://localhost:3000/api/courses/${this.course.id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(changes),
                    headers: {
                        'content-type': 'application/json',
                    },
                }
                // .then((response) => response.json())
                // .then((data) => console.info(data));
            )
        );
    }

    ngAfterViewInit() {}

    close() {
        this._sub.unsubscribe();
        this.dialogRef.close();
    }
}
