import React from 'react';
import TaskListWidget from './TaskListWidget';
import ProjectMessageDisplay from './ProjectMessageDisplay';
import '../assets/css/Project.css';
import ProjectToolBar from './ProjectToolBar';
import scrollToComponent from 'react-scroll-to-component';
import BurgerIcon from '../assets/icons/BurgerIcon.svg';

class Project extends React.Component {
    constructor(props){
        super(props);


        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.handleWidgetClick = this.handleWidgetClick.bind(this);
        this.handleWidgetHeaderPress = this.handleWidgetHeaderPress.bind(this);
        this.handleTaskListWidgetHeaderSubmit = this.handleTaskListWidgetHeaderSubmit.bind(this);
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
        this.handleTaskOptionsClose = this.handleTaskOptionsClose.bind(this);
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
            var isHeaderOpen = this.props.openTaskListWidgetHeaderId === item.uid;
            var taskListSettings = item.settings;    

            // Task Layer.
            var tasks = this.props.tasks.filter(task => {
                return task.taskList === item.uid;
            })

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
                        tasks={tasks} isHeaderOpen={isHeaderOpen} selectedTaskId={selectedTaskId} openTaskInputId={openTaskInputId}
                        onTaskSubmit={this.handleTaskSubmit} onWidgetClick={this.handleWidgetClick} movingTaskId={movingTaskId}
                        onRemoveButtonClick={this.handleTaskListWidgetRemoveButtonClick} openMetadataId={openMetadataId}
                        onHeaderPress={this.handleWidgetHeaderPress} onHeaderSubmit={this.handleTaskListWidgetHeaderSubmit}
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
                        onTaskOptionsClose={this.handleTaskOptionsClose}/>
                </div>
                
            )
        });

        var projectMessageDisplayJSX = this.getProjectMessageDisplayJSX(filteredTaskListWidgets.length);

        return (
            <div className="Project">
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
                    </div>
                    
                    <ProjectToolBar onAddTaskButtonClick={this.handleAddTaskButtonClick} onAddTaskListButtonClick={this.handleAddTaskListButtonClick}
                        taskLists={filteredTaskListWidgets} onTaskListJumpMenuItemClick={this.handleTaskListJumpMenuItemClick}
                        onTaskListJumpMenuButtonClick={this.handleTaskListJumpMenuButtonClick} isTaskListJumpMenuOpen={this.props.isTaskListJumpMenuOpen} />
                </div>
                <div className="TaskListsContainer">
                    {projectMessageDisplayJSX}
                    {taskListWidgets}
                </div>
            </div>
        )
    }

    handleSettingsMenuClose() {
        this.props.onSettingsMenuClose();
    }

    handleTaskOptionsClose() {
        this.props.onTaskOptionsClose();
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

    handleAssignToMember(userId, taskId) {
        this.props.onAssignToMember(userId, taskId);
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
    

    handleTaskPriorityToggleClick(taskId, newValue, currentMetadata) {
        this.props.onTaskPriorityToggleClick(taskId, newValue, currentMetadata);
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

    handleTaskSubmit(taskListWidgetId, taskId, newData, currentMetadata) {
        this.props.onTaskChanged(this.props.projectId, taskListWidgetId, taskId, newData, currentMetadata)
    }

    handleWidgetClick(taskListWidgetId, isFocused) {
        this.props.onTaskListWidgetFocusChanged(taskListWidgetId, isFocused);
    }

    handleWidgetHeaderDoubleClick(taskListWidgetId) {
        this.props.onTaskListWidgetHeaderDoubleClick(taskListWidgetId);
    }

    handleWidgetHeaderPress(taskListWidgetId) {
        this.props.onTaskListWidgetHeaderDoubleClick(taskListWidgetId);
    }

    handleTaskListWidgetHeaderSubmit(taskListWidgetId, newData) {
        // Raise it up to Parent.
        this.props.onTaskListWidgetHeaderChanged(taskListWidgetId, newData);
    }

    handleTaskClick(element, taskListWidgetId) {
        this.props.onTaskClick(element, this.props.projectId, taskListWidgetId);
    }

    handleTaskCheckBoxClick(e, taskListWidgetId, taskId, incomingValue, currentMetadata) {
        this.props.onTaskCheckBoxClick(e, this.props.projectId, taskListWidgetId, taskId, incomingValue, currentMetadata)
    }

    handleTaskListWidgetRemoveButtonClick(taskListWidgetId) {
        this.props.onTaskListWidgetRemoveButtonClick(this.props.projectId, taskListWidgetId);
    }

    handleTaskListSettingsChanged(taskListWidgetId, newTaskListSettings) {
        this.props.onTaskListSettingsChanged(this.props.projectId, taskListWidgetId, newTaskListSettings);
    }

    handleNewDateSubmit(taskListWidgetId, taskId, newDate, currentMetadata) {
        this.props.onNewDateSubmit(this.props.projectId, taskListWidgetId, taskId, newDate, currentMetadata);
    }
}

export default Project;