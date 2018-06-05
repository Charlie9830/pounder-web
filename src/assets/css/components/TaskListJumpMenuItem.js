import React from 'react';
import '../assets/css/TaskListJumpMenuItem.css';

class TaskListJumpMenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="TaskListJumpMenuItemContainer" onClick={this.handleClick}>
                <label className="TaskListJumpMenuItem">
                    {this.props.taskListName}
                </label>
            </div>
        )
    }

    handleClick(e) {
        this.props.onItemClick(this.props.taskListId);
    }
}

export default TaskListJumpMenuItem;