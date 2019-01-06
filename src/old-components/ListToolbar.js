import React from 'react';
import VerticalCenteringContainer from '../containers/VerticalCenteringContainer';
import OverlayMenuContainer from '../containers/OverlayMenuContainer';
import '../assets/css/ListToolbar.css';
import TaskListSettingsMenu from './TaskListSettingsMenu';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Hammer from 'hammerjs';
import TaskListSettingsIcon from '../assets/icons/SettingsIcon.svg';
import DeleteTaskListIcon from '../assets/icons/DeleteTaskListIcon.svg';
import ChecklistSettingsDialog from './ChecklistSettingsDialog';


import { Toolbar, IconButton, Typography, Grid, Drawer, Menu, MenuItem, ListSubheader, Divider, ListItemIcon, ListItemText } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

import SettingsIcon from '@material-ui/icons/Settings';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import SortIcon from '@material-ui/icons/Sort';

class ListToolbar extends React.Component{
    constructor(props) {
        super(props);

        // Refs.
        this.headerContainerRef = React.createRef();

        // Method Bindings.
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
        this.handleSettingsClick = this.handleSettingsClick.bind(this);
        this.handleTaskListSettingsChanged = this.handleTaskListSettingsChanged.bind(this);
        this.handleDoubleTap = this.handleDoubleTap.bind(this);
        this.handleSettingsMenuClose = this.handleSettingsMenuClose.bind(this);
        this.handleRenewNowButtonClick = this.handleRenewNowButtonClick.bind(this);
        this.getSettingsMenuJSX = this.getSettingsMenuJSX.bind(this);
    }

    componentDidMount() {
        // this.hammer = new Hammer(this.headerContainerRef.current);
        // this.hammer.on('tap', this.handleDoubleTap);

        // this.hammer.get('tap').set({interval: 300, taps: 2});
    }

    componentWillUnmount() {
        // this.hammer.off('tap', this.headerContainerRef.current, this.handleDoubleTap);
    }

    render() {
        const { theme } = this.props;

        let toolbarStyle = {
            background: this.props.isFocused ? theme.palette.secondary.light : theme.palette.secondary.dark,
            width: '100%',
            height: '44px',
        }

        var settingsMenuJSX = this.getSettingsMenuJSX();
        var typeText = this.props.settings.checklistSettings.isChecklist ? "Checklist" : "";

        return (
            <div style={toolbarStyle}>
                <Grid container
                justify="flex-start"
                alignItems="center">
                    <IconButton onClick={this.handleSettingsClick}>
                        <MoreHorizIcon/>
                    </IconButton>

                    <Typography align="center" style={{ flexGrow: 1 }}>
                        {this.props.headerText}
                    </Typography>
                </Grid>

                {settingsMenuJSX}
            </div>
        )
    }

    handleSettingsMenuClose() {
        this.props.onSettingsMenuClose();
    }

    handleDoubleTap(event) {
        this.props.onHeaderPress();
    }

    getSettingsMenuJSX() {
        return (
            <TaskListSettingsMenu isOpen={this.props.isSettingsMenuOpen} onRemoveButtonClick={this.handleRemoveButtonClick}
            settings={this.props.settings} onSettingsMenuClose={this.handleSettingsMenuClose}
            onSettingsChanged={this.handleTaskListSettingsChanged} projects={this.props.projects} currentProjectId={this.props.projectId}
            onMoveTaskListToProject={this.props.onMoveTaskListToProject} onRenewNowButtonClick={this.handleRenewNowButtonClick}
            onChecklistSettingsOpen={this.props.onChecklistSettingsOpen}
            onChecklistSettingsClose={this.props.onChecklistSettingsClose}
            isChecklistSettingsOpen={this.props.isChecklistSettingsOpen} />
        ) 
    }

    handleRenewNowButtonClick() {
        this.props.onRenewNowButtonClick();
    }

    handleTaskListSettingsChanged(newSettings, closeMenu) {
        this.props.onTaskListSettingsChanged(newSettings, closeMenu);
    }

    handleSettingsClick(e) {
        this.props.onSettingsButtonClick();
    }

    handleRemoveButtonClick(e) {
        this.props.onRemoveButtonClick(e);
    }
}

export default withTheme()(ListToolbar);