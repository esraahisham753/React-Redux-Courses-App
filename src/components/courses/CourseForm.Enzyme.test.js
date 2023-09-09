import React from "react";
import CourseForm from './CourseForm';
import {shallow} from 'enzyme';

function renderCourseForm(args) {
    const defaultProps = {
        course: {},
        authors: [],
        onChange: () => {},
        onSave: () => {},
        saving: false,
        errors: {}
    };
    const props = {...defaultProps, ...args};

    return shallow(<CourseForm {...props} />);
}

it("Should render a form and a header", () => {
    const wrapper = renderCourseForm();
    //console.log(wrapper.debug());
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual('Add Course');
});

it("Should label button 'Save' when not saving", () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find('button').text()).toBe('Save');
});

it("Should label button 'Saving...' when saving", () => {
    const wrapper = renderCourseForm({saving: true});
    expect(wrapper.find('button').text()).toBe('Saving...');
})