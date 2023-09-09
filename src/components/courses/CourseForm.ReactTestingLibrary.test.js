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