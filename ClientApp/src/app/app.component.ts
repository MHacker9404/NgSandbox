import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'ngs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    loadingRouteConfig: boolean;
    title = 'ClientApp';
    constructor(private router: Router, private _log: NGXLogger) {}

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart) {
                // this._log.trace('Loading Route Config');
                this.loadingRouteConfig = true;
            } else if (event instanceof RouteConfigLoadEnd) {
                // this._log.trace('Loading Route Config Dun');
                this.loadingRouteConfig = false;
            }
        });
    }
}
