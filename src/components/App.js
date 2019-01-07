import React from 'react';
import Project from './Project';

import '../assets/css/App.css';

import { connect } from 'react-redux';
import { updateTaskCompleteAsync } from 'handball-libs/libs/pounder-redux/action-creators';

import MockData from '../MockData';

class App extends React.Component {
    constructor(props) {
        super(props);

        // Method Bindings.
        this.handleTaskCheckboxChange = this.handleTaskCheckboxChange.bind(this);
    }

    render() {
        return (
            <Project
            projectId={MockData.selectedProjectId}
            projectName={MockData.projectName}
            tasks={MockData.tasks}
            taskLists={MockData.taskLists}

            onTaskCheckboxChange={this.handleTaskCheckboxChange}
            />
        )
    }

    handleTaskCheckboxChange(taskId, newValue, oldValue, currentMetadata) {
        this.props.dispatch(updateTaskCompleteAsync(taskId, newValue, oldValue, currentMetadata));
    }
}

const mapStateToProps = state => {
    return {

    }
}

let VisibleApp = connect(mapStateToProps)(App);
export default VisibleApp;