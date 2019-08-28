import { Action } from '@ngrx/store';
import * as fromApp from 'src/app/state/index';
import * as fromParent from '../../state/reducer';
import { CourseActions } from './actions';

export const coursesFeatureKey = `${fromParent.section05FeatureKey}:courses`;

export interface CoursesState extends fromApp.AppState {
    courses: {};
}

export const initialState: CoursesState = {
    courses: {},
};

export function reducer(state: CoursesState = initialState, action: CourseActions): CoursesState {
    switch (action.type) {
        default:
            return state;
    }
}
