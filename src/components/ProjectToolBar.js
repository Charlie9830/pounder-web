import React from 'react';
import Button from './Button';
import '../assets/css/ToolBarButton.css';
import TaskListJumpMenu from './TaskListJumpMenu';
import NewTaskIcon from '../assets/icons/NewTaskIcon.svg';
import NewTaskListIcon from '../assets/icons/NewTaskListIcon.svg';

class ProjectToolBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddTaskButtonClick = this.handleAddTaskButtonClick.bind(this);
        this.handleAddTaskListButtonClick = this.handleAddTaskListButtonClick.bind(this);
        this.handleTaskListJumpMenuItemClick = this.handleTaskListJumpMenuItemClick.bind(this);
        this.handleTaskListJumpMenuButtonClick = this.handleTaskListJumpMenuButtonClick.bind(this);
    }

    render() {
        return (
            <div>
                <div className="ProjectToolbarFlexContainer">
                    <div className="ToolbarPairsFlexContainer">
                        <Button iconSrc={NewTaskIcon} size="small" onClick={this.handleAddTaskButtonClick}/>
                    </div>
                    <div className="ToolBarButtonContainer">
                        <TaskListJumpMenu taskLists={this.props.taskLists} isOpen={this.props.isTaskListJumpMenuOpen} onMenuButtonClick={this.handleTaskListJumpMenuButtonClick}
                            onTaskListJumpMenuItemClick={this.handleTaskListJumpMenuItemClick} />
                    </div>
                    <div className="ToolbarPairsFlexContainer">
                        <Button iconSrc={NewTaskListIcon} size="small" onClick={this.handleAddTaskListButtonClick}/>
                    </div>
                </div>
            </div>
        )
    }

    handleTaskListJumpMenuButtonClick() {
        this.props.onTaskListJumpMenuButtonClick();
    }

    handleTaskListJumpMenuItemClick(taskListId) {
        this.props.onTaskListJumpMenuItemClick(taskListId);
    }

    handleAddTaskButtonClick(e) {
        this.props.onAddTaskButtonClick();
    }

    handleAddTaskListButtonClick(e) {
        this.props.onAddTaskListButtonClick();
    }
}

export default ProjectToolBar;