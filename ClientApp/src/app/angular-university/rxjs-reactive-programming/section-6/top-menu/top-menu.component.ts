import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, UNKNOWN_USER } from '../user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../../shared/model/IUser';
import { map, takeUntil } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators/tag';

@Component({
    selector: 'ngs-top-menu',
    template: `
        <header class="l-header">
            <ul class="nav nav-pills justify-content-center">
                <li class="nav-item">
                    <a class="nav-link" routerLink="./" routerLinkActive="menu-active">Home</a>
                </li>
                <li class="nav-item" *ngIf="!(isLoggedIn$ | async)">
                    <a class="nav-link" routerLinkActive="menu-active" routerLink="login">Login</a>
                </li>
                <li class="nav-item" *ngIf="isLoggedIn$ | async">
                    <a class="nav-link" (click)="logout()">Logout</a>
                </li>
            </ul>
        </header>
    `,
    styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();

    isLoggedIn$: Observable<boolean>;

    constructor(private _userService: UserService) {}

    ngOnInit() {
        this.isLoggedIn$ = this._userService.user$.pipe(
            takeUntil(this._unsubscribe$),
            map((user: IUser) => user !== UNKNOWN_USER),
            tag('top-menu: isLoggedIn')
        );
    }

    logout() {}

    ngOnDestroy(): void {
        this._unsubscribe$.next();
    }
}

@NgModule({
    declarations: [TopMenuComponent],
    imports: [RouterModule, CommonModule, SharedModule],
    exports: [TopMenuComponent],
})
export class TopMenuModule {}
