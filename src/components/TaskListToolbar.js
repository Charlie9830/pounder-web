import React from 'react';
import { Grid, IconButton, Typography, withTheme } from '@material-ui/core';
import ChecklistIcon from '@material-ui/icons/Check';
import TaskListSettingsMenu from './TaskListSettingsMenu';


const TaskListToolbar = (props) => {
    let { theme } = props;

    let toolbarStyle = {
        display: 'grid',
        gridTemplateColumns: '[Menu]auto [Title]1fr [ChecklistIndicator]auto',
        background: props.isFocused ? theme.palette.secondary.light : 'unset',
    }

    let checklistIndicator = (
        <IconButton onClick={props.onChecklistSettingsButtonClick}>
            <ChecklistIcon fontSize="small"/>
        </IconButton>
    )

    return (
        <div 
        style={toolbarStyle}>
            <div 
            style={{ gridColumn: 'Menu', placeSelf: 'center' }}>
                <TaskListSettingsMenu
                onOpen={props.onSettingsMenuOpen}
                onClose={props.onSettingsMenuClose}
                isOpen={props.isSettingsMenuOpen}
                settings={props.taskListSettings}
                onRenameButtonClick={props.onRenameButtonClick}
                onSettingsChanged={props.onTaskListSettingsChanged}
                onDeleteButtonClick={props.onDeleteButtonClick}
                onChecklistSettingsButtonClick={props.onChecklistSettingsButtonClick} />
            </div>
        
            <div
            style={{gridColumn: 'Title', placeSelf: 'center', marginLeft: '-48px'}}>
                <Typography variant="subheading"> {props.name} </Typography>
            </div>
            
            <div
            style={{gridColumn: 'ChecklistIndicator', placeSelf: 'center flex-end'}}>
                { props.taskListSettings.checklistSettings.isChecklist && checklistIndicator }
            </div>

        </div>
            
         
        
    );
};

export default withTheme()(TaskListToolbar);