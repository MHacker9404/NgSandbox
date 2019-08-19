import { Section03Actions, Section03ActionTypes } from './section03.actions';

export const section03FeatureKey = 'au-ngrx-section03';

export interface Section03State {}

export const initialState: Section03State = {};

export function reducer(state = initialState, action: Section03Actions): Section03State {
    switch (action.type) {
        case Section03ActionTypes.LoadSection03:
            return state;

        default:
            return state;
    }
}
