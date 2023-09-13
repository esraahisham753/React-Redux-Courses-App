import courseReducer from "./courseReducer";
import * as courseAction from '../actions/courseActions';

describe("Test course reducer", () => {
    it("Should add new course after addCourseSuccess", () => {
        const initialState = [
            {
                title: 'A'
            },
            {
                title: 'B'
            }
        ];

        const course = {title: 'C'};
        const action = courseAction.createCourseSuccess(course);
        const newState = courseReducer(initialState, action);

        expect(newState.length).toBe(3);
        expect(newState[0].title).toEqual('A');
        expect(newState[1].title).toEqual('B');
        expect(newState[2].title).toEqual('C');
    });

    it("Should update course when update course success", () => {
        const initialState = [
            {id: 1, title: 'A'},
            {id: 2, title: 'B'},
            {id: 3, title: 'C'}
        ];

        const course = {id: 1, title: 'new title'};
        const action = courseAction.updateCourseSuccess(course);
        const newState = courseReducer(initialState, action);

        expect(newState.length).toEqual(3);
        expect(newState[0].title).toEqual('new title');
        expect(newState[1].title).toEqual('B');
    });
});