import _filter from 'lodash/filter';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSelf from './reducer';
import { ICourse } from '../../model/course';

export const selectCoursesState = createFeatureSelector<fromSelf.CoursesState>(fromSelf.coursesFeatureKey);

export const selectCourseById = (courseId: number) =>
    createSelector(
        selectCoursesState,
        coursesState => coursesState.entities[courseId]
    );

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromSelf.selectAll
);

export const selectBeginnersCourses = createSelector(
    selectAllCourses,
    (courses: ICourse[]) => _filter(courses, course => course.category === 'BEGINNER')
);

export const selectIntermediateCourses = createSelector(
    selectAllCourses,
    (courses: ICourse[]) => _filter(courses, course => course.category === 'INTERMEDIATE')
);

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    (courses: ICourse[]) => _filter(courses, course => course.category === 'ADVANCED')
);

export const selectPromoCount = createSelector(
    selectAllCourses,
    (courses: ICourse[]) => _filter(courses, course => course.promo === true).length
);

export const allCoursesLoaded = createSelector(
    selectCoursesState,
    (coursesState: fromSelf.CoursesState) => coursesState.allCoursesLoaded
);
