import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as coursesActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import {Redirect} from 'react-router-dom';
import Spinner from "../common/Spinner";
import {toast} from 'react-toastify';

function CoursesPage({courses, authors, actions, loading}) {
    const [isRedirect, setIsRedirect] = useState(false);

    useEffect(() =>  {
        //console.log("courses number", courses.length); 
        if(courses.length === 0) {
            actions.loadCourses().catch(error => console.log(error));
        } 
        if(authors.length === 0) {
            actions.loadAuthors().catch(error => console.log(error));
        }   
    }, []);
   //console.log("loading", loading);

   async function handleDelete(course) {
    toast.success("Course deleted");
    try {
    await actions.deleteCourse(course);
    }
    catch(error) {
        toast.error("Delete failed. " + error.message, {autoClose: false});
    }
   }

    return(
            <div>
                {isRedirect && <Redirect to="/course" />}
                <h2>Courses Page</h2>
                {
                    loading ? <Spinner /> : (
                        <>
                            <button 
                            className="btn btn-primary add-course"
                            onClick={() => setIsRedirect(true)}
                            style={{marginBottom: "20px"}}
                            >
                                Add Course
                            </button>
                            <CourseList onDeleteClick={handleDelete} courses={courses} />
                        </>
                    )
                }
            </div>
        );
    }


CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    //console.log("state: ", state);
    return {
        courses: state.authors.length === 0 ?
        [] :
        state.courses.map(course => {
            return { ...course, authorName: state.authors.find(a => a.id === course.authorId).name}
        }),
        authors: state.authors,
        loading: state.apiStatusReducer > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(coursesActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(coursesActions.deleteCourse, dispatch)
        } 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);