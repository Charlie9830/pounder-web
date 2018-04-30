import React from 'react';
import TaskListJumpMenuItem from './TaskListJumpMenuItem';
import '../assets/css/ToolBarButton.css';
import '../assets/css/TaskListJumpMenu.css';
import TaskListJumpMenuIcon from '../assets/icons/TaskListJumpMenuIcon.svg';

class TaskListJumpMenu extends React.Component {
    constructor(props) {
        super(props);

        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
    }

    render() {
        if (this.props.isOpen) {
            var taskListSelectors = this.props.taskLists.map((item, index) => {
                return (
                    <TaskListJumpMenuItem key={index} taskListName={item.taskListName} taskListId={item.uid}
                    onItemClick={this.handleMenuItemClick}/>
                )
            })

            return (
                <div className="TaskListJumpMenuContainer">
                    <div className="TaskListJumpMenu">
                        {taskListSelectors}
                    </div>
                </div>
                
            )
        }

        else {
            return (
                <div onClick={this.handleMenuButtonClick}>
                    <img className="ToolBarButton" src={TaskListJumpMenuIcon}/>
                </div>
            )
        }
    }

    handleMenuItemClick(taskListId) {
        this.props.onTaskListJumpMenuItemClick(taskListId);
    }

    handleMenuButtonClick(e) {
        this.props.onMenuButtonClick();
    }
}

export default TaskListJumpMenu;