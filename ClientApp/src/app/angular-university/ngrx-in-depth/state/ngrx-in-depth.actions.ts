import { Action } from '@ngrx/store';

export enum NgrxInDepthActionTypes {
    LoadNgrxInDepths = '[NgrxInDepth] Load',
}

export class LoadNgrxInDepths implements Action {
    readonly type = NgrxInDepthActionTypes.LoadNgrxInDepths;
}

export type NgrxInDepthActions = LoadNgrxInDepths;
