import React, { Component } from 'react';
import TaskListToolbar from './TaskListToolbar';
import { Paper } from '@material-ui/core';

let paperStyle = {
    width: 'calc(100% - 16px)',
    marginLeft: '8px',
    marginRight: '8px',
    marginTop: '8px',
}

class TaskList extends Component {
    render() {
        let containerStyle = {
            width: '100%',
            flexGrow: '1',
            display: 'grid',
            gridTemplateRows: '[Toolbar]auto [Tasks]1fr',
            overflowX: 'hidden',
        }

        return (
            <Paper style={paperStyle} onClick={this.props.onClick}>
                <div style={containerStyle}>
                    <div style={{ gridRow: 'Toolbar' }}>
                        <TaskListToolbar
                        name={this.props.name}
                        isFocused={this.props.isFocused} />
                    </div>

                    <div style={{ gridRow: 'Tasks' }}>
                        { this.props.children }
                    </div>

                </div>
            </Paper>
            
        );
    }
}

export default TaskList;