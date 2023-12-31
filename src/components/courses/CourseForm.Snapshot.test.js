import React from "react";
import CourseForm from './CourseForm';
import renderer from 'react-test-renderer';
import {courses, authors} from '../../../tools/mockData';

it("Should change button label to 'saving...' when saving is true", () => {
    const tree = renderer.create(
        <CourseForm
        course={courses[0]}
        authors={authors}
        onChange={jest.fn()}
        onSave={jest.fn()}
        saving />
    );

    expect(tree).toMatchSnapshot();
});

it("Should change button label to 'save' when saving is false", () => {
    const tree = renderer.create(
        <CourseForm
        course={courses[0]}
        authors={authors}
        onChange={jest.fn()}
        onSave={jest.fn()}
        saving={false} />
    );

    expect(tree).toMatchSnapshot();
});