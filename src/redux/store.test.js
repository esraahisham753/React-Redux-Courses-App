
import initialState from "./initialState";
import { createStore } from "redux";
import * as courseActions from './actions/courseActions';
import rootReducer from './reducers';

it("Should add new course to store when create course success ", () => {
    const store = createStore(rootReducer, initialState);
    const course = {
        title: "new course"
    };

    store.dispatch(courseActions.createCourseSuccess(course));

    expect(store.getState().courses.length).toBe(1);
    expect(store.getState().courses[0].title).toEqual("new course");
});