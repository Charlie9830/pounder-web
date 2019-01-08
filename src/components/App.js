import React from 'react';
import Project from './Project';

import '../assets/css/App.css';

import { connect } from 'react-redux';
import { updateTaskCompleteAsync, setIsAppDrawerOpen } from 'handball-libs/libs/pounder-redux/action-creators';

import MockData from '../MockData';
import { Drawer } from '@material-ui/core';
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
    }
}

let VisibleApp = connect(mapStateToProps)(App);
export default VisibleApp;