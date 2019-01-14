import React, { Component } from 'react';
import TaskListToolbar from './TaskListToolbar';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import Color from 'color';
import colorString from 'color-string';

let containerStyle = {
    width: '100%',
    flexGrow: '1',
    display: 'grid',
    gridTemplateRows: '[Toolbar]auto [Tasks]1fr',
    overflowX: 'hidden',
}

let basePaperStyle = {
    width: 'calc(100% - 16px)',
    marginLeft: '8px',
    marginRight: '8px',
    marginTop: '8px',
}

const styles = theme => {
    return {
        unFocused: {
            ...basePaperStyle,
            background: theme.palette.background.paper,
        },

        focused: {
            ...basePaperStyle,
            background: getFocusedBackgroundColor(theme.palette.background.paper),
        }
    }
}

class TaskList extends Component {
    render() {
        let { classes } = this.props;
        let paperClassName = this.props.isFocused ? classes['focused'] : classes['unFocused'];

        return (
            <Paper 
            className={paperClassName}
            onClick={this.props.onClick}>
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

let getFocusedBackgroundColor = (startingColor) => {
    let color = colorString.get(startingColor);

    return Color.rgb(color.value).lighten(0.35).hex();
}

export default withStyles(styles)(TaskList);