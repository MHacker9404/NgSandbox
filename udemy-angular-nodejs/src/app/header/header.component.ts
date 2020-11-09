import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isAuthenticated$: Observable<boolean>;

    constructor(private _authSvc: AuthService) {
        this.isAuthenticated$ = this._authSvc.isAuthenticated$;
    }

    public onSignOut(): void {
        this._authSvc.logout();
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
