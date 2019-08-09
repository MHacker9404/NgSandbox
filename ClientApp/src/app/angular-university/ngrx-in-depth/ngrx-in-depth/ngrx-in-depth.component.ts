import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngs-ngrx-in-depth',
    template: `
        <div class="ngrx-in-depth">
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./ngrx-in-depth.component.scss'],
})
export class NgrxInDepthComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
