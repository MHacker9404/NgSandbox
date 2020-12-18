import { Component, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { AuthRememberComponent } from './auth-remember/auth-remember.component';

import { User } from './auth-form.interface';

@Component({
    selector: 'auth-form',
    template: `
        <div>
            <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
                <ng-content select="h3"></ng-content>
                <label>
                    Email address
                    <input type="email" name="email" ngModel />
                </label>
                <label>
                    Password
                    <input type="password" name="password" ngModel />
                </label>
                <ng-content select="app-auth-remember"></ng-content>
                <div *ngIf="showMessage">You will be logged in for 30 days</div>
                <ng-content select="button"></ng-content>
            </form>
        </div>
    `,
})
export class AuthFormComponent implements AfterContentInit {
    @Output() submitted: EventEmitter<User> = new EventEmitter<User>();
    @ContentChildren(AuthRememberComponent)
    remember: QueryList<AuthRememberComponent> | undefined;

    showMessage: boolean = false;

    onSubmit(value: User) {
        this.submitted.emit(value);
    }

    ngAfterContentInit(): void {
        if (this.remember) {
            // this.remember.checked.subscribe((checked: boolean) => (this.showMessage = checked));
            this.remember.forEach((item: AuthRememberComponent) =>
                item.checked.subscribe((checked: boolean) => (this.showMessage = checked))
            );
        }
    }
}
