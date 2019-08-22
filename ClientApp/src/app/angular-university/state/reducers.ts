import { ActionReducerMap } from '@ngrx/store';
import { NgUniState, reducer as selfReducer } from './reducer';
import { reducer as ngRxInDepthReducer } from '../ngrx-in-depth/state/reducer';

export const reducers: ActionReducerMap<NgUniState> = {
    // ngUni: selfReducer,
    // ngRxInDepth: ngRxInDepthReducer,
};
