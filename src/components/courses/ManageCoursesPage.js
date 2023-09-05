import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadCourses}  from '../../redux/actions/courseActions';
import {loadAuthors}  from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import newCourse from '../../../tools/mockData';

function ManageCoursesPage({courses, authors, loadCourses, loadAuthors, ...props}) {
    const [course, setCourse] = useState(props.course);
    const [errors, setErrors] = useState({});

     useEffect(() => {
        if(courses.length === 0) {
            loadCourses();
            if(! courses) {
                alert("Loading courses failed");
            }
        }
        if(authors.length === 0) {
            loadAuthors();
            if(! authors) {
                alert("Loading authors failed");
            }
        }
    }, []);

    function handleChange(event) {
        const {name, value} = event.target;

        setCourse(prevCourse => ({}))
    }

    return (
        <CourseForm course={course} errors={errors} authors={authors}/>
    );

}

ManageCoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        courses: state.authors.length === 0 ?
        [] :
        state.courses.map(course => {
            return { ...course, authorName: state.authors.find(a => a.id === course.authorId).name}
        }),
        authors: state.authors,
        course: newCourse
    };
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors
 } 
  

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);