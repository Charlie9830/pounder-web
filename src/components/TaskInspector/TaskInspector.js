import React, { Component } from 'react';
import { Typography, AppBar, Toolbar, IconButton, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, Paper, ListSubheader } from '@material-ui/core';
import FullScreenView from '../../layout-components/FullScreenView';
import PriorityToggle from './PriorityToggle';
import ExpandingTextInput from '../ExpandingTextInput';
import DateInput from '../DateInput';
import { connect } from 'react-redux';

import { updateTaskDueDateAsync, updateTaskPriorityAsync, updateTaskAssignedToAsync,
    postNewCommentAsync, paginateTaskCommentsAsync, deleteTaskCommentAsync,
    updateTaskNoteAsync, closeTaskInspectorAsync } from 'handball-libs/libs/pounder-redux/action-creators';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import NoteIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import ClockIcon from '@material-ui/icons/AccessTime';
import DateInputListItem from '../DateInputListItem';
import ExpandingTextInputListItem from '../ExpandingTextInputListItem';


let toolbarStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
}

let paperStyle = {
    marginLeft: '8px',
    marginRight: '8px',
    marginBottom: '16px'
}

class TaskInspector extends Component {    
    render() {
        let task = this.props.openTaskInspectorEntity;
        return (
            <FullScreenView>
                <Toolbar>
                    <div style={toolbarStyle}>
                        <IconButton>
                            <ArrowBackIcon />
                        </IconButton>
                        <PriorityToggle 
                        isHighPriority={task.isHighPriority}
                        onToggle={ (newValue) => { this.props.dispatch(updateTaskPriorityAsync(task.uid, newValue, task.isHighPriority))}} />
                    </div>
                </Toolbar>

                <Paper style={paperStyle}>
                    <List>
                        <DateInputListItem 
                        clearable={true}
                        autoOk={true}
                        placeholder="Add due date"
                        value={task.dueDate}
                        onChange={(newValue) => { this.props.dispatch(updateTaskDueDateAsync(task.uid, newValue, task.dueDate))}}
                        />
                        
                        <ExpandingTextInputListItem
                        placeholder="Add details"
                        value={task.note}
                        onChange={ (newValue) => { this.props.dispatch(updateTaskNoteAsync(newValue, task.note, task.uid))} }/>

                        <ListItem>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <Typography color="textSecondary"> Assign to somebody </Typography>
                        </ListItem>

                    </List>
                </Paper>
            </FullScreenView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        openTaskInspectorId: state.openTaskInspectorId,
        openTaskInspectorEntity: state.openTaskInspectorEntity,
    }
}

let VisibleTaskInspector = connect(mapStateToProps)(TaskInspector);
export default VisibleTaskInspector;