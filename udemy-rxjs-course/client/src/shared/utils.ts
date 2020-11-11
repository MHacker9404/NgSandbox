import { Observable, Subscriber } from 'rxjs';

export function httpObservable(url: string): Observable<any> {
    const http$: Observable<any> = new Observable((subscriber: Subscriber<any>) => {
        fetch(url)
            .then((response) => {
                // console.info(response);
                return response.json();
            })
            .then((json) => {
                // console.info(json);
                subscriber.next(json);
                subscriber.complete();
            })
            .catch((error) => {
                subscriber.error(error);
            });
    });
    return http$;
}
