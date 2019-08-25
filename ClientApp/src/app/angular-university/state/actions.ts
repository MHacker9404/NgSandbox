import { Action } from '@ngrx/store';

export enum NgUniActionTypes {
    LoadNgUnis = '[NgUni] Load',
}

export class LoadNgUnis implements Action {
    readonly type = NgUniActionTypes.LoadNgUnis;
}

export type NgUniActions = LoadNgUnis;
