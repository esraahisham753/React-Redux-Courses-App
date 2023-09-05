import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as coursesActions from '../../redux/actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
    componentDidMount() {
        this.props.actions.loadCourses();
        if(! this.props.courses) {
            alert("Loading courses failed");
        }
    }

    render() {
        return (
            <div>
                <h2>Courses Page</h2>
                <CourseList courses={this.props.courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);