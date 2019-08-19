import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions } from '@ngrx/effects';
import _flatted from 'flatted';

@Injectable()
export class NgUniEffects {
    constructor(private _actions$: Actions, private _router: Router, private _route: ActivatedRoute) {}
}
