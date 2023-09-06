import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import beginApiCall from './apiStatusActions';

export const createCourseSuccess = (course) => {
    return {
        type: types.CREATE_COURSE_SUCCESS, 
        course
    };
}

export const updateCourseSuccess = (course) => {
    return {
        type: types.UPDATE_COURSE_SUCCESS,
        course
    };
}

export const loadCoursesSuccess = (courses) => {
    return {type: types.LOAD_COURSES_SUCCESS, courses};
} 

export const loadCourses = () => {
    return function(dispatch) {
        dispatch(beginApiCall());
        return courseApi.getCourses()
        .then(courses => {
            dispatch(loadCoursesSuccess(courses));
        })
        .catch(error => {
            throw error;
        });
    }
};

export const saveCourse = (course) => {
    return function(dispatch) {
        dispatch(beginApiCall());
        return courseApi
        .saveCourse(course)
        .then(course => {
            course.id ? dispatch(updateCourseSuccess(course)) :
            dispatch(createCourseSuccess(course));
        })
        .catch(error => {
            throw error;
        });
    };
};
