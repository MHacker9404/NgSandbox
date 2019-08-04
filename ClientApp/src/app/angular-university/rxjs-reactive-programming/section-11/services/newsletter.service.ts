import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tag } from 'rxjs-spy/operators';

@Injectable({
    providedIn: null,
})
export class NewsletterService {
    constructor(private http: HttpClient) {}

    subscribeToNewsletter(email: string): Observable<any> {
        return this.http.post('/api/newsletter', { email }).pipe(tag('newsLetterService: subscribe'));
    }
}
