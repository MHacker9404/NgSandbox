import { Component, NgModule, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsletterService } from '../newsletter.service';
import { takeUntil, tap, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { tag } from 'rxjs-spy/operators';
import { UserService } from '../user.service';

@Component({
    selector: 'ngs-newsletter',
    template: `
        <fieldset class="newsletter">
            <legend>Newsletter</legend>

            <h5>Hello {{ firstName$ | async }}, enter your email below to subscribe:</h5>

            <form>
                <input #email type="email" name="email" placeholder="Enter your Email" />
                <input
                    type="button"
                    class="button button-primary"
                    value="Subscribe"
                    (click)="onSubscribe(email.value)"
                />
            </form>
        </fieldset>
    `,
    styleUrls: ['./newsletter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsletterComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();
    public firstName$: Observable<string>;

    constructor(private _newsLetter: NewsletterService, public _userService: UserService) {}

    ngOnInit() {
        this.firstName$ = this._userService.user$.pipe(
            map(user => user.firstName),
            tag('newsletter: firstName')
        );
    }

    onSubscribe(emailField: any) {
        this._newsLetter
            .subscribeToNewsletter(emailField.value)
            .pipe(
                takeUntil(this._unsubscribe$),
                tap(console.log),
                tap(response => alert(`Subscription successful ...${response.email}`)),
                tap(() => (emailField.value = '')),
                tag('newsletter: subscribeToNewsletter')
            )
            .subscribe();
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}

@NgModule({
    declarations: [NewsletterComponent],
    imports: [CommonModule, SharedModule],
    exports: [NewsletterComponent],
    providers: [NewsletterService],
})
export class NewsletterModule {}
