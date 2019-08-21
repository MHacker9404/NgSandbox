import { ActionReducerMap } from '@ngrx/store';
import * as fromSelf from './reducer';
import * as fromParent from 'src/app/state/index';

export const ngUniFeatureKey = 'ngUni';
export interface NgUniState {
    ngUni: {};
}

export interface State extends fromParent.AppState {
    ngUni: NgUniState;
}

export const reducers: ActionReducerMap<NgUniState> = {
    ngUni: fromSelf.reducer,
};
