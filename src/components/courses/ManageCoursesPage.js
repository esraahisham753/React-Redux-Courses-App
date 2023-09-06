import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadCourses, saveCourse}  from '../../redux/actions/courseActions';
import {loadAuthors}  from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import {courses, newCourse} from '../../../tools/mockData';

function ManageCoursesPage({courses, authors, loadCourses, saveCourse, loadAuthors, history, ...props}) {
    const [course, setCourse] = useState(props.course);
    const [errors, setErrors] = useState({});

     useEffect(() => {
        //console.log("ManageCoursesPage props", courses);
        if(courses.length === 0) {
            loadCourses().catch(error => {
                console.log(error);
            });
        } else {
            //console.log("set course state");
            setCourse(props.course);
        }

        if(authors.length === 0) {
            loadAuthors().catch((error) => {
                console.log(error);
            });
        }
    }, [props.course]);

    function handleChange(event) {
        const {name, value} = event.target;

        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        saveCourse(course).then(() => {
            history.push("/courses")
        })
    }

    return (
        <CourseForm 
        course={course}
        errors={errors} 
        authors={authors} 
        onChange={handleChange}
        onSave={handleSubmit}/>
    );

}

ManageCoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export function getCourseBySlug(courses, slug) {
    return courses.find(a => a.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses,
    saveCourse,
    loadAuthors
 } 
  

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);