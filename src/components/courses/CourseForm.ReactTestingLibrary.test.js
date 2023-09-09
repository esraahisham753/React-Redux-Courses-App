import React from "react";
import CourseForm from './CourseForm';
import { render } from "@testing-library/react";

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

    return render(<CourseForm {...props} />);
}

it("Should have Add to course header", () => {
    const {getByText} = renderCourseForm();
    getByText("Add Course");
});

it("Should label button with 'save' when saving is false", () => {
    const {getByText} = renderCourseForm();
    getByText("Save");
});

it("Should label button with 'saving...' when saving is true", () => {
    const {getByText} = renderCourseForm({saving: true});
    getByText("Saving...");
});