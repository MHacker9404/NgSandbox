import { Action } from '@ngrx/store';

export enum Section04ActionTypes {
    LoadSection04 = '[Section04] Load',
}

export class LoadSection04s implements Action {
    readonly type = Section04ActionTypes.LoadSection04;
}

export type Section04Actions = LoadSection04s;
