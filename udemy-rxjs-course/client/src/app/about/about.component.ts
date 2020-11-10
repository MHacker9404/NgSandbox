import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, Observable, Subscriber, timer } from 'rxjs';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        const http$: Observable<any> = new Observable((subscriber: Subscriber<any>) => {
            fetch('http://localhost:3000/api/courses')
                .then((response) => {
                    console.info(response);
                    return response.json();
                })
                .then((json) => {
                    console.info(json);
                    subscriber.next(json);
                    subscriber.complete();
                })
                .catch((error) => {
                    subscriber.error(error);
                });
        });
        const sub = http$.subscribe(
            (courses) => console.info(courses),
            (error) => console.error(error),
            () => console.info('completed')
        );
        setTimeout(() => sub.unsubscribe(), 2000);
    }
}
