import React from 'react';
import '../assets/css/ToolBarButton.css';
import TaskListJumpMenu from './TaskListJumpMenu';

class ProjectToolBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddTaskButtonClick = this.handleAddTaskButtonClick.bind(this);
        this.handleRemoveTaskButtonClick = this.handleRemoveTaskButtonClick.bind(this);
        this.handleAddTaskListButtonClick = this.handleAddTaskListButtonClick.bind(this);
        this.handleRemoveTaskListButtonCLick = this.handleRemoveTaskListButtonCLick.bind(this);
        this.handleTaskListJumpMenuItemClick = this.handleTaskListJumpMenuItemClick.bind(this);
        this.handleTaskListJumpMenuButtonClick = this.handleTaskListJumpMenuButtonClick.bind(this);
    }

    render() {
        return (
            <div>
                <div className="ProjectToolbarFlexContainer">
                    <div className="ToolbarButtonsFlexItemsLeft">
                        <img className="ToolBarButton" src="NewTaskIcon.svg" onClick={this.handleAddTaskButtonClick} />
                        <img className="ToolBarButton" src="RemoveTaskIcon.svg" onClick={this.handleRemoveTaskButtonClick} />
                    </div>
                    <div className="ToolbarButtonsFlexItemsCenter">
                        <TaskListJumpMenu taskLists={this.props.taskLists} isOpen={this.props.isTaskListJumpMenuOpen} onMenuButtonClick={this.handleTaskListJumpMenuButtonClick}
                        onTaskListJumpMenuItemClick={this.handleTaskListJumpMenuItemClick}/>
                    </div>
                    <div className="ToolbarButtonsFlexItemsRight">
                        <img className="ToolBarButton" src="NewTaskListIcon.svg" onClick={this.handleAddTaskListButtonClick} />
                        <img className="ToolBarButton" src="RemoveTaskListIcon.svg" onClick={this.handleRemoveTaskListButtonCLick} />
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

    handleRemoveTaskButtonClick(e) {
        this.props.onRemoveTaskButtonClick();
    }

    handleAddTaskListButtonClick(e) {
        this.props.onAddTaskListButtonClick();
    }

    handleRemoveTaskListButtonCLick(e) {
        this.props.onRemoveTaskListButtonClick();
    } 
}

export default ProjectToolBar;