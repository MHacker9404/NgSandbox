import { Section04Actions, Section04ActionTypes } from './section04.actions';

export const section04FeatureKey = 'au-ngrx-section04';

export interface Section04State {}

export const initialState: Section04State = {};

export function reducer(state = initialState, action: Section04Actions): Section04State {
    switch (action.type) {
        case Section04ActionTypes.LoadSection04:
            return state;

        default:
            return state;
    }
}
