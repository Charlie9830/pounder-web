import React from 'react';
import Project from './Project';
import TextInputDialog from './dialogs/TextInputDialog';
import TaskInspector from './TaskInspector/TaskInspector';

import '../assets/css/App.css';

import { connect } from 'react-redux';
import {
    updateTaskCompleteAsync, setIsAppDrawerOpen, attachAuthListenerAsync, setFocusedTaskListId,
    updateTaskNameAsync, addNewTaskAsync, addNewTaskListAsync, openTaskInspectorAsync, selectProject,
    setIsShareMenuOpen, updateProjectNameAsync, setShowCompletedTasksAsync, setShowOnlySelfTasks,
    startTaskMoveAsync, moveTaskAsync, updateTaskListSettingsAsync, setOpenTaskListSettingsMenuId,
    updateTaskListNameAsync, removeTaskListAsync, openChecklistSettings, manuallyRenewChecklistAsync,
    getLocalMuiThemes, getGeneralConfigAsync, moveTaskListToProjectAsync,
    openJumpMenu, closeJumpMenu,
} from 'handball-libs/libs/pounder-redux/action-creators';

import { Drawer, CssBaseline, withTheme } from '@material-ui/core';
import VisibleAppDrawer from './AppDrawer';
import VisibleAppSettingsMenu from './AppSettingsMenu/AppSettingsMenu';
import VisibleShareMenu from './ShareMenu/ShareMenu';
import InformationDialog from './dialogs/InformationDialog';
import ConfirmationDialog from './dialogs/ConfirmationDialog';
import GeneralSnackbar from './Snackbars/GeneralSnackbar';
import VisibleChecklistSettingsMenu from './ChecklistSettingsMenu.js/ChecklistSettingsMenu';
import VisibleThemeSettings from './AppSettingsMenu/ThemeSettings';
import ItemSelectDialog from './dialogs/ItemSelectDialog';

class App extends React.Component {
    constructor(props) {
        super(props);

        // Method Bindings.
        this.handleTaskCheckboxChange = this.handleTaskCheckboxChange.bind(this);
        this.handleTaskActionClick = this.handleTaskActionClick.bind(this);
        this.handleProjectMenuButtonClick = this.handleProjectMenuButtonClick.bind(this);
        this.handleTaskListClick = this.handleTaskListClick.bind(this);
        this.handleTaskTextContainerTap = this.handleTaskTextContainerTap.bind(this);
        this.handleAddNewTaskButtonClick = this.handleAddNewTaskButtonClick.bind(this);
        this.handleAddNewTaskListButtonClick = this.handleAddNewTaskListButtonClick.bind(this);
        this.handleDueDateContainerTap = this.handleDueDateContainerTap.bind(this);
        this.handleShareMenuButtonClick = this.handleShareMenuButtonClick.bind(this);
        this.handleRenameProjectButtonClick = this.handleRenameProjectButtonClick.bind(this);
        this.handleCompletedTasksButtonClick = this.handleCompletedTasksButtonClick.bind(this);
        this.handleShowOnlySelfTasksButtonClick = this.handleShowOnlySelfTasksButtonClick.bind(this);
        this.handleTaskPress = this.handleTaskPress.bind(this);
        this.handleTaskListSettingsChanged = this.handleTaskListSettingsChanged.bind(this);
        this.handleTaskListSettingsMenuOpen = this.handleTaskListSettingsMenuOpen.bind(this);
        this.handleTaskListSettingsMenuClose = this.handleTaskListSettingsMenuClose.bind(this);
        this.handleRenameTaskListButtonClick = this.handleRenameTaskListButtonClick.bind(this);
        this.handleDeleteTaskListButtonClick = this.handleDeleteTaskListButtonClick.bind(this);
        this.handleChecklistSettingsButtonClick = this.handleChecklistSettingsButtonClick.bind(this);
        this.handleRenewChecklistButtonClick = this.handleRenewChecklistButtonClick.bind(this);
        this.handleMoveTaskListButtonClick = this.handleMoveTaskListButtonClick.bind(this);
        this.handleJumpMenuOpen = this.handleJumpMenuOpen.bind(this);
        this.handleJumpMenuClose = this.handleJumpMenuClose.bind(this);
    }

    componentDidMount() {
        // Attach an Authentication state listener. Will pull down database when Logged in.
        this.props.dispatch(attachAuthListenerAsync());

        // Get General Config
        this.props.dispatch(getGeneralConfigAsync());

        // Get Mui Themes.
        this.props.dispatch(getLocalMuiThemes());

        // this.props.dispatch(setIsAppSettingsOpen(true));
        // this.props.dispatch(setAppSettingsMenuPage('general'));
    }
    

    render() {
        return (
                <React.Fragment>
                    <CssBaseline />

                    <Drawer
                        open={this.props.isShareMenuOpen}
                        anchor="left">
                        <VisibleShareMenu />
                    </Drawer>

                    <Drawer
                        open={this.props.openTaskInspectorId !== -1 && this.props.openTaskInspectorEntity !== null}
                        anchor="left">
                        <TaskInspector />
                    </Drawer>

                    <Drawer open={this.props.isAppDrawerOpen} anchor="left">
                        <VisibleAppDrawer />
                    </Drawer>

                    <Drawer open={this.props.isAppSettingsOpen} anchor="left">
                        <VisibleAppSettingsMenu />
                    </Drawer>

                    <Drawer open={this.props.openChecklistSettingsId !== -1} anchor="left">
                        <VisibleChecklistSettingsMenu />
                    </Drawer>

               

                    <Project
                        projectId={this.props.selectedProjectId}
                        projectName={this.getProjectName(this.props.projects, this.props.selectedProjectId)}
                        tasks={this.getProjectRelatedTasks(this.props.tasks, this.props.selectedProjectId)}
                        taskLists={this.props.taskLists}
                        focusedTaskListId={this.props.focusedTaskListId}
                        onTaskCheckboxChange={this.handleTaskCheckboxChange}
                        onTaskActionClick={this.handleTaskActionClick}
                        onMenuButtonClick={this.handleProjectMenuButtonClick}
                        onTaskListClick={this.handleTaskListClick}
                        onTaskTextContainerTap={this.handleTaskTextContainerTap}
                        onTaskPress={this.handleTaskPress}
                        onAddNewTaskButtonClick={this.handleAddNewTaskButtonClick}
                        onAddNewTaskListButtonClick={this.handleAddNewTaskListButtonClick}
                        onDueDateContainerTap={this.handleDueDateContainerTap}
                        onShareMenuButtonClick={this.handleShareMenuButtonClick}
                        isASnackbarOpen={this.props.isASnackbarOpen}
                        onRenameProjectButtonClick={this.handleRenameProjectButtonClick}
                        onCompletedTasksButtonClick={this.handleCompletedTasksButtonClick}
                        showCompletedTasks={this.props.showCompletedTasks}
                        memberLookup={this.props.memberLookup}
                        onShowOnlySelfTasksButtonClick={this.handleShowOnlySelfTasksButtonClick}
                        showOnlySelfTasks={this.props.showOnlySelfTasks}
                        movingTaskId={this.props.movingTaskId}
                        onTaskListSettingsChanged={this.handleTaskListSettingsChanged}
                        openTaskListSettingsMenuId={this.props.openTaskListSettingsMenuId}
                        onTaskListSettingsMenuOpen={this.handleTaskListSettingsMenuOpen}
                        onTaskListSettingsMenuClose={this.handleTaskListSettingsMenuClose}
                        onRenameTaskListButtonClick={this.handleRenameTaskListButtonClick}
                        onDeleteTaskListButtonClick={this.handleDeleteTaskListButtonClick}
                        onChecklistSettingsButtonClick={this.handleChecklistSettingsButtonClick}
                        onRenewChecklistButtonClick={this.handleRenewChecklistButtonClick}
                        onMoveTaskListButtonClick={this.handleMoveTaskListButtonClick}
                        onJumpMenuOpen={this.handleJumpMenuOpen}
                        onJumpMenuClose={this.handleJumpMenuClose}
                        isJumpMenuOpen={this.props.isJumpMenuOpen}
                    />

                    <TextInputDialog
                        isOpen={this.props.textInputDialog.isOpen}
                        title={this.props.textInputDialog.title}
                        text={this.props.textInputDialog.text}
                        label={this.props.textInputDialog.label}
                        onCancel={this.props.textInputDialog.onCancel}
                        onOkay={this.props.textInputDialog.onOkay}
                    />

                    <InformationDialog
                        isOpen={this.props.informationDialog.isOpen}
                        title={this.props.informationDialog.title}
                        text={this.props.informationDialog.text}
                        onOkay={this.props.informationDialog.onOkay}
                    />

                    <ConfirmationDialog
                        isOpen={this.props.confirmationDialog.isOpen}
                        title={this.props.confirmationDialog.title}
                        text={this.props.confirmationDialog.text}
                        affirmativeButtonText={this.props.confirmationDialog.affirmativeButtonText}
                        negativeButtonText={this.props.confirmationDialog.negativeButtonText}
                        onAffirmative={this.props.confirmationDialog.onAffirmative}
                        onNegative={this.props.confirmationDialog.onNegative}
                    />

                <ItemSelectDialog
                    isOpen={this.props.itemSelectDialog.isOpen}
                    title={this.props.itemSelectDialog.title}
                    text={this.props.itemSelectDialog.text}
                    items={this.props.itemSelectDialog.items}
                    affirmativeButtonText={this.props.itemSelectDialog.affirmativeButtonText}
                    negativeButtonText={this.props.itemSelectDialog.negativeButtonText}
                    onAffirmative={this.props.itemSelectDialog.onAffirmative}
                    onNegative={this.props.itemSelectDialog.onNegative} />

                    <GeneralSnackbar
                        isOpen={this.props.generalSnackbar.isOpen}
                        type={this.props.generalSnackbar.type}
                        text={this.props.generalSnackbar.text}
                        actionButtonText={this.props.generalSnackbar.actionOptions.actionButtonText}
                        onAction={this.props.generalSnackbar.actionOptions.onAction}
                    />
                </React.Fragment>
        )
    }

    handleJumpMenuOpen() {
        this.props.dispatch(openJumpMenu())
    }

    handleJumpMenuClose() {
        this.props.dispatch(closeJumpMenu());
    }

    handleMoveTaskListButtonClick(taskListId, projectId) {
        this.props.dispatch(setOpenTaskListSettingsMenuId(-1));
        this.props.dispatch(moveTaskListToProjectAsync(taskListId, projectId))
    }

    handleRenewChecklistButtonClick(taskListId) {
        this.props.dispatch(manuallyRenewChecklistAsync(taskListId));
    }

    handleChecklistSettingsButtonClick(taskListId, existingChecklistSettings) {
        this.props.dispatch(setOpenTaskListSettingsMenuId(-1));
        this.props.dispatch(openChecklistSettings(taskListId, existingChecklistSettings));
    }

    handleDeleteTaskListButtonClick(taskListId) {
        this.props.dispatch(setOpenTaskListSettingsMenuId(-1));
        this.props.dispatch(removeTaskListAsync(taskListId));
    }

    handleRenameTaskListButtonClick(taskListId, currentValue) {
        this.props.dispatch(setOpenTaskListSettingsMenuId(-1));
        this.props.dispatch(updateTaskListNameAsync(taskListId, currentValue))
    }

    handleTaskListSettingsMenuClose() {
        this.props.dispatch(setOpenTaskListSettingsMenuId(-1));
    }

    handleTaskListSettingsMenuOpen(taskListId) {
        this.props.dispatch(setOpenTaskListSettingsMenuId(taskListId));
    }

    handleTaskListSettingsChanged(taskListId, newValue) {
        this.props.dispatch(setOpenTaskListSettingsMenuId(-1));
        this.props.dispatch(updateTaskListSettingsAsync(taskListId, newValue));
    }

    handleShowOnlySelfTasksButtonClick(existingValue) {
        this.props.dispatch(setShowOnlySelfTasks(!existingValue));
    }

    handleCompletedTasksButtonClick(existingValue) {
        this.props.dispatch(setShowCompletedTasksAsync(!existingValue));
    }

    handleRenameProjectButtonClick(selectedProjectId) {
        this.props.dispatch(updateProjectNameAsync(selectedProjectId))
    }
    
    handleShareMenuButtonClick() {
        this.props.dispatch(setIsShareMenuOpen(true));
    }

    handleDueDateContainerTap(taskId) {
        this.props.dispatch(openTaskInspectorAsync(taskId));
    }

    handleAddNewTaskListButtonClick() {
        this.props.dispatch(addNewTaskListAsync());
    }

    handleAddNewTaskButtonClick(taskListId) {
        if (typeof taskListId !== "string") {
            // No taskListId Provided. (Could accidentely be an event object coming through) Request coming from a FAB.
            this.props.dispatch(addNewTaskAsync());
        }

        else {
            // taskListId provided. Request coming from "No Tasks in List, Hint Button".
            this.props.dispatch(setFocusedTaskListId(taskListId));
            this.props.dispatch(addNewTaskAsync());
        }
        
    }

    handleTaskTextContainerTap() {
        
    }

    handleTaskPress(taskId, taskListId, currentValue, currentMetadata) {
        this.props.dispatch(setFocusedTaskListId(taskListId));
        this.props.dispatch(updateTaskNameAsync(taskId, currentValue, currentMetadata));
    }

    handleTaskListClick(taskListId) {
        this.props.dispatch(setFocusedTaskListId(taskListId));
        
        if (this.props.isATaskMoving) {
            this.props.dispatch(moveTaskAsync(taskListId, this.props.movingTaskId));
        }
    }

    getProjectRelatedTasks(tasks, projectId) {
        if (projectId === -1) {
            return [];
        }

        let relatedTasks = tasks.filter( item => {
            return item.project === projectId
        })

        return relatedTasks;
    }

    getProjectName(projects, projectId) {
        if (projectId === -1 || projects === undefined) {
            return "";
        }

        let selectedProject = projects.find( item => {
            return item.uid === projectId;
        })

        if (selectedProject) {
            return selectedProject.projectName;
        }

        else {
            return "";
        }
    }

    handleProjectMenuButtonClick() {
        this.props.dispatch(setIsAppDrawerOpen(true));
    }

    handleTaskActionClick(type, taskId, taskListId) {
        if (type === 'moveTask') {
            if (this.props.isATaskMoving === false) {
                this.props.dispatch(startTaskMoveAsync(taskId, taskListId))
            }
        }

        if (type === 'deleteTask') {
            
        }
    }

    handleTaskCheckboxChange(taskId, newValue, oldValue, currentMetadata) {
        this.props.dispatch(updateTaskCompleteAsync(taskId, newValue, oldValue, currentMetadata));
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        taskLists: state.taskLists,
        projects: state.projects,
        selectedProjectId: state.selectedProjectId,
        isAppDrawerOpen: state.isAppDrawerOpen,
        isAppSettingsOpen: state.isAppSettingsOpen,
        textInputDialog: state.textInputDialog,
        isLoggedIn: state.isLoggedIn,
        focusedTaskListId: state.focusedTaskListId,
        openTaskInspectorId: state.openTaskInspectorId,
        openTaskInspectorEntity: state.openTaskInspectorEntity,
        isShareMenuOpen: state.isShareMenuOpen,
        informationDialog: state.informationDialog,
        confirmationDialog: state.confirmationDialog,
        isASnackbarOpen: state.isASnackbarOpen,
        generalSnackbar: state.generalSnackbar,
        showCompletedTasks: state.showCompletedTasks,
        memberLookup: state.memberLookup,
        showOnlySelfTasks: state.showOnlySelfTasks,
        movingTaskId: state.movingTaskId,
        isATaskMoving: state.isATaskMoving,
        openTaskListSettingsMenuId: state.openTaskListSettingsMenuId,
        openChecklistSettingsId: state.openChecklistSettingsId,
        itemSelectDialog: state.itemSelectDialog,
        isJumpMenuOpen: state.isJumpMenuOpen,
    }
}

let VisibleApp = connect(mapStateToProps)(App);
export default withTheme()(VisibleApp);