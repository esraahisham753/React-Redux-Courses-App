import React from "react";

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course: {
                title: ""
            }
        };
    }

    handleChange(event) {
        const course = {...this.state.course, title: event.target.value};
        this.setState({course});
    }

    render() {
        return (
            <div>
                <h2>Courses Page</h2>
                <h3>Add Course</h3>
                <form>
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