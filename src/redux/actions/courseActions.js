import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import beginApiCall from './apiStatusActions';
import { apiCallError } from './apiStatusActions';

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
            dispatch(apiCallError());
            throw error;
        });
    }
};

export const saveCourse = (course) => {
    return function(dispatch) {
       // console.log("Thunk called");
        //console.log("course", course);
        dispatch(beginApiCall());
        return courseApi
        .saveCourse(course)
        .then(savedCourse => {
            //console.log("In save course then");
            //console.log("Saved course", savedCourse);
            if(course.id){
                dispatch(updateCourseSuccess(savedCourse))
            } else {
                //console.log("dispatching createCourseSuccess");
                dispatch(createCourseSuccess(savedCourse));
            }
        })
        .catch(error => {
            dispatch(apiCallError());
            throw error;
        });
    };
};
