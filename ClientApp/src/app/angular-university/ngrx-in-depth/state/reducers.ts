import { ActionReducerMap } from '@ngrx/store';
import { NgrxInDepthState, reducer } from './reducer';

export const reducers: ActionReducerMap<NgrxInDepthState> = {
    ngRxInDepth: reducer,
};
