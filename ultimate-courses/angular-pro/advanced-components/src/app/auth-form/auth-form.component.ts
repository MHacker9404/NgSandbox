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
    ElementRef,
    Renderer2,
} from '@angular/core';
import { AuthRememberComponent } from './auth-remember/auth-remember.component';
import { AuthMessageComponent } from './auth-message/auth-message.component';

import { User } from './auth-form.interface';

@Component({
    selector: 'auth-form',
    styles: [
        `
            .email {
                border-color: #9f72e6;
            }
        `,
    ],
    template: `
        <div>
            <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
                <ng-content select="h3"></ng-content>
                <label>
                    Email address
                    <input #email type="email" name="email" ngModel />
                </label>
                <label>
                    Password
                    <input type="password" name="password" ngModel />
                </label>
                <ng-content select="app-auth-remember"></ng-content>
                <prb-auth-message [style.display]="showMessage ? 'inherit' : 'none'"></prb-auth-message>
                <prb-auth-message [style.display]="showMessage ? 'inherit' : 'none'"></prb-auth-message>
                <ng-content select="button"></ng-content>
            </form>
        </div>
    `,
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {
    @Output() submitted: EventEmitter<User> = new EventEmitter<User>();
    //  for content projected into component
    @ContentChildren(AuthRememberComponent)
    remember: QueryList<AuthRememberComponent> | undefined;
    @ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent> | undefined;
    @ViewChild('email') email: ElementRef | undefined;

    constructor(private _cd: ChangeDetectorRef, private _renderer: Renderer2) {}

    showMessage: boolean = false;

    onSubmit(value: User) {
        this.submitted.emit(value);
    }

    //  for content projected into component
    ngAfterContentInit(): void {
        if (this.remember) {
            // this.remember.checked.subscribe((checked: boolean) => (this.showMessage = checked));
            this.remember.forEach((item: AuthRememberComponent) =>
                item.checked.subscribe((checked: boolean) => (this.showMessage = checked))
            );
        }
    }

    ngAfterViewInit(): void {
        // console.debug(this.email?.nativeElement);
        // this.email?.nativeElement.setAttribute('placeholder', 'Enter your email address');
        // this.email?.nativeElement.classList.add('email');
        // this.email?.nativeElement.focus();
        // this._renderer.setAttribute(this.email, 'placeholder', 'Enter your email address');
        // this._renderer.addClass(this.email, 'email');

        if (this.message) {
            // setTimeout(() => {
            //     this.message!.forEach((message: AuthMessageComponent) => (message.days = 30));
            // });
            this.message!.forEach((message: AuthMessageComponent) => (message.days = 30));
            this._cd.detectChanges();
        }
    }
}
