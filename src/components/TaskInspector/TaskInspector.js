import React, { Component } from 'react';
import { Typography, AppBar, Toolbar, IconButton, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, Paper, ListSubheader, Grid } from '@material-ui/core';
import FullScreenView from '../../layout-components/FullScreenView';
import PriorityToggle from './PriorityToggle';
import ExpandingTextInput from '../ExpandingTextInput';
import DateInput from '../DateInput';
import { connect } from 'react-redux';

import { updateTaskDueDateAsync, updateTaskPriorityAsync, updateTaskAssignedToAsync,
    postNewCommentAsync, paginateTaskCommentsAsync, deleteTaskCommentAsync,
    updateTaskNoteAsync, closeTaskInspectorAsync } from 'handball-libs/libs/pounder-redux/action-creators';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonIcon from '@material-ui/icons/Person';
import DateInputListItem from '../DateInputListItem';
import ExpandingTextInputListItem from '../ExpandingTextInputListItem';
import ExpandingCommentPanel from '../CommentPanel/ExpandingCommentPanel';
import ExpandingMetadataListItem from './ExpandingMetadataListItem';


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

let NoTaskEntityFallback = (props) => {
    return (
        <FullScreenView>
            <Toolbar>
                <div style={toolbarStyle}>
                    <IconButton onClick={props.onBackArrowClick}>
                        <ArrowBackIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </FullScreenView>
    )
}

class TaskInspector extends Component {
    
    render() {
        let task = this.props.openTaskInspectorEntity;

        if (task === null || task === undefined) {
            return (
                <NoTaskEntityFallback
                onBackArrowClick={ () => {this.props.dispatch(closeTaskInspectorAsync())}}/>
            )
        }

        return (
            <FullScreenView>
                <Toolbar>
                    <div style={toolbarStyle}>
                        <IconButton onClick={ () => { this.props.dispatch(closeTaskInspectorAsync())}}>
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
                            <Typography color="textSecondary"> Assign to someone</Typography>
                        </ListItem>
                    </List>
                </Paper>

                <Paper style={paperStyle}>
                    <div>
                        <ExpandingCommentPanel
                            comments={this.props.taskComments}
                            isLoadingComments={this.props.isGettingTaskComments}
                            onCommentPost={(text) => { this.props.dispatch(postNewCommentAsync(task.uid, text)) }}
                            onCommentDelete={(commentId) => { this.props.dispatch(deleteTaskCommentAsync(task.uid, commentId)) }}
                            onPaginateComments={() => { this.props.dispatch(paginateTaskCommentsAsync(task.uid)) }}
                        />
                    </div>
                </Paper>

                <Paper style={paperStyle}>
                    <List>
                        <ExpandingMetadataListItem metadata={task.metadata}/>
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
        taskComments: state.taskComments,
        isGettingTaskComments: state.isGettingTaskComments,
    }
}

let VisibleTaskInspector = connect(mapStateToProps)(TaskInspector);
export default VisibleTaskInspector;