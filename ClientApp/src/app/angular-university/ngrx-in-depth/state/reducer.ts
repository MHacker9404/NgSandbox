import { NgrxInDepthActions, NgrxInDepthActionTypes } from './actions';
import * as fromApp from 'src/app/state/index';
import * as fromParent from '../../state/reducer';

export const NgrxInDepthFeatureKey = `${fromParent.ngUniFeatureKey}:ngrxInDepth`;

export interface NgrxInDepthState extends fromApp.AppState {}

export const initialState: NgrxInDepthState = {};

export function reducer(state = initialState, action: NgrxInDepthActions): NgrxInDepthState {
    switch (action.type) {
        case NgrxInDepthActionTypes.LoadNgrxInDepths:
            return state;

        default:
            return state;
    }
}
