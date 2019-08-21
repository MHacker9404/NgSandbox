import { NgrxInDepthActions, NgrxInDepthActionTypes } from './actions';

export const NgrxInDepthFeatureKey = 'ngrxInDepth';

export interface NgrxInDepthState {}

export const initialState: NgrxInDepthState = {};

export function reducer(state = initialState, action: NgrxInDepthActions): NgrxInDepthState {
    switch (action.type) {
        case NgrxInDepthActionTypes.LoadNgrxInDepths:
            return state;

        default:
            return state;
    }
}
