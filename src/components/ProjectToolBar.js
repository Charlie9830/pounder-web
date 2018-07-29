import React from 'react';
import Button from './Button';
import '../assets/css/ToolBarButton.css';
import TaskListJumpMenu from './TaskListJumpMenu';
import NewTaskIcon from '../assets/icons/NewTaskIcon.svg';
import NewTaskListIcon from '../assets/icons/NewTaskListIcon.svg';
import ShowAllTasksIcon from '../assets/icons/ShowAllTasksIcon.svg';
import ShowOnlySelfTasksIcon from '../assets/icons/ShowOnlySelfTasksIcon.svg';
import EyeOpenIcon from '../assets/icons/EyeOpenIcon.svg';
import EyeClosedIcon from '../assets/icons/EyeClosedIcon.svg';
import Toggle from 'react-toggle';
import '../assets/css/react-toggle/style.css';


// React-Toggle Icon.
class EyeOpen extends React.Component {
    render() {
        return (
            <img className="ToggleIcon" src={EyeOpenIcon}/>
        )
    }
}

// React-Toggle Icon.
class EyeClosed extends React.Component {
    render() {
        return (
            <img className="ToggleIcon" src={EyeClosedIcon}/>
        )
    }
}

// React-Toggle Icon.
class ShowAllTasks extends React.Component {
    render() {
        return (
            <img  className="ToggleIcon" src={ShowAllTasksIcon}/>
        )
    } 
}

// React-Toggle Icon.
class ShowOnlySelfTasks extends React.Component {
    render() {
        return (
            <img className="ToggleIcon" src={ShowOnlySelfTasksIcon}/>
        )
    }
}

class ProjectToolBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddTaskButtonClick = this.handleAddTaskButtonClick.bind(this);
        this.handleAddTaskListButtonClick = this.handleAddTaskListButtonClick.bind(this);
        this.handleTaskListJumpMenuItemClick = this.handleTaskListJumpMenuItemClick.bind(this);
        this.handleTaskListJumpMenuButtonClick = this.handleTaskListJumpMenuButtonClick.bind(this);
        this.handleShowOnlySelfTasksChange = this.handleShowOnlySelfTasksChange.bind(this);
        this.getShowOnlySelfTasksSwitchJSX = this.getShowOnlySelfTasksSwitchJSX.bind(this);
    }

    render() {
        var showOnlySelfTasksSwitchJSX = this.getShowOnlySelfTasksSwitchJSX();

        return (
            <div>
                <div className="ProjectToolbarFlexContainer">
                    <div className="ToolbarPairsFlexContainer">
                        <Button iconSrc={NewTaskIcon} size="small" onClick={this.handleAddTaskButtonClick}
                        isEnabled={this.props.buttonEnableStates.isAddTaskButtonEnabled}/>
                    </div>

                    <div className="ToolBarButtonContainer">
                        <TaskListJumpMenu taskLists={this.props.taskLists} isOpen={this.props.isTaskListJumpMenuOpen} onMenuButtonClick={this.handleTaskListJumpMenuButtonClick}
                            onTaskListJumpMenuItemClick={this.handleTaskListJumpMenuItemClick} />
                    </div>

                    {showOnlySelfTasksSwitchJSX}
                    
                    <div className="ToolbarPairsFlexContainer">
                        <Button iconSrc={NewTaskListIcon} size="small" onClick={this.handleAddTaskListButtonClick}
                        isEnabled={this.props.buttonEnableStates.isAddTaskListButtonEnabled}/>
                    </div>
                </div>
            </div>
        )
    }

    getShowOnlySelfTasksSwitchJSX() {
        if (this.props.isRemote) {
            return (
                <div className="ToolbarPairsFlexContainer">
                    <div className="AssignedToSelfToggleContainer">
                        <Toggle icons={{ checked: <ShowOnlySelfTasks />, unchecked: <ShowAllTasks /> }}
                            onChange={this.handleShowOnlySelfTasksChange} checked={this.props.showOnlySelfTasks} />
                    </div>
                </div>
            )
        }
    }

    handleShowOnlySelfTasksChange(e) {
        this.props.onShowOnlySelfTasksChanged(e.target.checked);
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