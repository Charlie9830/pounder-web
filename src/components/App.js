import React from 'react';
import Project from './Project';
import TextInputDialog from './dialogs/TextInputDialog';

import '../assets/css/App.css';

import { connect } from 'react-redux';
import { updateTaskCompleteAsync, setIsAppDrawerOpen } from 'handball-libs/libs/pounder-redux/action-creators';

import MockData from '../MockData';
import { Drawer, CssBaseline } from '@material-ui/core';
import VisibleAppDrawer from './AppDrawer';

class App extends React.Component {
    constructor(props) {
        super(props);

        // Method Bindings.
        this.handleTaskCheckboxChange = this.handleTaskCheckboxChange.bind(this);
        this.handleTaskActionClick = this.handleTaskActionClick.bind(this);
        this.handleProjectMenuButtonClick = this.handleProjectMenuButtonClick.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>

                <Drawer open={this.props.isAppDrawerOpen} anchor="left">
                    <VisibleAppDrawer/>
                </Drawer>

                <Project
                    projectId={MockData.selectedProjectId}
                    projectName={MockData.projectName}
                    tasks={MockData.tasks}
                    taskLists={MockData.taskLists}

                    onTaskCheckboxChange={this.handleTaskCheckboxChange}
                    onTaskActionClick={this.handleTaskActionClick}
                    onMenuButtonClick={this.handleProjectMenuButtonClick}
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
        isAppDrawerOpen: state.isAppDrawerOpen,
        textInputDialog: state.textInputDialog,
    }
}

let VisibleApp = connect(mapStateToProps)(App);
export default VisibleApp;