import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as coursesActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import {Redirect} from 'react-router-dom';

class CoursesPage extends React.Component {
    state = {
        isRedirect: false
    }

    componentDidMount() {
        const {courses, authors, actions} = this.props;
        if(courses.length === 0) {
            actions.loadCourses().catch(error => console.log(error));
        }
        if(authors.length === 0) {
            actions.loadAuthors();
            if(! authors) {
                alert("Loading authors failed");
            }
        }
    }


    render() {
        return (
            <div>
                {this.state.isRedirect && <Redirect to="/course" />}
                <h2>Courses Page</h2>
                <button 
                className="btn btn-primary add-course"
                onClick={() => this.setState({isRedirect: true})}
                style={{marginBottom: "20px"}}
                >
                    Add Course
                </button>
                <CourseList courses={this.props.courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
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

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(coursesActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        } 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);