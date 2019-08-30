import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import _deepClone from 'lodash/clone';

import { ICourse } from '../../model/course';
import * as fromParent from '../../state/reducer';
import { CourseActions, CoursesActionTypes } from './actions';
export const coursesFeatureKey = `${fromParent.section05FeatureKey}:courses`;

export interface CoursesState extends EntityState<ICourse> {}

const adapter: EntityAdapter<ICourse> = createEntityAdapter<ICourse>();

const initialState: CoursesState = adapter.getInitialState();

export function reducer(state: CoursesState = initialState, action: CourseActions): CoursesState {
    switch (action.type) {
        case CoursesActionTypes.LoadCourse: {
            const course = _deepClone(action.payload.course);
            return adapter.addOne(course, state);
        }

        case CoursesActionTypes.RequestCourse: {
            return state;
        }

        default: {
            return state;
        }
    }
}

// export interface CoursesState extends fromApp.AppState {
// courses: {
//     entities: { [key: number]: ICourse };
//     order: number[];
// };
// }

// export const initialState: CoursesState = {
//     courses: {
//         entities: {},
//         order: [],
//     },
// };
