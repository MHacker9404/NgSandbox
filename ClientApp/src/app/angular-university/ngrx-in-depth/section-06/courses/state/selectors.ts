import _filter from 'lodash/filter';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCourses from './course.reducer';
import { ICourse } from '../../model/course';
import { PageQuery } from './actions';
import * as fromLessons from './lessons.reducer';
import { ILesson } from '../../model/lesson';

export const selectCoursesState = createFeatureSelector<fromCourses.CoursesState>(fromCourses.coursesFeatureKey);
export const selectLessonsState = createFeatureSelector<fromLessons.LessonsState>(fromLessons.lessonsFeatureKey);

export const selectCourseById = (courseId: number) =>
    createSelector(
        selectCoursesState,
        coursesState => coursesState.entities[courseId]
    );

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourses.selectAll
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
    (coursesState: fromCourses.CoursesState) => coursesState.allCoursesLoaded
);

export const selectAllLessons = createSelector(
    selectLessonsState,
    fromLessons.selectAll
);

export const selectLessonPage = (courseId: number, pageQuery: PageQuery) =>
    createSelector(
        selectAllLessons,
        (allLessons: ILesson[]) => {
            const start = pageQuery.pageIndex * pageQuery.pageSize,
                end = start + pageQuery.pageSize;

            return _filter(allLessons, lesson => lesson.courseId === courseId).slice(start, end);
        }
    );
