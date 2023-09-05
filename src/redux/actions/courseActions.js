import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';

export const createCourse = (course) => {
    return {
        type: types.CREATE_COURSE,
        course
    };
};

export const loadCoursesSuccess = (courses) => {
    return {type: types.LOAD_COURSES_SUCCESS, courses};
} 

export const loadCourses = () => {
    return function(dispatch) {
        courseApi.getCourses()
        .then(courses => {
            dispatch(loadCoursesSuccess(courses));
        })
        .catch(error => {
            throw error;
        });
    }
};
