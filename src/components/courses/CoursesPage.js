import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as coursesActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import {Redirect} from 'react-router-dom';
import Spinner from "../common/Spinner";

function CoursesPage({courses, authors, actions, loading}) {
    const [isRedirect, setIsRedirect] = useState(false);

    useEffect(() =>  {
        console.log("courses number", courses.length);     
        actions.loadCourses().catch(error => console.log(error));   
        actions.loadAuthors().catch(error => console.log(error));   
    }, [courses.length]);
   //console.log("loading", loading);

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
                            <CourseList courses={courses} />
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
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        } 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);