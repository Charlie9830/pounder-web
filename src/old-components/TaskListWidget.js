import React from 'react';
import TaskArea from '../components/TaskArea';
import Task from '../components/Task/Task';
import ListToolbar from '../components/ListToolbar';
import '../assets/css/TaskListWidget.css';
import Ink from 'react-ink';
import { TaskMetadataStore } from 'handball-libs/libs/pounder-stores';
import { GetDisplayNameFromLookup } from 'handball-libs/libs/pounder-utilities';
import { getUserUid } from 'handball-libs/libs/pounder-firebase';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Paper, List, ListItem, Divider } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';


class TaskListWidget extends React.Component {
    constructor(props){
        super(props);

        // Method Bindings.
        this.handleTaskClick = this.handleTaskClick.bind(this);
        this.handleWidgetClick = this.handleWidgetClick.bind(this);
        this.handleHeaderPress = this.handleHeaderPress.bind(this);
        this.handleHeaderDoubleClick = this.handleHeaderDoubleClick.bind(this);
        this.handleTaskCheckBoxClick = this.handleTaskCheckBoxClick.bind(this);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
        this.handleTaskTwoFingerTouch = this.handleTaskTwoFingerTouch.bind(this);
        this.handleTaskListSettingsChanged = this.handleTaskListSettingsChanged.bind(this);
        this.handleSettingsButtonClick = this.handleSettingsButtonClick.bind(this);
        this.handleSettingsMenuClose = this.handleSettingsMenuClose.bind(this);
        this.handleTaskOptionsDeleteButtonClick = this.handleTaskOptionsDeleteButtonClick.bind(this);
        this.handleTaskOptionsOpen = this.handleTaskOptionsOpen.bind(this);
        this.handleTaskOptionsCancel = this.handleTaskOptionsCancel.bind(this);
        this.handleTaskOpenTextInput = this.handleTaskOpenTextInput.bind(this);
        this.handleRenewNowButtonClick = this.handleRenewNowButtonClick.bind(this);
        this.taskSortIsCompletedHelper = this.taskSortIsCompletedHelper.bind(this);
        this.taskSortPriorityHelper = this.taskSortPriorityHelper.bind(this);
        this.taskSortAssigneeHelper = this.taskSortAssigneeHelper.bind(this);
        this.taskSortDueDateHelper = this.taskSortDueDateHelper.bind(this);
        this.handleTaskInspectorOpen = this.handleTaskInspectorOpen.bind(this);
        this.handleMoveTaskListToProject = this.handleMoveTaskListToProject.bind(this);
        this.handleChecklistSettingsOpen = this.handleChecklistSettingsOpen.bind(this);
    }

    componentDidMount(){
    }
    

    render() {
        const { theme } = this.props;

        var builtTasks = [];

        // eslint-disable-next-line
        if (this.props.tasks != undefined) {
            // Sort Tasks.
            var taskSorter = this.getTaskSorter(this.props)
            var sortedTasks = this.props.tasks.concat().sort(taskSorter);

            // Promote any new Tasks to begining of Array.
            var newTaskIndex = sortedTasks.findIndex(item => {
                return item.isNewTask === true;
            })

            if (newTaskIndex > 0) { // Catches -1 and 0 (no Promotion Required)
                sortedTasks.unshift(sortedTasks.splice(newTaskIndex, 1)[0]);
            }

            builtTasks = sortedTasks.map((item, index, array) => {
                
                // Render Element.
                var isTaskSelected = item.uid === this.props.selectedTaskId;
                var isTaskMoving = item.uid === this.props.movingTaskId;
                var showDivider = array.length !== 1 && index !== array.length - 1;

                var hasUnseenComments = item.unseenTaskCommentMembers !== undefined &&
                 item.unseenTaskCommentMembers[getUserUid()] !== undefined;

                var metadata = item.metadata === undefined ? Object.assign({}, new TaskMetadataStore("", "", "", "", "")) 
                : item.metadata; 
                var assignedToDisplayName = GetDisplayNameFromLookup(item.assignedTo, this.props.memberLookup);
                var isOptionsOpen = item.uid === this.props.openTaskOptionsId;

                    return (
                            <Task key={item.uid} isSelected={isTaskSelected} taskId={item.uid} text={item.taskName} dueDate={item.dueDate}
                                isComplete={item.isComplete} isMoving={isTaskMoving}
                                handleClick={this.handleTaskClick} onTaskCheckBoxClick={this.handleTaskCheckBoxClick}
                                onTaskTwoFingerTouch={this.handleTaskTwoFingerTouch}
                                onTaskInspectorOpen={this.handleTaskInspectorOpen}
                                isHighPriority={item.isHighPriority}
                                metadata={metadata} disableAnimations={this.props.disableAnimations}
                                assignedToDisplayName={assignedToDisplayName}
                                onTaskOptionsDeleteButtonClick={this.handleTaskOptionsDeleteButtonClick}
                                onTaskOptionsOpen={this.handleTaskOptionsOpen} isOptionsOpen={isOptionsOpen}
                                onTaskOptionsCancel={this.handleTaskOptionsCancel}
                                onOpenTextInput={this.handleTaskOpenTextInput}
                                note={item.note}
                                hasUnseenComments={hasUnseenComments}
                                showDivider={showDivider}
                            />
                    )
            })
        }

        var isSettingsMenuOpen = this.props.openTaskListSettingsMenuId === this.props.taskListWidgetId;
        return (
            <div className="TaskListWidget" data-isfocused={this.props.isFocused} onClick={this.handleWidgetClick}>
                <Paper>
                    <ListToolbar headerText={this.props.taskListName}
                        onHeaderPress={this.handleHeaderPress} isFocused={this.props.isFocused}
                        onHeaderDoubleClick={this.handleHeaderDoubleClick}
                        onRemoveButtonClick={this.handleRemoveButtonClick} isSettingsMenuOpen={isSettingsMenuOpen}
                        onTaskListSettingsChanged={this.handleTaskListSettingsChanged}
                        settings={this.props.settings} onSettingsButtonClick={this.handleSettingsButtonClick}
                        onSettingsMenuClose={this.handleSettingsMenuClose}
                        projects={this.props.projects} onMoveTaskListToProject={this.handleMoveTaskListToProject}
                        onRenewNowButtonClick={this.handleRenewNowButtonClick}
                        projectId={this.props.projectId}
                        onChecklistSettingsOpen={this.handleChecklistSettingsOpen}
                        isChecklistSettingsOpen={this.props.isChecklistSettingsOpen}
                        onChecklistSettingsClose={this.props.onChecklistSettingsClose} />
                    <TaskArea>
                    <List disablePadding={true} dense={true}>
                        {builtTasks}
                    </List>
                            
                    </TaskArea>
                </Paper>
            </div>
        )
    }

    handleChecklistSettingsOpen() {
        this.props.onChecklistSettingsOpen(this.props.taskListWidgetId);
    }

    handleMoveTaskListToProject(targetProjectId) {
        this.props.onMoveTaskListToProject(this.props.projectId, targetProjectId, this.props.taskListWidgetId)
    }

    handleRenewNowButtonClick() {
        this.props.onRenewNowButtonClick(this.props.taskListWidgetId);
    }

    handleTaskOpenTextInput(element) {
        this.props.onTaskOpenTextInput(element, this.props.taskListWidgetId);
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

    handleSettingsButtonClick() {
        this.props.onTaskListSettingsButtonClick(this.props.taskListWidgetId);
    }

    handleTaskListSettingsChanged(newSettings, closeMenu) {
        this.props.onSettingsChanged(this.props.taskListWidgetId, newSettings, closeMenu);
    }

    handleTaskTwoFingerTouch(taskId) {
        this.props.onTaskTwoFingerTouch(this.props.taskListWidgetId, taskId);
    }

    handleWidgetClick(e) {
        this.props.onWidgetClick(this.props.taskListWidgetId, this.props.isFocused);
    }

    handleTaskClick(element) {
        this.props.onTaskClick(element, this.props.taskListWidgetId);
    }

    handleHeaderDoubleClick() {
        this.props.onHeaderDoubleClick(this.props.taskListWidgetId);
    }

    handleHeaderPress() {
        this.props.onHeaderPress(this.props.taskListWidgetId, this.props.taskListName);
    }

    handleTaskCheckBoxClick(taskId, newValue, oldValue, currentMetadata) {
        this.props.onTaskCheckBoxClick(this.props.taskListWidgetId, taskId, newValue, oldValue, currentMetadata);
    }

    handleTaskInspectorOpen(taskId) {
        this.props.onTaskInspectorOpen(taskId);
    }

    handleRemoveButtonClick(e) {
        this.props.onRemoveButtonClick(this.props.taskListWidgetId);
    }

    taskSortAlphabeticalHelper(a,b) {
        var textA = a.taskName.toUpperCase();
        var textB = b.taskName.toUpperCase();

        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }

    taskSortIsCompletedHelper(a, b) {
        if (a.isComplete > b.isComplete) {
            return 1
        }

        if (a.isComplete < b.isComplete) {
            return -1
        }

        return this.taskSortDateAddedHelper(a,b);
    }

    taskSortPriorityHelper(a,b) {
        if (a.isHighPriority > b.isHighPriority) {
            return -1;
        }

        if (a.isHighPriority < b.isHighPriority) {
            return 1;
        }
        
        return this.taskSortDateAddedHelper(a,b);
    }

    taskSortDueDateHelper(a, b) {
        var dueDateA = a.dueDate.length === 0 ? Infinity : new Date(a.dueDate);
        var dueDateB = b.dueDate.length === 0 ? Infinity : new Date(b.dueDate);
        
        if (dueDateA > dueDateB) {
            return 1;
        }

        if (dueDateA < dueDateB) {
            return -1
        }

        return this.taskSortDateAddedHelper(a,b);
    }

    taskSortDateAddedHelper(a, b) {
        var dateAddedA = new Date(a.dateAdded);
        var dateAddedB = new Date(b.dateAdded);
        return dateAddedA - dateAddedB;
    }

    taskSortAssigneeHelper(a,b) {
        var aName = (a.assignedTo === undefined || a.assignedTo === -1 ? "aaa" : a.assignedTo).toUpperCase();
        var bName = (b.assignedTo === undefined || b.assignedTo === -1 ? "aaa" : b.assignedTo).toUpperCase();

        if (aName > bName) {
            return -1;
        }

        if (aName < bName) {
            return 1;
        }

        return this.taskSortDateAddedHelper(a,b);
        
    }

    getTaskSorter(props) {
        var sortBy = props.settings.sortBy;
        if (sortBy === "completed") {
            return this.taskSortIsCompletedHelper;
        }

        if (sortBy === "due date") {
            return this.taskSortDueDateHelper;
        }

        if (sortBy === "date added") {
            return this.taskSortDateAddedHelper;
        }

        if (sortBy === "priority") {
            return this.taskSortPriorityHelper;
        }

        if (sortBy === "assignee") {
            return this.taskSortAssigneeHelper;
        }

        if (sortBy === "alphabetical") {
            return this.taskSortAlphabeticalHelper;
        }

        else {
            return this.taskSortDateAddedHelper;
        }
    } 

}

export default withTheme()(TaskListWidget);
