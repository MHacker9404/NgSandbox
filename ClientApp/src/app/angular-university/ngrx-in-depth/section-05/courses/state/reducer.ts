import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import _deepClone from 'lodash/clone';

import { ICourse } from '../../model/course';
import * as fromParent from '../../state/reducer';
import { CourseActions, CoursesActionTypes } from './actions';
export const coursesFeatureKey = `${fromParent.section05FeatureKey}:courses`;

export interface CoursesState extends EntityState<ICourse> {
    allCoursesLoaded: boolean;
}

const adapter: EntityAdapter<ICourse> = createEntityAdapter<ICourse>();

const initialState: CoursesState = adapter.getInitialState({ allCoursesLoaded: false });

export function reducer(state: CoursesState = initialState, action: CourseActions): CoursesState {
    switch (action.type) {
        case CoursesActionTypes.LoadCourse: {
            const course = _deepClone(action.payload.course);
            return adapter.addOne(course, state);
        }

        case CoursesActionTypes.RequestCourse: {
            return state;
        }

        case CoursesActionTypes.LoadAllCourses: {
            const courses = _deepClone(action.payload.courses);
            return adapter.addAll(courses, { ...state, allCoursesLoaded: true });
        }

        case CoursesActionTypes.SaveCourse: {
            return adapter.updateOne(action.payload.course, state);
        }

        default: {
            return state;
        }
    }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

// export interface CoursesState extends fromApp.AppState {
// courses: {
//     entities: { [key: number]: ICourse };
//     order: number[];
// };
// }
