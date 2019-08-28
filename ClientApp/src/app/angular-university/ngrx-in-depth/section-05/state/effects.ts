import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators/tap';
import _flatted from 'flatted';
import { defer, of } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class CourseEffects {
    constructor(private _log: NGXLogger) {}
}
