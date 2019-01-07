import React from 'react';
import TaskList from './TaskList';
import TaskBase from './Task/TaskBase';
import DueDate from './Task/DueDate';
import IndicatorPanel from './Task/IndicatorPanel';
import PriorityIndicator from './Task/PriorityIndicator';
import TaskCheckbox from './Task/TaskCheckbox';
import TaskText from './Task/TaskText';
import AddNewTaskListButton from './AddNewTaskListButton';

import { GetDisplayNameFromLookup } from 'handball-libs/libs/pounder-utilities';
import { getUserUid } from 'handball-libs/libs/pounder-firebase';
import { TaskMetadataStore } from 'handball-libs/libs/pounder-stores';

import { AppBar, Toolbar, Typography, Grid, withTheme, Button, Fab } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import AddTaskListIcon from '@material-ui/icons/PlaylistAdd';

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
            marginTop: '56px', // Clear the AppBar
            marginBottom: '120px' // Clear the Fabs at lowest Scroll Point
        }

        return (
            <React.Fragment>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6"> {this.props.projectName} </Typography>
                    </Toolbar>
                </AppBar>

                <Grid style={contentGridStyle}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center">
                    {this.getTaskListsJSX()}
                    <AddNewTaskListButton/>
                </Grid>

                <Fab color="primary" style={primaryFabStyle}>
                    <AddIcon/>
                 </Fab>

                 <Fab style={secondaryFabStyle}>
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
                <TaskList key={item.uid} name={item.taskListName}>
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

                return (
                    <TaskBase
                    key={item.uid}
                    selected={isTaskSelected}
                    isMoving={isTaskMoving}
                    priorityIndicator={priorityIndicator}
                    checkbox={checkbox}
                    taskText={taskText}
                    dueDate={dueDate}
                    indicatorPanel={indicatorPanel}
                    />
                )
            })

            return builtTasks;
        }        
    }
}

export default withTheme()(Project);