import * as coursesActions from './courseActions';
import * as types from './actionTypes';
import {courses} from '../../../tools/mockData';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Async actions", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    describe("Load courses thunk", () => {
        it("Should create begin api call and load courses success when load courses", () => {
            fetchMock.mock('*', {
                body: courses,
                headers: {"content-type": "application/json"}
            });

            const expectedActions = [
                {type: types.BEGIN_API_CALL},
                {type: types.LOAD_COURSES_SUCCESS, courses}
            ];

            const store = mockStore({courses: []});
            
        })
    })
})

describe("createCourseSuccess action test", () => {
    it("Should return the correct object of createCourseSuccess action", () => {
        const course = courses[0];
        const expectedAction = {
            type: types.CREATE_COURSE_SUCCESS,
            course
        };

        const action = coursesActions.createCourseSuccess(course);
        expect(action).toEqual(expectedAction);
    });
})