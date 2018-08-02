import React from 'react';
import TaskListWidget from './TaskListWidget';
import ProjectMessageDisplay from './ProjectMessageDisplay';
import '../assets/css/Project.css';
import ProjectToolBar from './ProjectToolBar';
import OverlayMenuContainer from '../containers/OverlayMenuContainer';
import scrollToComponent from 'react-scroll-to-component';
import BurgerIcon from '../assets/icons/BurgerIcon.svg';
import MenuIcon from '../assets/icons/MenuIcon.svg';
import { getUserUid } from 'pounder-firebase';
import EyeOpenIcon from '../assets/icons/EyeOpenIcon.svg';
import EyeClosedIcon from '../assets/icons/EyeClosedIcon.svg';

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
        this.handleNewDateSubmit = this.handleNewDateSubmit.bind(this);
        this.handleTaskListSettingsButtonClick = this.handleTaskListSettingsButtonClick.bind(this);
        this.handleTaskPriorityToggleClick = this.handleTaskPriorityToggleClick.bind(this);
        this.handleTaskListJumpMenuItemClick = this.handleTaskListJumpMenuItemClick.bind(this);
        this.handleTaskListJumpMenuButtonClick = this.handleTaskListJumpMenuButtonClick.bind(this);
        this.getProjectMessageDisplayJSX = this.getProjectMessageDisplayJSX.bind(this);
        this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
        this.handleTaskMetadataCloseButtonClick = this.handleTaskMetadataCloseButtonClick.bind(this);
        this.handleTaskMetadataOpen = this.handleTaskMetadataOpen.bind(this);
        this.handleAssignToMember = this.handleAssignToMember.bind(this);
        this.handleSettingsMenuClose = this.handleSettingsMenuClose.bind(this);
        this.handleTaskOptionsDeleteButtonClick = this.handleTaskOptionsDeleteButtonClick.bind(this);
        this.handleTaskOptionsOpen = this.handleTaskOptionsOpen.bind(this);
        this.handleTaskOptionsCancel = this.handleTaskOptionsCancel.bind(this);
        this.handleShowOnlySelfTasksChanged = this.handleShowOnlySelfTasksChanged.bind(this);
        this.getToolbarButtonEnableStates = this.getToolbarButtonEnableStates.bind(this);
        this.handleTaskOpenTextInput = this.handleTaskOpenTextInput.bind(this);
        this.getProjectMenuJSX = this.getProjectMenuJSX.bind(this);
        this.handleProjectMenuButtonClick = this.handleProjectMenuButtonClick.bind(this);
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

            return (
                <div key={index} className="TaskListWidgetContainer">
                    <TaskListWidget ref={item.uid}
                        taskListWidgetId={item.uid} isFocused={isFocused} taskListName={item.taskListName}
                        tasks={tasks} selectedTaskId={selectedTaskId} openTaskInputId={openTaskInputId}
                        onWidgetClick={this.handleWidgetClick} movingTaskId={movingTaskId}
                        onRemoveButtonClick={this.handleTaskListWidgetRemoveButtonClick} openMetadataId={openMetadataId}
                        onHeaderPress={this.handleWidgetHeaderPress}
                        onHeaderDoubleClick={this.handleWidgetHeaderDoubleClick}
                        onTaskClick={this.handleTaskClick} onTaskCheckBoxClick={this.handleTaskCheckBoxClick}
                        onTaskTwoFingerTouch={this.handleTaskTwoFingerTouch} settings={taskListSettings}
                        onSettingsChanged={this.handleTaskListSettingsChanged} onDueDateClick={this.handleDueDateClick}
                        openCalendarId={this.props.openCalendarId} onNewDateSubmit={this.handleNewDateSubmit}
                        onTaskListSettingsButtonClick={this.handleTaskListSettingsButtonClick}
                        openTaskListSettingsMenuId={this.props.openTaskListSettingsMenuId} projectMembers={this.props.projectMembers}
                        onTaskMetadataOpen={this.handleTaskMetadataOpen} disableAnimations={this.props.disableAnimations}
                        onTaskPriorityToggleClick={this.handleTaskPriorityToggleClick}
                        onAssignToMember={this.handleAssignToMember} onSettingsMenuClose={this.handleSettingsMenuClose}
                        onTaskMetadataCloseButtonClick={this.handleTaskMetadataCloseButtonClick}
                        onTaskOptionsDeleteButtonClick={this.handleTaskOptionsDeleteButtonClick}
                        onTaskOptionsOpen={this.handleTaskOptionsOpen} openTaskOptionsId={this.props.openTaskOptionsId} 
                        onTaskOptionsCancel={this.handleTaskOptionsCancel}
                        onTaskOpenTextInput={this.handleTaskOpenTextInput}/>
                </div>
                
            )
        });

        var projectMessageDisplayJSX = this.getProjectMessageDisplayJSX(filteredTaskListWidgets.length);
        var toolbarButtonEnableStates = this.getToolbarButtonEnableStates();
        var projectMenuJSX = this.getProjectMenuJSX();

        return (
            <div className="Project">       
                {projectMenuJSX}
                <div className="ProjectToolBar">
                    <div className="ProjectHeaderContainer">
                        <div className="ProjectHeaderBurgerButtonContainer" onClick={this.handleBackArrowClick}>
                            <img className="ProjectHeaderBurgerButton" src={BurgerIcon} />
                        </div>

                        <div className="ProjectNameContainer">
                            <div className="ProjectName">
                                {this.props.projectName}
                            </div>
                        </div>

                        <div className="ProjectHeaderMenuButtonContainer" onClick={this.handleProjectMenuButtonClick}>
                            <img className="ProjectHeaderMenuButton" src={MenuIcon}/>
                        </div>

                    </div>
                    
                    <ProjectToolBar onAddTaskButtonClick={this.handleAddTaskButtonClick} onAddTaskListButtonClick={this.handleAddTaskListButtonClick}
                        taskLists={filteredTaskListWidgets} onTaskListJumpMenuItemClick={this.handleTaskListJumpMenuItemClick}
                        onTaskListJumpMenuButtonClick={this.handleTaskListJumpMenuButtonClick} isTaskListJumpMenuOpen={this.props.isTaskListJumpMenuOpen}
                        onShowOnlySelfTasksChanged={this.handleShowOnlySelfTasksChanged}
                        showOnlySelfTasks={this.props.showOnlySelfTasks}
                        isRemote={this.props.isRemote} buttonEnableStates={toolbarButtonEnableStates}/>
                </div>
                <div className="TaskListsContainer">
                    {projectMessageDisplayJSX}
                    {taskListWidgets}
                </div>
            </div>
        )
    }

    handleRenewNowButtonClick(taskListWidgetId) {
        this.props.onRenewNowButtonClick(taskListWidgetId);
    }

    handleShowCompletedTasksClick() {
        this.props.onProjectMenuClose();
        this.props.onShowCompletedTasksClick();
    }

    handleProjectMenuButtonClick() {
        this.props.onProjectMenuOpen();
    }

    getProjectMenuJSX() {
        if (this.props.isProjectMenuOpen) {
            var text = this.props.showCompletedTasks === true ? "Hide completed Tasks" : "Show completed Tasks";
            var eyeIcon = this.props.showCompletedTasks === true ? EyeClosedIcon : EyeOpenIcon;

            return (
                <OverlayMenuContainer renderOverlay={false} onOutsideChildBoundsClick={() => { this.props.onProjectMenuClose() }}>
                    <div className="ProjectMenuContainer">
                        <div className="ProjectMenuContentGrid">
                            <div className="ProjectMenuItem" onClick={this.handleShowCompletedTasksClick}>
                                <img className="ProjectMenuItemIcon" src={eyeIcon} />
                                <div className="ProjectMenuItemLabel"> {text} </div>q
                            </div>
                        </div>
                    </div>
                </OverlayMenuContainer>
            )
        }
        
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

    handleBackArrowClick() {
        this.props.onBackArrowClick();
    }

    handleSettingsMenuClose() {
        this.props.onSettingsMenuClose();
    }

    handleTaskListJumpMenuButtonClick() {
        this.props.onTaskListJumpMenuButtonClick();
    }

    handleAssignToMember(newUserId, oldUserId, taskId) {
        this.props.onAssignToMember(newUserId, oldUserId, taskId);
    }

    handleTaskMetadataOpen(taskListWidgetId, taskId) {
        this.props.onTaskMetadataOpen(taskListWidgetId, taskId);
    }

    handleTaskMetadataCloseButtonClick() {
        this.props.onTaskMetadataCloseButtonClick();
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
    

    handleTaskPriorityToggleClick(taskId, newValue, oldValue, currentMetadata) {
        this.props.onTaskPriorityToggleClick(taskId, newValue, oldValue, currentMetadata);
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

    handleNewDateSubmit(taskListWidgetId, taskId, newDate, oldDate, currentMetadata) {
        this.props.onNewDateSubmit(this.props.projectId, taskListWidgetId, taskId, newDate, oldDate, currentMetadata);
    }
}

export default Project;