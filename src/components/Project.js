import React from 'react';
import TaskListWidget from './TaskListWidget';
import ProjectMessageDisplay from './ProjectMessageDisplay';
import '../assets/css/Project.css';
import ProjectToolBar from './ProjectToolBar';
import OverlayMenuContainer from '../containers/OverlayMenuContainer';
import scrollToComponent from 'react-scroll-to-component';
import BurgerIcon from '../assets/icons/BurgerIcon.svg';
import MenuIcon from '../assets/icons/MenuIcon.svg';
import { getUserUid } from 'handball-libs/libs/pounder-firebase';
import EyeOpenIcon from '../assets/icons/EyeOpenIcon.svg';
import EyeClosedIcon from '../assets/icons/EyeClosedIcon.svg';


import { Button, Typography, ListItem, List, Paper } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';


class Project extends React.Component {
    constructor(props){
        super(props);

        this.handleWidgetClick = this.handleWidgetClick.bind(this);
        this.handleWidgetHeaderPress = this.handleWidgetHeaderPress.bind(this);
        this.handleTaskClick = this.handleTaskClick.bind(this);
        this.handleTaskCheckBoxClick = this.handleTaskCheckBoxClick.bind(this);
        this.handleTaskListWidgetRemoveButtonClick = this.handleTaskListWidgetRemoveButtonClick.bind(this);
        this.handleAddTaskButtonClick = this.handleAddTaskButtonClick.bind(this);
        this.handleAddTaskListButtonClick = this.handleAddTaskListButtonClick.bind(this);
        this.handleTaskTwoFingerTouch = this.handleTaskTwoFingerTouch.bind(this);
        this.handleTaskListSettingsChanged = this.handleTaskListSettingsChanged.bind(this);
        this.handleDueDateClick = this.handleDueDateClick.bind(this);
        this.handleTaskListSettingsButtonClick = this.handleTaskListSettingsButtonClick.bind(this);
        this.handleTaskListJumpMenuItemClick = this.handleTaskListJumpMenuItemClick.bind(this);
        this.handleTaskListJumpMenuButtonClick = this.handleTaskListJumpMenuButtonClick.bind(this);
        this.getProjectMessageDisplayJSX = this.getProjectMessageDisplayJSX.bind(this);
        this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
        this.handleSettingsMenuClose = this.handleSettingsMenuClose.bind(this);
        this.handleTaskOptionsDeleteButtonClick = this.handleTaskOptionsDeleteButtonClick.bind(this);
        this.handleTaskOptionsOpen = this.handleTaskOptionsOpen.bind(this);
        this.handleTaskOptionsCancel = this.handleTaskOptionsCancel.bind(this);
        this.handleShowOnlySelfTasksChanged = this.handleShowOnlySelfTasksChanged.bind(this);
        this.getToolbarButtonEnableStates = this.getToolbarButtonEnableStates.bind(this);
        this.handleTaskOpenTextInput = this.handleTaskOpenTextInput.bind(this);
        this.handleShowCompletedTasksClick = this.handleShowCompletedTasksClick.bind(this);
        this.handleRenewNowButtonClick = this.handleRenewNowButtonClick.bind(this);
    }
    
    componentDidMount() {   
    }

    componentWillUnmount() {
    }

    render() {
        // Build a list of TaskListWidgets to Render out here.
        // Filter out Task Lists from other Projects.
        var filteredTaskListWidgets = this.props.taskLists.filter(taskList => {
            return taskList.project === this.props.projectId;
        })

        var taskListWidgets = filteredTaskListWidgets.map((item, index) => {
            // Widget Layer.
            var isFocused = this.props.focusedTaskListId === item.uid;
            var taskListSettings = item.settings;    

            // Task Layer.
            var tasks = [];
            if (this.props.showOnlySelfTasks !== true) {
                // Standard Task Filtering.
                tasks = this.props.tasks.filter(task => {
                    return task.taskList === item.uid;
                })
            }

            else {
                // Filter out Tasks not assigned to the current User.
                tasks = this.props.tasks.filter(task => {
                    return task.taskList === item.uid && task.assignedTo === getUserUid();
                })

                if (tasks.length === 0) {
                    // No point in showing the user empty Task lists when they just want to see tasks assigned to themselves.
                    return (<div/>);
                }
            }
            

            var selectedTaskId = -1;
            var openTaskInputId = -1;
            var openMetadataId = -1;

            if (this.props.selectedTask.taskListWidgetId === item.uid) {
                selectedTaskId = this.props.selectedTask.taskId;

                if (this.props.selectedTask.isInputOpen) {
                    openTaskInputId = selectedTaskId;
                }

                if (this.props.selectedTask.isMetadataOpen) {
                    openMetadataId = selectedTaskId
                }
            }

            var movingTaskId = item.uid === this.props.sourceTaskListId ? this.props.movingTaskId : -1;

            let taskListWidget = () => {
                return (
                    <TaskListWidget ref={item.uid}
                        taskListWidgetId={item.uid} isFocused={isFocused} taskListName={item.taskListName}
                        tasks={tasks} selectedTaskId={selectedTaskId} openTaskInputId={openTaskInputId}
                        onWidgetClick={this.handleWidgetClick} movingTaskId={movingTaskId}
                        onRemoveButtonClick={this.handleTaskListWidgetRemoveButtonClick}
                        onHeaderPress={this.handleWidgetHeaderPress}
                        onHeaderDoubleClick={this.handleWidgetHeaderDoubleClick}
                        onTaskClick={this.handleTaskClick} onTaskCheckBoxClick={this.handleTaskCheckBoxClick}
                        onTaskTwoFingerTouch={this.handleTaskTwoFingerTouch} settings={taskListSettings}
                        onSettingsChanged={this.handleTaskListSettingsChanged} onDueDateClick={this.handleDueDateClick}
                        onTaskListSettingsButtonClick={this.handleTaskListSettingsButtonClick}
                        openTaskListSettingsMenuId={this.props.openTaskListSettingsMenuId} projectMembers={this.props.projectMembers}
                        disableAnimations={this.props.disableAnimations}
                        onSettingsMenuClose={this.handleSettingsMenuClose}
                        onTaskOptionsDeleteButtonClick={this.handleTaskOptionsDeleteButtonClick}
                        onTaskOptionsOpen={this.handleTaskOptionsOpen} openTaskOptionsId={this.props.openTaskOptionsId} 
                        onTaskOptionsCancel={this.handleTaskOptionsCancel}
                        onTaskOpenTextInput={this.handleTaskOpenTextInput}
                        onTaskInspectorOpen={this.props.onTaskInspectorOpen}
                        memberLookup={this.props.memberLookup}
                        projects={this.props.projects} projectId={this.props.projectId}
                        onMoveTaskListToProject={this.props.onMoveTaskListToProject}
                        onRenewNowButtonClick={this.handleRenewNowButtonClick}/>
                )
            }

            return (
                <ListItem key={item.uid} component={taskListWidget}/>
            )
        });

        var projectMessageDisplayJSX = this.getProjectMessageDisplayJSX(filteredTaskListWidgets.length);
        var toolbarButtonEnableStates = this.getToolbarButtonEnableStates();

        
        const extendedFabStyle = {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 90,
            left: 'auto',
            position: 'fixed',
        };

        const fabStyle = {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        };

        let listAreaStyle = {
            paddingLeft: '15px',
            paddingRight: '15px'
        }        

        return (
            <div className="Project">
                    {/* Toolbar  */} 
                    <ProjectToolBar onAddTaskButtonClick={this.handleAddTaskButtonClick} onAddTaskListButtonClick={this.handleAddTaskListButtonClick}
                        taskLists={filteredTaskListWidgets} onTaskListJumpMenuItemClick={this.handleTaskListJumpMenuItemClick}
                        onTaskListJumpMenuButtonClick={this.handleTaskListJumpMenuButtonClick} isTaskListJumpMenuOpen={this.props.isTaskListJumpMenuOpen}
                        onShowOnlySelfTasksChanged={this.handleShowOnlySelfTasksChanged}
                        showOnlySelfTasks={this.props.showOnlySelfTasks}
                        isRemote={this.props.isRemote} buttonEnableStates={toolbarButtonEnableStates}
                        projectName={this.props.projectName} showCompletedTasks={this.props.showCompletedTasks} />

                    {/* Task Lists  */} 
                    <List style={listAreaStyle}>
                        {taskListWidgets}

                        <Button variant="text" color="secondary" onClick={this.handleAddTaskListButtonClick}>
                            <AddIcon/> Add new List
                        </Button>
                    </List>

                    {/* Floating Action Buttons  */} 
                    <Button variant="extendedFab" style={extendedFabStyle} size="small" onClick={this.handleAddTaskListButtonClick}>
                        New List
                    </Button>

                    <Button variant="fab" style={fabStyle} onClick={this.handleAddTaskButtonClick}>
                        <AddIcon />
                    </Button>

            </div>
        )
    }

    handleBackArrowClick() {
        this.props.onBackArrowClick();
    }

    handleRenewNowButtonClick(taskListWidgetId) {
        this.props.onRenewNowButtonClick(taskListWidgetId);
    }

    handleShowCompletedTasksClick() {
        this.props.onProjectMenuClose();
        this.props.onShowCompletedTasksClick();
    }

    handleTaskOpenTextInput(element, taskListWidgetId) {
        this.props.onTaskOpenTextInput(element, taskListWidgetId);
    }

    getToolbarButtonEnableStates() {
        var overide = this.props.projectId !== -1;

        var isAddTaskButtonEnabled = overide && this.props.focusedTaskListId !== -1;
        var isRemoveTaskButtonEnabled = overide && this.props.selectedTask.taskId !== -1;
        var isAddTaskListButtonEnabled = overide;
        var isRemoveTaskListButtonEnabled = overide && this.props.focusedTaskListId !== -1;

        return {
            isAddTaskButtonEnabled: isAddTaskButtonEnabled,
            isRemoveTaskButtonEnabled: isRemoveTaskButtonEnabled,
            isAddTaskListButtonEnabled: isAddTaskListButtonEnabled,
            isRemoveTaskListButtonEnabled: isRemoveTaskListButtonEnabled,
        }
    }

    handleShowOnlySelfTasksChanged(newValue) {
        this.props.onShowOnlySelfTasksChanged(newValue);
    }

    handleSettingsMenuClose() {
        this.props.onSettingsMenuClose();
    }

    handleTaskOptionsCancel() {
        this.props.onTaskOptionsCancel();
    }

    handleTaskOptionsOpen(taskId) {
        this.props.onTaskOptionsOpen(taskId);
    }

    handleTaskOptionsDeleteButtonClick(taskId) {
        this.props.onTaskOptionsDeleteButtonClick(taskId);
    }


    handleSettingsMenuClose() {
        this.props.onSettingsMenuClose();
    }

    handleTaskListJumpMenuButtonClick() {
        this.props.onTaskListJumpMenuButtonClick();
    }



    getProjectMessageDisplayJSX(taskListWidgetCount) {
        // User not Logged in.
        if (this.props.isLoggedIn === false) {
            return (
                <ProjectMessageDisplay message="You are logged out" />
            )
        }

        // No Project Selected.
        if (this.props.projectId === -1) {
            return (
                <ProjectMessageDisplay message="No project selected" />
            )
        }

        // No Tasklists created.
        if (taskListWidgetCount === 0 || taskListWidgetCount == null) {
            return (
                <ProjectMessageDisplay message="No Task Lists created" />
            )
        }
    }

    handleTaskListJumpMenuItemClick(taskListId) {
         // Offset here should be the Oppisite of .TaskListContainer padding-top.
        scrollToComponent(this.refs[taskListId], {align: 'top', offset: -77, duration: 250});
        this.props.onTaskListWidgetFocusChanged(taskListId, (this.props.focusedTaskListId === taskListId));

        // Tell App to close the Menu.
        this.props.onTaskListJumpMenuButtonClick();

    }
    
    handleTaskListSettingsButtonClick(taskListWidgetId) {
        this.props.onTaskListSettingsButtonClick(this.props.projectId, taskListWidgetId);
    }

    handleDueDateClick(taskListWidgetId, taskId) {
        this.props.onDueDateClick(this.props.projectId, taskListWidgetId, taskId);
    }

    handleTaskTwoFingerTouch(taskListWidgetId, taskId) {
        this.props.onTaskTwoFingerTouch(taskListWidgetId, taskId);
    }


    handleAddTaskListButtonClick() {
        this.props.onAddTaskListButtonClick();
    }

    handleAddTaskButtonClick() {
        this.props.onAddTaskButtonClick();
    }

    handleWidgetClick(taskListWidgetId, isFocused) {
        this.props.onTaskListWidgetFocusChanged(taskListWidgetId, isFocused);
    }

    handleWidgetHeaderDoubleClick(taskListWidgetId) {
        this.props.onTaskListWidgetHeaderDoubleClick(taskListWidgetId);
    }

    handleWidgetHeaderPress(taskListWidgetId, currentData) {
        this.props.onTaskListWidgetHeaderDoubleClick(taskListWidgetId, currentData);
    }

    handleTaskClick(element, taskListWidgetId) {
        this.props.onTaskClick(element, this.props.projectId, taskListWidgetId);
    }

    handleTaskCheckBoxClick(taskListWidgetId, taskId, newValue, oldValue, currentMetadata) {
        this.props.onTaskCheckBoxClick(this.props.projectId, taskListWidgetId, taskId, newValue, oldValue, currentMetadata)
    }

    handleTaskListWidgetRemoveButtonClick(taskListWidgetId) {
        this.props.onTaskListWidgetRemoveButtonClick(this.props.projectId, taskListWidgetId);
    }

    handleTaskListSettingsChanged(taskListWidgetId, newTaskListSettings, closeMenu) {
        this.props.onTaskListSettingsChanged(this.props.projectId, taskListWidgetId, newTaskListSettings, closeMenu);
    }
}

export default Project;