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
import SwipeableListItemAction from './SwipeableListItem/SwipeableListItemAction';

import { GetDisplayNameFromLookup } from 'handball-libs/libs/pounder-utilities';
import { getUserUid } from 'handball-libs/libs/pounder-firebase';
import { TaskMetadataStore } from 'handball-libs/libs/pounder-stores';

import { AppBar, Toolbar, Typography, Grid, withTheme, IconButton, Fab } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import AddTaskListIcon from '@material-ui/icons/PlaylistAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuIcon from '@material-ui/icons/Menu';

import MoveTaskIcon from '../icons/MoveTaskIcon';
import AddNewTaskButton from './AddNewTaskButton.js';

const primaryFabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

const secondaryFabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 90,
    left: 'auto',
    position: 'fixed',
};

class Project extends React.Component {
    constructor(props) {
        super(props);

        // Method Bindings.
        this.getTaskListsJSX = this.getTaskListsJSX.bind(this);
        this.getTasksJSX = this.getTasksJSX.bind(this);
    }

    render() {
        let { theme } = this.props;
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
                    <Toolbar>
                        <IconButton onClick={this.props.onMenuButtonClick}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6"> {this.props.projectName} </Typography>
                    </Toolbar>
                </AppBar>

                <div style={contentGridStyle}>
                    {this.getTaskListsJSX()}
                    <AddNewTaskListButton onClick={this.props.onAddNewTaskListButtonClick} />
                </div>
                        
                

                <Fab 
                color="primary" 
                style={primaryFabStyle} 
                onClick={this.props.onAddNewTaskButtonClick}>
                    <AddIcon/>
                 </Fab>

                 <Fab 
                 style={secondaryFabStyle}
                 onClick={this.props.onAddNewTaskListButtonClick}>
                    <AddTaskListIcon/>
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
            let taskListSettings = item.settings;

            return (
                <TaskList 
                key={item.uid}
                name={item.taskListName}
                isFocused={isFocused}
                onClick={ () => { this.props.onTaskListClick(item.uid) }}>
                    { this.getTasksJSX(item.uid) }
                </TaskList>
            )
        })

        return taskListsJSX;
    }

    getTasksJSX(taskListId) {
        // eslint-disable-next-line
        if (this.props.tasks !== undefined) {
            // // Sort Tasks.
            // var taskSorter = this.getTaskSorter(this.props)
            // var sortedTasks = this.props.tasks.concat().sort(taskSorter);

            let filteredTasks = this.props.tasks.filter( item => {
                return item.taskList === taskListId;
            })

            if (filteredTasks.length === 0) {
                return ( <AddNewTaskButton onClick={ () => { this.props.onAddNewTaskButtonClick(taskListId) }}/>)
            }

            let builtTasks = filteredTasks.map((item, index, array) => {
                // Render Element.
                var isTaskSelected = item.uid === this.props.selectedTaskId;
                var isTaskMoving = item.uid === this.props.movingTaskId;
                var showDivider = array.length !== 1 && index !== array.length - 1;

                var hasUnseenComments = item.unseenTaskCommentMembers !== undefined &&
                 item.unseenTaskCommentMembers[getUserUid()] !== undefined;

                var metadata = item.metadata === undefined ?  { ...new TaskMetadataStore("", "", "", "", "") }
                : item.metadata; 
                var assignedToDisplayName = GetDisplayNameFromLookup(item.assignedTo, this.props.memberLookup);

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
                    text={'1d'} color="#0F0" />

                let indicatorPanel = <IndicatorPanel
                    hasUnseenComments={hasUnseenComments}
                    hasNote={item.note !== undefined && item.note.length > 0}
                    assignedTo={item.assignedTo}
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
                        onActionClick={(type) => { this.props.onTaskActionClick(item.uid, type)}}>
                        <TaskBase
                            selected={isTaskSelected}
                            isMoving={isTaskMoving}
                            priorityIndicator={priorityIndicator}
                            checkbox={checkbox}
                            taskText={taskText}
                            dueDate={dueDate}
                            indicatorPanel={indicatorPanel}
                            onTextContainerTap={ () => { this.props.onTaskTextContainerTap(item.uid, item.taskList, item.taskName, item.metadata) }}
                            onDueDateContainerTap={ () => { this.props.onDueDateContainerTap(item.uid) }}
                        />
                    </SwipeableListItem>
                )
            })

            return builtTasks;
        }        
    }
}

export default withTheme()(Project);