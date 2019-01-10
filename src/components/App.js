import React from 'react';
import Project from './Project';
import TextInputDialog from './dialogs/TextInputDialog';
import TaskInspector from './TaskInspector/TaskInspector';

import '../assets/css/App.css';

import { connect } from 'react-redux';
import {
    updateTaskCompleteAsync, setIsAppDrawerOpen, attachAuthListenerAsync, setFocusedTaskListId,
    updateTaskNameAsync, addNewTaskAsync, addNewTaskListAsync, openTaskInspectorAsync, selectProject,
} from 'handball-libs/libs/pounder-redux/action-creators';

import { Drawer, CssBaseline } from '@material-ui/core';
import VisibleAppDrawer from './AppDrawer';
import VisibleAppSettingsMenu from './AppSettingsMenu/AppSettingsMenu';

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
    }

    componentDidMount() {
        // Attach an Authentication state listener. Will pull down database when Logged in.
        this.props.dispatch(attachAuthListenerAsync());        
    }
    

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
        
                <Drawer
                    open={this.props.openTaskInspectorId !== -1 && this.props.openTaskInspectorEntity !== null}
                    anchor="left">
                    <TaskInspector />
                </Drawer>

                <Drawer open={this.props.isAppDrawerOpen} anchor="left">
                    <VisibleAppDrawer/>
                </Drawer>

                <Drawer open={this.props.isAppSettingsOpen} anchor="left">
                    <VisibleAppSettingsMenu/>
                </Drawer>

                <Project
                    projectId={this.props.selectedProjectId}
                    projectName={ this.getProjectName(this.props.projects, this.props.selectedProjectId) }
                    tasks={ this.getProjectRelatedTasks(this.props.tasks, this.props.selectedProjectId) }
                    taskLists={this.props.taskLists}
                    focusedTaskListId={this.props.focusedTaskListId}
                    onTaskCheckboxChange={this.handleTaskCheckboxChange}
                    onTaskActionClick={this.handleTaskActionClick}
                    onMenuButtonClick={this.handleProjectMenuButtonClick}
                    onTaskListClick={this.handleTaskListClick}
                    onTaskTextContainerTap={this.handleTaskTextContainerTap}
                    onAddNewTaskButtonClick={this.handleAddNewTaskButtonClick}
                    onAddNewTaskListButtonClick={this.handleAddNewTaskListButtonClick}
                    onDueDateContainerTap={this.handleDueDateContainerTap}
                />

                <TextInputDialog
                    isOpen={this.props.textInputDialog.isOpen}
                    title={this.props.textInputDialog.title}
                    text={this.props.textInputDialog.text}
                    label={this.props.textInputDialog.label}
                    onCancel={this.props.textInputDialog.onCancel}
                    onOkay={this.props.textInputDialog.onOkay}
                />
            </React.Fragment>
        )
    }
    
    handleDueDateContainerTap(taskId) {
        this.props.dispatch(openTaskInspectorAsync(taskId));
    }

    handleAddNewTaskListButtonClick() {
        this.props.dispatch(addNewTaskListAsync());
    }

    handleAddNewTaskButtonClick(taskListId) {
        if (taskListId === undefined) {
            // No taskListId Provided. Request coming from a FAB.
            this.props.dispatch(addNewTaskAsync());
        }

        else {
            // taskListId provided. Request coming from "No Tasks in List, Hint Button".
            this.props.dispatch(setFocusedTaskListId(taskListId));
            this.props.dispatch(addNewTaskAsync());
        }
        
    }

    handleTaskTextContainerTap(taskId, taskListId, currentValue, currentMetadata) {
        this.props.dispatch(setFocusedTaskListId(taskListId));
        this.props.dispatch(updateTaskNameAsync(taskId, currentValue, currentMetadata));
        
    }

    handleTaskListClick(taskListId) {
        this.props.dispatch(setFocusedTaskListId(taskListId));
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

    handleTaskActionClick(uid, type) {
        if (type === 'moveTask') {

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
    }
}

let VisibleApp = connect(mapStateToProps)(App);
export default VisibleApp;