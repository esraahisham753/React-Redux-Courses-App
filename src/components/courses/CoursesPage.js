import React from "react";

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
        alert(this.state.course.title);
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
                </form>
            </div>
        );
    }
}

export default CoursesPage;