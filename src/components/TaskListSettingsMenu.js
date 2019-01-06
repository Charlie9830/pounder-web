import React from 'react';
import '../assets/css/TaskListSettingsMenu.css'
import { TaskListSettingsStore, ChecklistSettingsFactory } from 'handball-libs/libs/pounder-stores';
import { getNormalizedDate } from 'handball-libs/libs/pounder-utilities';
import ChecklistSettings from './ChecklistSettings';
import ChecklistSettingsDialog from './ChecklistSettingsDialog';
import MenuHeader from './MenuHeader';
import MenuSubtitle from './MenuSubtitle';
import Moment from 'moment';

import { Grid,Typography, List, ListItemText, Menu, MenuItem, ListSubheader, Divider, ListItemIcon,
     ListItem, Checkbox, Paper, Select, Button  } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import MoveTaskListDialog from './MoveTaskListDialog';

var isCompleteTasksShown = false; // To Preserve backwards compatability of pre Show Complete Tasks change versions when using current Task lists.

class TaskListSettingsMenu extends React.Component {
    constructor(props) {
        super(props);

        // State.
        this.state = {
            isMoveDialogOpen: false,
        }

        // Refs.
        this.moveToProjectSelectorRef = React.createRef();

        // Method Bindings.
        this.handleSortByCompletedTasksItemClick = this.handleSortByCompletedTasksItemClick.bind(this);
        this.handleSortByDateAddedItemClick = this.handleSortByDateAddedItemClick.bind(this);
        this.handleSortByDueDateItemClick = this.handleSortByDueDateItemClick.bind(this);
        this.handleSortByPriorityItemClick = this.handleSortByPriorityItemClick.bind(this);
        this.handleSortByAssigneeItemClick = this.handleSortByAssigneeItemClick.bind(this);
        this.handleSortByAlphabeticalItemClick = this.handleSortByAlphabeticalItemClick.bind(this);
        this.handleChecklistModeChange = this.handleChecklistModeChange.bind(this);
        this.handleInitialStartDayPick = this.handleInitialStartDayPick.bind(this);
        this.handleRenewIntervalChange = this.handleRenewIntervalChange.bind(this);
        this.handleRenewNowButtonClick = this.handleRenewNowButtonClick.bind(this);
        this.handleMenuHeaderBackButtonClick = this.handleMenuHeaderBackButtonClick.bind(this);
        this.handleMoveListToProjectClick = this.handleMoveListToProjectClick.bind(this);
        this.handleMoveProjectDialogAccept = this.handleMoveProjectDialogAccept.bind(this);
        this.handleMoveProjectDialogCancel = this.handleMoveProjectDialogCancel.bind(this);
        this.handleChecklistSettingsClick = this.handleChecklistSettingsClick.bind(this);
        this.handleChecklistSettingsBackArrowClick = this.handleChecklistSettingsBackArrowClick.bind(this);
    }

    render() {
        let sortBy = this.props.settings.sortBy;

        return (
            <React.Fragment>
                <MoveTaskListDialog isOpen={this.state.isMoveDialogOpen} projects={this.props.projects} currentProjectId={this.props.currentProjectId}
                    onMoveButtonClick={this.handleMoveProjectDialogAccept} onCancelButtonClick={this.handleMoveProjectDialogCancel} />

                <ChecklistSettingsDialog isOpen={this.props.isChecklistSettingsOpen} onBackArrowClick={this.props.onChecklistSettingsClose}
                    isChecklist={this.props.settings.checklistSettings.isChecklist} onChecklistModeChange={this.handleChecklistModeChange}
                    />

                <Menu onBackdropClick={() => { this.props.onSettingsMenuClose() }} open={this.props.isOpen}>
                    <ListSubheader> Sort by </ListSubheader>
                    <MenuItem selected={sortBy === "due date"} onClick={this.handleSortByDueDateItemClick}> Due Date </MenuItem>
                    <MenuItem selected={sortBy === "date added"} onClick={this.handleSortByDateAddedItemClick}> Date Added </MenuItem>
                    <MenuItem selected={sortBy === "completed"} onClick={this.handleSortByCompletedTasksItemClick}> Completed </MenuItem>
                    <MenuItem selected={sortBy === "priority"} onClick={this.handleSortByPriorityItemClick}> Priority </MenuItem>
                    <MenuItem selected={sortBy === "assignee"} onClick={this.handleSortByAssigneeItemClick}> Assignee </MenuItem>
                    <MenuItem selected={sortBy === "alphabetical"} onClick={this.handleSortByAlphabeticalItemClick}> Alphabetically </MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleMoveListToProjectClick}> Move list</MenuItem>
                    <MenuItem onClick={this.handleChecklistSettingsClick}> Checklist Settings</MenuItem>
                    <Divider />
                    <MenuItem onClick={this.props.onRemoveButtonClick}>
                        <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Delete List" />
                    </MenuItem>
                </Menu>
            </React.Fragment>
        )
    }

    handleChecklistSettingsBackArrowClick() {
        this.setState({ isChecklistSettingsDialogOpen: false });
    }

    handleChecklistSettingsClick() {
        this.props.onChecklistSettingsOpen();
    }

    handleMoveProjectDialogAccept(targetProjectId) {
        this.setState({ isMoveDialogOpen: false });
        this.props.onMoveTaskListToProject(targetProjectId);
    }

    handleMoveProjectDialogCancel() {
        this.setState({ isMoveDialogOpen: false });
    }

    handleMoveListToProjectClick() {
        this.setState({ isMoveDialogOpen: true });
    }

    getChecklistSettingsJSX() {
        return (
            <Grid container
                direction="column"
                justify="flex-start"
                alignItems="stretch">
                <ChecklistSettings onChecklistModeChange={this.handleChecklistModeChange} settings={this.props.settings.checklistSettings}
                    onInitialStartDayPick={this.handleInitialStartDayPick} onRenewNowButtonClick={this.handleRenewNowButtonClick}
                    onRenewIntervalChange={this.handleRenewIntervalChange} />
            </Grid>
        )
    }
    
    handleMenuHeaderBackButtonClick() {
        this.props.onSettingsMenuClose();
    }

    handleRenewNowButtonClick() {
        this.props.onRenewNowButtonClick();
    }

    handleRenewIntervalChange(renewInterval) {
        var newChecklistSettings = {
            ...this.props.settings.checklistSettings,
            renewInterval: renewInterval,
        };

        this.props.onSettingsChanged(new TaskListSettingsStore(
            isCompleteTasksShown,
            this.props.settings.sortBy,
            newChecklistSettings
        ))
    }

    handleInitialStartDayPick(isoStartDate) {
        var newChecklistSettings = {
            ...this.props.settings.checklistSettings,
            initialStartDate: isoStartDate,
        }

        this.props.onSettingsChanged(new TaskListSettingsStore(
            isCompleteTasksShown,
            this.props.settings.sortBy,
            newChecklistSettings,
        ))
    }
    
    handleChecklistModeChange(newValue) {
        var checklistSettings = {};

        if (newValue === true) {
            var initialStartDate = Moment().add(1, 'day');
            var renewInterval = 1;
            var lastRenewDate = "";

            checklistSettings = ChecklistSettingsFactory(
                newValue,
                getNormalizedDate(initialStartDate),
                lastRenewDate,
                renewInterval
            );
        }

        else {
            checklistSettings = ChecklistSettingsFactory(false,"", "", 1);
        }

        this.props.onSettingsChanged(new TaskListSettingsStore(
            isCompleteTasksShown,
            this.props.settings.sortBy,
            checklistSettings,
        ), false)
    }
    
    handleSortByCompletedTasksItemClick(e) {
        this.props.onSettingsChanged(new TaskListSettingsStore(isCompleteTasksShown, "completed", this.props.settings.checklistSettings), true);
    }

    handleSortByDueDateItemClick(e) {
        this.props.onSettingsChanged(new TaskListSettingsStore(isCompleteTasksShown, "due date", this.props.settings.checklistSettings), true);
    }

    handleSortByDateAddedItemClick(e) {
        this.props.onSettingsChanged(new TaskListSettingsStore(isCompleteTasksShown, "date added", this.props.settings.checklistSettings), true);
    }

    handleSortByPriorityItemClick(e) {
        this.props.onSettingsChanged(new TaskListSettingsStore(isCompleteTasksShown, "priority", this.props.settings.checklistSettings), true);
    }

    handleSortByAssigneeItemClick() {
        this.props.onSettingsChanged(new TaskListSettingsStore(isCompleteTasksShown, "assignee", this.props.settings.checklistSettings), true);
    }

    handleSortByAlphabeticalItemClick() {
        this.props.onSettingsChanged(new TaskListSettingsStore(isCompleteTasksShown, "alphabetical", this.props.settings.checklistSettings), true);
    }
}

export default TaskListSettingsMenu;