import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';
import { tag } from 'rxjs-spy/operators/tag';
import storage from 'session-storage-json';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
    selector: 'ngs-create-lesson',
    template: `
        <h2>Create New Lesson</h2>
        <form [formGroup]="myForm" autocomplete="off" class="lesson-form">
            <fieldset>
                <legend>Lesson</legend>
                <div class="form-field">
                    <label>Description:</label>
                    <input name="title" formControlName="description" />
                </div>
                <div class="form-field">
                    <label>Lesson Url:</label>
                    <input name="title" formControlName="url" />
                </div>
                <div class="form-field">
                    <label>Long Description:</label>
                    <textarea name="description" formControlName="longDescription"></textarea>
                </div>
            </fieldset>

            <div class="form-buttons">
                <button class="btn btn-primary">Save New Lesson</button>
            </div>
        </form>
    `,
    styleUrls: ['./create-lesson.component.scss'],
})
export class CreateLessonComponent implements OnInit, OnDestroy {
    myForm: FormGroup;
    private _unsubscribe$ = new Subject<void>();

    constructor(private _fb: FormBuilder, private _log: NGXLogger) {
        this.myForm = this._fb.group({
            description: ['', Validators.required],
            url: ['', Validators.required],
            longDescription: [''],
        });
    }

    ngOnInit() {
        const draft = storage.get('myForm');
        if (draft) {
            this.myForm.setValue(draft);
        }

        this.myForm.valueChanges
            .pipe(
                takeUntil(this._unsubscribe$),
                filter(() => this.myForm.valid),
                tap(valiidValue => this._log.trace(valiidValue)),
                tap(validValue => storage.set('myForm', validValue)),
                tag('createLesson:myFrom.valueChanges')
            )
            .subscribe();
    }
    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}

@NgModule({
    declarations: [CreateLessonComponent],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [CreateLessonComponent],
})
export class CreateLessonModule {}
