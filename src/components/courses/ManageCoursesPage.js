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
        //console.log(newCourse);
        if(courses.length === 0) {
            loadCourses().catch(error => {
                console.log(error);
            });
        } else {
            console.log("set course state");
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

function getCourseBySlug(courses, slug) {
    return courses.find(a => a.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    return {
        courses: state.authors.length === 0 ?
        [] :
        state.courses.map(course => {
            return { ...course, authorName: state.authors.find(a => a.id === course.authorId).name}
        }),
        authors: state.authors,
        course: slug && courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse
    };
}

const mapDispatchToProps = {
    loadCourses,
    saveCourse,
    loadAuthors
 } 
  

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);