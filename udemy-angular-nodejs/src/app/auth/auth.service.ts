import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _token: string;
    public get token(): string {
        return this._token;
    }

    private _token$ = new BehaviorSubject<boolean>(false);
    public get isAuthenticated$(): Observable<boolean> {
        return this._token$.asObservable();
    }

    constructor(private _httpClient: HttpClient, private _router: Router) {}

    public createUser(email: string, password: string) {
        const user: AuthData = { email: email, password: password };
        this._httpClient.post<any>(`${environment.apiDomain}/api/auth/signup`, user).subscribe((result) => {
            console.info(result);
            this._router.navigate([`/login`]);
        });
    }

    private _tokenTimer: number;
    public loginUser(email: string, password: string) {
        const user: AuthData = { email: email, password: password };
        this._httpClient
            .post<{ token: string; expiresIn: number }>(`${environment.apiDomain}/api/auth/login`, user)
            .subscribe((result) => {
                console.info(result);
                this._token = result.token;
                if (this._token) {
                    this._tokenTimer = window.setTimeout(() => {
                        this.logout();
                    }, result.expiresIn * 1000);
                    this._token$.next(true);

                    const now = new Date();
                    const expiration = new Date(now.getTime() + result.expiresIn * 1000);
                    this.saveAuthData(this._token, expiration);

                    this._router.navigate([`/`]);
                }
            });
    }

    public logout(): void {
        this._token = null;
        window.clearTimeout(this._tokenTimer);
        this.clearAuthData();
        this._token$.next(false);
        this._router.navigate([`/`]);
    }

    private saveAuthData(token: string, expDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expDate', expDate.toISOString());
    }
    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expDate');
    }
}
