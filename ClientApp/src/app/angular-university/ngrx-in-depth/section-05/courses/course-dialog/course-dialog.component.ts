import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { ICourse } from '../../model/course';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent implements OnInit {
    courseId: number;

    form: FormGroup;
    description: string;

    constructor(
        private coursesService: CoursesService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: ICourse
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

        this.coursesService.saveCourse(this.courseId, changes).subscribe(() => this.dialogRef.close());
    }

    close() {
        this.dialogRef.close();
    }
}
