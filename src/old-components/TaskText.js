import React from 'react';
import VerticalCenteringContainer from '../containers/VerticalCenteringContainer';
import '../assets/css/TaskText.css';

class TaskText extends React.Component {
    render() {
        var currentClassName = this.props.isComplete ? "TaskText Fade" : "TaskText";

        return (
            <div className={currentClassName} data-ishighpriority={this.props.isHighPriority}>
                    <label>{this.props.text}</label>
            </div>
        )
    }
}

export default TaskText;