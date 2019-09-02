import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ILesson } from '../../model/lesson';
import { CourseActions, CoursesActionTypes } from './actions';
import * as fromParent from '../../state/reducer';

export const lessonsFeatureKey = `${fromParent.section06FeatureKey}:lessons`;

export interface LessonsState extends EntityState<ILesson> {
    loading: boolean;
}

function sortByCourseAndSeqNo(l1: ILesson, l2: ILesson): number {
    const compare = l1.courseId - l2.courseId;
    if (compare !== 0) {
        return compare;
    } else {
        return l1.seqNo - l2.seqNo;
    }
}

const adapter: EntityAdapter<ILesson> = createEntityAdapter<ILesson>({
    sortComparer: sortByCourseAndSeqNo,
});

const initialState: LessonsState = adapter.getInitialState({ loading: false });

export function reducer(state: LessonsState = initialState, action: CourseActions): LessonsState {
    switch (action.type) {
        case CoursesActionTypes.LoadLessonsPage:
            return adapter.addMany(action.payload.lessons, { ...state, loading: false });

        case CoursesActionTypes.RequestLessonsPage:
            return { ...state, loading: true };

        case CoursesActionTypes.CancelLessonsPage:
            return { ...state, loading: false };

        default: {
            return state;
        }
    }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
