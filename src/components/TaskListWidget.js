import React from 'react';
import TaskArea from '../components/TaskArea';
import Task from '../components/Task';
import ListToolbar from '../components/ListToolbar';
import '../assets/css/TaskListWidget.css';
import Ink from 'react-ink';
import { TaskMetadataStore } from 'pounder-stores';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


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
        this.handleDueDateClick = this.handleDueDateClick.bind(this);
        this.handleNewDateSubmit = this.handleNewDateSubmit.bind(this);
        this.handleTaskListSettingsChanged = this.handleTaskListSettingsChanged.bind(this);
        this.handleSettingsButtonClick = this.handleSettingsButtonClick.bind(this);
        this.handleTaskPriorityToggleClick = this.handleTaskPriorityToggleClick.bind(this);
        this.handleTaskMetadataCloseButtonClick = this.handleTaskMetadataCloseButtonClick.bind(this);
        this.handleTaskMetadataOpen = this.handleTaskMetadataOpen.bind(this);
        this.handleAssignToMember = this.handleAssignToMember.bind(this);
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
    }

    componentDidMount(){
    }
    

    render() {
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
                var isCalendarOpen = item.uid === this.props.openCalendarId;
                var isMetadataOpen = item.uid === this.props.openMetadataId;
                var renderBottomBorder = array.length !== 1 && index !== array.length - 1;
                var metadata = item.metadata === undefined ? Object.assign({}, new TaskMetadataStore("", "", "", "", "")) 
                : item.metadata; 
                var assignedTo = item.assignedTo === undefined ? -1 : item.assignedTo;
                var isOptionsOpen = item.uid === this.props.openTaskOptionsId;

                return (
                    <CSSTransition key={item.uid} classNames="TaskContainer" timeout={500} mountOnEnter={true}>
                            <Task key={index} taskId={item.uid} text={item.taskName} dueDate={item.dueDate} isMetadataOpen={isMetadataOpen}
                                isSelected={isTaskSelected} isComplete={item.isComplete} isMoving={isTaskMoving}
                                handleClick={this.handleTaskClick} onTaskCheckBoxClick={this.handleTaskCheckBoxClick}
                                onTaskTwoFingerTouch={this.handleTaskTwoFingerTouch}
                                onDueDateClick={this.handleDueDateClick}
                                isCalendarOpen={isCalendarOpen} onNewDateSubmit={this.handleNewDateSubmit} onMetadataOpen={this.handleTaskMetadataOpen}
                                isHighPriority={item.isHighPriority} onTaskMetadataCloseButtonClick={this.handleTaskMetadataCloseButtonClick}
                                onPriorityToggleClick={this.handleTaskPriorityToggleClick} renderBottomBorder={renderBottomBorder}
                                metadata={metadata} disableAnimations={this.props.disableAnimations} projectMembers={this.props.projectMembers}
                                onAssignToMember={this.handleAssignToMember} assignedTo={assignedTo}
                                onTaskOptionsDeleteButtonClick={this.handleTaskOptionsDeleteButtonClick}
                                onTaskOptionsOpen={this.handleTaskOptionsOpen} isOptionsOpen={isOptionsOpen}
                                onTaskOptionsCancel={this.handleTaskOptionsCancel}
                                onOpenTextInput={this.handleTaskOpenTextInput} />
                    </CSSTransition>
                )
            })
        }

        var isSettingsMenuOpen = this.props.openTaskListSettingsMenuId === this.props.taskListWidgetId;
        return (
            <div className="TaskListWidget" data-isfocused={this.props.isFocused} onClick={this.handleWidgetClick}>
                <ListToolbar headerText={this.props.taskListName}
                 onHeaderPress={this.handleHeaderPress} isFocused={this.props.isFocused}
                 onHeaderDoubleClick={this.handleHeaderDoubleClick}
                 onRemoveButtonClick={this.handleRemoveButtonClick} isSettingsMenuOpen={isSettingsMenuOpen}
                 onTaskListSettingsChanged={this.handleTaskListSettingsChanged}
                 settings={this.props.settings} onSettingsButtonClick={this.handleSettingsButtonClick}
                 onSettingsMenuClose={this.handleSettingsMenuClose}/>
                 <TaskArea>
                 <TransitionGroup enter={!this.props.disableAnimations} exit={!this.props.disableAnimations}>
                     {builtTasks}
                 </TransitionGroup>
             </TaskArea>
            </div>
        )
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

    handleAssignToMember(newUserId, oldUserId, taskId) {
        this.props.onAssignToMember(newUserId, oldUserId, taskId);
    }

    handleTaskMetadataOpen(taskId) {
        this.props.onTaskMetadataOpen(this.props.taskListWidgetId, taskId);
    }

    handleTaskMetadataCloseButtonClick() {
        this.props.onTaskMetadataCloseButtonClick();
    }

    handleTaskPriorityToggleClick(taskId, newValue, oldValue, currentMetadata) {
        this.props.onTaskPriorityToggleClick(taskId, newValue, oldValue, currentMetadata);
    }

    handleSettingsButtonClick() {
        this.props.onTaskListSettingsButtonClick(this.props.taskListWidgetId);
    }

    handleTaskListSettingsChanged(newSettings, closeMenu) {
        this.props.onSettingsChanged(this.props.taskListWidgetId, newSettings, closeMenu);
    }

    handleDueDateClick(taskId) {
        this.props.onDueDateClick(this.props.taskListWidgetId, taskId);
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

    handleNewDateSubmit(taskId, newDate, oldDate, currentMetadata) {
        this.props.onNewDateSubmit(this.props.taskListWidgetId, taskId, newDate, oldDate, currentMetadata);
    }

}

export default TaskListWidget;
