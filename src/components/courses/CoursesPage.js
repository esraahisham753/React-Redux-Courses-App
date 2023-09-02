import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as coursesActions from '../../redux/actions/courseActions';
import {bindActionCreators} from 'redux';

class CoursesPage extends React.Component {
   state = {
        course: {
            title: ""
        }
    };

    handleChange = event => {
        const course = {...this.state.course, title: event.target.value};
        this.setState({course});
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.actions.createCourse(this.state.course);
    }

    render() {
        return (
            <div>
                <h2>Courses Page</h2>
                <h3>Add Course</h3>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.course.title} />
                    <input type="submit" value="save"/>
                    {
                        this.props.courses.map(course => (
                            <div key={course.title}>{course.title}</div>
                        ))
                    }
                </form>
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