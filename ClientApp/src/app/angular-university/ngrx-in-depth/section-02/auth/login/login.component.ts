import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AppState } from '../../../reducers';
import { Login } from '../auth.actions';

@Component({
    selector: 'login',
    template: `
        <mat-card class="login-page">
            <mat-card-title>Login</mat-card-title>
            <mat-card-content>
                <form [formGroup]="form" class="login-form">
                    <mat-form-field>
                        <input matInput type="email" placeholder="Email" formControlName="email" />
                    </mat-form-field>

                    <mat-form-field>
                        <input matInput type="password" placeholder="Password" formControlName="password" />
                    </mat-form-field>

                    <button mat-raised-button color="primary" (click)="login()" [disabled]="!form.valid">Login</button>
                </form>
            </mat-card-content>
        </mat-card>
    `,
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private _state$: Store<AppState>
    ) {
        this.form = fb.group({
            email: ['test@angular-university.io', [Validators.required]],
            password: ['test', [Validators.required]],
        });
    }

    ngOnInit() {}

    login() {
        this._state$.dispatch(new Login());
    }
}
