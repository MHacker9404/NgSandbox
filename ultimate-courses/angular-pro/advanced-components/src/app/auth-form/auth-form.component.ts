import {
    Component,
    Output,
    EventEmitter,
    ContentChildren,
    QueryList,
    AfterContentInit,
    ViewChild,
    AfterViewInit,
    ViewChildren,
    ChangeDetectorRef,
} from '@angular/core';
import { AuthRememberComponent } from './auth-remember/auth-remember.component';
import { AuthMessageComponent } from './auth-message/auth-message.component';

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
                <prb-auth-message [style.display]="showMessage ? 'inherit' : 'none'"></prb-auth-message>
                <prb-auth-message [style.display]="showMessage ? 'inherit' : 'none'"></prb-auth-message>
                <prb-auth-message [style.display]="showMessage ? 'inherit' : 'none'"></prb-auth-message>
                <ng-content select="button"></ng-content>
            </form>
        </div>
    `,
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {
    @Output() submitted: EventEmitter<User> = new EventEmitter<User>();
    @ContentChildren(AuthRememberComponent)
    remember: QueryList<AuthRememberComponent> | undefined;
    @ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent> | undefined;

    constructor(private _cd: ChangeDetectorRef) {}

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

    ngAfterViewInit(): void {
        if (this.message) {
            // setTimeout(() => {
            //     this.message!.forEach((message: AuthMessageComponent) => (message.days = 30));
            // });
            this.message!.forEach((message: AuthMessageComponent) => (message.days = 30));
            this._cd.detectChanges();
        }
    }
}
