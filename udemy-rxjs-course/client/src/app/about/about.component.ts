import { Component, OnInit } from '@angular/core';
import { concat, of } from 'rxjs';
import { httpObservable } from 'src/shared/utils';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        const source1$ = of(1, 2, 3);
        const source2$ = of(4, 5, 6);

        // const concat$ = source1$.pipe(concatMap(() => source2$));
        // const sub = concat$.subscribe((value) => console.info(value));
        const sub = concat(source1$, source2$).subscribe(
            (value) => console.info(value),
            (err) => {},
            () => console.info('complete')
        );
        setTimeout(() => sub.unsubscribe(), 5000);
    }
}
