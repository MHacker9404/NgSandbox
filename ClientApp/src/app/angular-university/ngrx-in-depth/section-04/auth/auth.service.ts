import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable()
export class AuthService {
    constructor(private _http: HttpClient) {}

    login(email: string, password: string): Observable<User> {
        return this._http.post<User>('/api/ngrx/login', { email, password });
    }
}
