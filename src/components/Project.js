import React from 'react';
import TaskList from './TaskList';
import TaskBase from './Task/TaskBase';
import DueDate from './Task/DueDate';
import IndicatorPanel from './Task/IndicatorPanel';
import PriorityIndicator from './Task/PriorityIndicator';
import TaskCheckbox from './Task/TaskCheckbox';
import TaskText from './Task/TaskText';
import AddNewTaskListButton from './AddNewTaskListButton';
import SwipeableListItem from './SwipeableListItem/SwipeableListItem';
import RenewChecklistButton from './RenewChecklistButton'
import MoveTaskIcon from '../icons/MoveTaskIcon';
import AddNewTaskButton from './AddNewTaskButton.js';
import ProjectMenu from './ProjectMenu';

import {
    GetDisplayNameFromLookup, TaskDueDateSorter, TaskCompletedSorter, TaskDateAddedSorter, TaskAssigneeSorter,
    TaskPrioritySorter, TaskAlphabeticalSorter
} from 'handball-libs/libs/pounder-utilities';
import { getUserUid } from 'handball-libs/libs/pounder-firebase';
import { TaskMetadataStore } from 'handball-libs/libs/pounder-stores';
import { ParseDueDate } from 'handball-libs/libs/pounder-utilities';

import { AppBar, Toolbar, Typography, withTheme, IconButton, Fab} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import AddTaskListIcon from '@material-ui/icons/PlaylistAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuIcon from '@material-ui/icons/Menu';

let styles = theme => {
    let primaryFabBase = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    }

    let secondaryFabBase = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 90,
        left: 'auto',
        position: 'fixed',
    }

    return {
        primaryFabMoveUp: {
            ...primaryFabBase,
            transform: 'translate3d(0, -46px, 0)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.easeOut,
            }),
        },
    
        primaryFabMoveDown: {
            ...primaryFabBase,
            transform: 'translate3d(0, 0, 0)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
            }),
        },

        secondaryFabMoveUp: {
            ...secondaryFabBase,
            transform: 'translate3d(0, -46px, 0)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.easeOut,
            }),
        },

        secondaryFabMoveDown: {
            ...secondaryFabBase,
            transform: 'translate3d(0, 0, 0)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
            }),
        }
    }
};

const projectMenuButtonContainer = {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center'
}

class Project extends React.Component {
    constructor(props) {
        super(props);

        // Method Bindings.
        this.getTaskListsJSX = this.getTaskListsJSX.bind(this);
        this.getTasksJSX = this.getTasksJSX.bind(this);
        this.getTaskFilter = this.getTaskFilter.bind(this);
        this.getTaskSorter = this.getTaskSorter.bind(this);
    }

    render() {
        let { theme, classes } = this.props;
        const primaryFabClassName = this.props.isASnackbarOpen ? classes['primaryFabMoveUp'] : classes['primaryFabMoveDown'];
        const secondaryFabClassName = this.props.isASnackbarOpen ? classes['secondaryFabMoveUp'] : classes['secondaryFabMoveDown'];

        let contentGridStyle = {
            height: '100%',
            background: theme.palette.background.default,
            paddingTop: '56px', // Clear the AppBar
            paddingBottom: '160px', // Clear the Fabs at lowest Scroll Point
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            overflowY: 'scroll',
        }

        return (
            <React.Fragment>
                <AppBar>
                    <Toolbar
                    disableGutters={true}>
                        <IconButton
                         onClick={this.props.onMenuButtonClick}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" style={{flexGrow: 1}}> {this.props.projectName} </Typography>
                            <div style={projectMenuButtonContainer}>
                                <ProjectMenu
                                onShareMenuButtonClick={this.props.onShareMenuButtonClick}
                                onRenameProjectButtonClick={() => { this.props.onRenameProjectButtonClick(this.props.projectId, this.props.projectName) }}
                                onCompletedTasksButtonClick={this.props.onCompletedTasksButtonClick}
                                showCompletedTasks={this.props.showCompletedTasks}
                                onShowOnlySelfTasksButtonClick={this.props.onShowOnlySelfTasksButtonClick}
                                showOnlySelfTasks={this.props.showOnlySelfTasks}/>  
                                
                            </div>
                            
                    </Toolbar>
                </AppBar>

                <div style={contentGridStyle}>
                    {this.getTaskListsJSX()}
                    <AddNewTaskListButton onClick={this.props.onAddNewTaskListButtonClick} />
                </div>
                        
                <Fab
                    className={primaryFabClassName}
                    color="primary"
                    onClick={this.props.onAddNewTaskButtonClick}>
                    <AddIcon />
                </Fab>
                
                <Fab
                    className={secondaryFabClassName}
                    onClick={this.props.onAddNewTaskListButtonClick}>
                    <AddTaskListIcon />
                </Fab>

            </React.Fragment>
        )
    }

    getTaskListsJSX() {
        let filteredTaskLists = this.props.taskLists.filter(item => {
            return item.project === this.props.projectId
        })

        let taskListsJSX = filteredTaskLists.map(item => {
            // Widget Layer.
            let isFocused = this.props.focusedTaskListId === item.uid;
            let isSettingsMenuOpen = this.props.openTaskListSettingsMenuId === item.uid;

            return (
                <TaskList 
                key={item.uid}
                name={item.taskListName}
                isFocused={isFocused}
                onClick={ () => { this.props.onTaskListClick(item.uid) }}
                onTaskListSettingsChanged={(newValue) => { this.props.onTaskListSettingsChanged(item.uid, newValue) }}
                taskListSettings={item.settings}
                isSettingsMenuOpen={isSettingsMenuOpen}
                onSettingsMenuOpen={() => { this.props.onTaskListSettingsMenuOpen(item.uid) }}
                onSettingsMenuClose={this.props.onTaskListSettingsMenuClose}
                onRenameTaskListButtonClick={() => { this.props.onRenameTaskListButtonClick(item.uid, item.taskListName) }}
                onDeleteButtonClick={() => { this.props.onDeleteTaskListButtonClick(item.uid) }}
                onChecklistSettingsButtonClick={() => { this.props.onChecklistSettingsButtonClick(item.uid, item.settings.checklistSettings)}}
                onMoveTaskListButtonClick={() => { this.props.onMoveTaskListButtonClick(item.uid, item.project)}}>
                    { this.getTasksJSX(item.uid, item.settings.sortBy, item.settings.checklistSettings.isChecklist) }
                </TaskList>
            )
        })

        return taskListsJSX;
    }

    getTasksJSX(taskListId, sortBy, isChecklist) {
        if (this.props.tasks !== undefined) {
            // Filter.
            let taskFilter = this.getTaskFilter();
            let filteredTasks = this.props.tasks.filter((item) => {
                return taskFilter(item, taskListId)
            })

            if (filteredTasks.length === 0) {
                if (isChecklist) {
                    return (
                        <RenewChecklistButton
                        disabled={this.props.movingTaskId !== -1}
                        onClick={() => { this.props.onRenewChecklistButtonClick(taskListId)}} />
                    )
                }

                else {
                    return (
                        <AddNewTaskButton
                        disabled={this.props.movingTaskId !== -1}
                        onClick={() => { this.props.onAddNewTaskButtonClick(taskListId) }} />
                    )
                }
            }

            // Sort.
            filteredTasks.sort(this.getTaskSorter(sortBy));

            let builtTasks = filteredTasks.map((item, index, array) => {
                // Render Element.
                var isTaskSelected = item.uid === this.props.selectedTaskId;
                var isTaskMoving = item.uid === this.props.movingTaskId;

                var hasUnseenComments = item.unseenTaskCommentMembers !== undefined &&
                 item.unseenTaskCommentMembers[getUserUid()] !== undefined;

                var metadata = item.metadata === undefined ?  { ...new TaskMetadataStore("", "", "", "", "") }
                : item.metadata; 
                let assignedToDisplayName = GetDisplayNameFromLookup(item.assignedTo, this.props.memberLookup);

                let priorityIndicator = <PriorityIndicator
                    isHighPriority={item.isHighPriority}
                />

                let checkbox = <TaskCheckbox
                    checked={item.isComplete}
                    onChange={(newValue, oldValue) => { this.props.onTaskCheckboxChange(item.uid, newValue, oldValue, metadata) }}
                />

                let taskText = <TaskText
                    text={item.taskName}
                />

                let dueDate = <DueDate
                    {...this.getDueDateProps(item.isComplete, item.dueDate, this.props.theme)}/>

                let indicatorPanel = <IndicatorPanel
                    hasUnseenComments={hasUnseenComments}
                    hasNote={item.note !== undefined && item.note.length > 0}
                    assignedTo={item.assignedTo}
                    assignedToDisplayName={assignedToDisplayName}
                />

                let leftActions = [
                    { value: 'moveTask', background: this.props.theme.palette.primary.light, icon: <MoveTaskIcon/> }
                ]

                let rightActions = [
                    { value: 'deleteTask', background: this.props.theme.palette.error.dark, icon: <DeleteIcon/>}
                ]

                return (
                    <SwipeableListItem
                        key={item.uid}
                        leftActions={leftActions}
                        rightActions={rightActions}
                        onActionClick={(value) => { this.props.onTaskActionClick(value, item.uid, item.taskList) }}>
                        <TaskBase
                            selected={isTaskSelected}
                            isMoving={isTaskMoving}
                            priorityIndicator={priorityIndicator}
                            checkbox={checkbox}
                            taskText={taskText}
                            dueDate={dueDate}
                            indicatorPanel={indicatorPanel}
                            onTextContainerTap={ () => { this.props.onTaskTextContainerTap() }}
                            onPress={ () => { this.props.onTaskPress(item.uid, item.taskList, item.taskName, item.metadata) }}
                            onDueDateContainerTap={ () => { this.props.onDueDateContainerTap(item.uid) }}
                        />
                    </SwipeableListItem>
                )
            })

            return builtTasks;
        }        
    }

    getTaskSorter(sortBy) {
        switch(sortBy) {
            case 'completed':
            return TaskCompletedSorter;

            case 'due date':
            return TaskDueDateSorter;

            case 'date added':
            return TaskDateAddedSorter;

            case 'priority':
            return TaskPrioritySorter;

            case 'assignee':
            return TaskAssigneeSorter;

            case 'alphabetical':
            return TaskAlphabeticalSorter;

            default:
            return TaskPrioritySorter;
        }
    }

    getTaskFilter() {
        if (this.props.showOnlySelfTasks === true) {
            return this.showOnlySelfTasksFilter;
        }

        else {
            return this.standardTaskFilter;
        }
    }

    standardTaskFilter(task, taskListId) {
        return task.taskList === taskListId;
    }

    showOnlySelfTasksFilter(task, taskListId) {
        return task.taskList === taskListId && task.assignedTo === getUserUid();
    }

    getDueDateProps(isComplete, dueDate, theme) {
        let result = ParseDueDate(isComplete, dueDate);

        if (result.type === 'unset') {
            return {
                type: 'unset'
            } 
        }

        return {
            color: theme.palette.custom[result.type], // Extract color from Theme
            text: result.text,
        }
    }
}

export default (withTheme()(withStyles(styles)(Project)));