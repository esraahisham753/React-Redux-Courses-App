import React, {useEffect} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadCourses}  from '../../redux/actions/courseActions';
import {loadAuthors}  from '../../redux/actions/authorActions';

function ManageCoursesPage({courses, authors, loadCourses, loadAuthors}) {
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

    return (
        <div>
            <h2>Manage Courses Page</h2>
        </div>
    );

}

ManageCoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        courses: state.authors.length === 0 ?
        [] :
        state.courses.map(course => {
            return { ...course, authorName: state.authors.find(a => a.id === course.authorId).name}
        }),
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors
 } 
  

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);