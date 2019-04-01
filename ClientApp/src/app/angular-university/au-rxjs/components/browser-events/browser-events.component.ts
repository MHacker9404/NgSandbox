import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngs-browser-events',
    template: `
        <div class="course-container">
            <h2>Browser Events</h2>
            <div id="_hover" class="hover-me"></div>
            <button class="btn btn-primary btn-sm" (click)="unsubscribe()">Unsubscribe</button>
        </div>
    `,
    styleUrls: ['../../au-rxjs.component.scss'],
})
export class BrowserEventsComponent implements OnInit {
    _hoverSection: HTMLElement;

    constructor() {}

    ngOnInit() {
        this._hoverSection = document.getElementById('_hover');

        this._hoverSection.addEventListener('mousemove', onMouseMove);
    }

    unsubscribe() {
        this._hoverSection.removeEventListener('mousemove', onMouseMove);
    }
}

function onMouseMove(event: MouseEvent) {
    console.log(event);
}
