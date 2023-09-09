import React from "react";
import {ManageCoursesPage} from './ManageCoursesPage';
import {mount} from 'enzyme';
import { courses, newCourse, authors } from "../../../tools/mockData";

function render(args) {
    const defaultProps = {
        history: {},
        match: {},
        courses,
        authors,
        loadCourses: jest.fn(),
        saveCourse: jest.fn(),
        loadAuthors: jest.fn(),
        course: newCourse
    };

    const props = {...defaultProps, ...args};

    return mount(<ManageCoursesPage {...props} />);
}

it("Should display an error when the form is submitted empty", () => {
    const wrapper = render();
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('.alert').first().text()).toBe('Title is required!');
})