import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngs-browser-events',
    template: `
        <div class="course-container">
            <h2>Browser Events</h2>
            <div id="_hover" class="hover-me"></div>
        </div>
    `,
    styles: [],
})
export class BrowserEventsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
