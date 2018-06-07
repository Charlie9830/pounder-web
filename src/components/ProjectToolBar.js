import React from 'react';
import Button from './Button';
import '../assets/css/ToolBarButton.css';
import TaskListJumpMenu from './TaskListJumpMenu';
import NewTaskIcon from '../assets/icons/NewTaskIcon.svg';
import RemoveTaskIcon from '../assets/icons/RemoveTaskIcon.svg';
import NewTaskListIcon from '../assets/icons/NewTaskListIcon.svg';
import RemoveTaskListIcon from '../assets/icons/RemoveTaskListIcon.svg';

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
                    <div className="ToolbarPairsFlexContainer">
                        <Button iconSrc={NewTaskIcon} size="small" onClick={this.handleAddTaskButtonClick}/>
                        <Button iconSrc={RemoveTaskIcon} size="small" onClick={this.handleRemoveTaskButtonClick}/>
                    </div>
                    <div className="ToolBarButtonContainer">
                        <TaskListJumpMenu taskLists={this.props.taskLists} isOpen={this.props.isTaskListJumpMenuOpen} onMenuButtonClick={this.handleTaskListJumpMenuButtonClick}
                            onTaskListJumpMenuItemClick={this.handleTaskListJumpMenuItemClick} />
                    </div>
                    <div className="ToolbarPairsFlexContainer">
                        <Button iconSrc={NewTaskListIcon} size="small" onClick={this.handleAddTaskListButtonClick}/>
                        <Button iconSrc={RemoveTaskListIcon} size="small" onClick={this.handleRemoveTaskListButtonCLick}/>
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