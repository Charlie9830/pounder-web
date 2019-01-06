import React from 'react';
import Button from './Button';
import '../assets/css/ToolBarButton.css';
import NewTaskIcon from '../assets/icons/NewTaskIcon.svg';
import NewTaskListIcon from '../assets/icons/NewTaskListIcon.svg';
import ShowAllTasksIcon from '../assets/icons/ShowAllTasksIcon.svg';
import ShowOnlySelfTasksIcon from '../assets/icons/ShowOnlySelfTasksIcon.svg';
import EyeOpenIcon from '../assets/icons/EyeOpenIcon.svg';
import EyeClosedIcon from '../assets/icons/EyeClosedIcon.svg';
import Toggle from 'react-toggle';
import '../assets/css/react-toggle/style.css';

import { Menu, MenuItem, Switch, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';


// React-Toggle Icon.
class ShowAllTasks extends React.Component {
    render() {
        return (
            <img  className="ToggleIcon" src={ShowAllTasksIcon}/>
        )
    } 
}

// React-Toggle Icon.
class ShowOnlySelfTasks extends React.Component {
    render() {
        return (
            <img className="ToggleIcon" src={ShowOnlySelfTasksIcon}/>
        )
    }
}

class ProjectToolBar extends React.Component {
    constructor(props) {
        super(props);

        // State.
        this.state = {
            isMoreMenuOpen: false,
            isTaskListJumpMenuOpen: false,
        }

        // Refs.
        this.moreMenuButtonRef = React.createRef();
        this.taskListJumpMenuButtonRef = React.createRef();

        // Method Bindings.
        this.handleAddTaskButtonClick = this.handleAddTaskButtonClick.bind(this);
        this.handleAddTaskListButtonClick = this.handleAddTaskListButtonClick.bind(this);
        this.handleTaskListJumpMenuItemClick = this.handleTaskListJumpMenuItemClick.bind(this);
        this.handleTaskListJumpMenuButtonClick = this.handleTaskListJumpMenuButtonClick.bind(this);
        this.handleShowOnlySelfTasksChange = this.handleShowOnlySelfTasksChange.bind(this);
        this.getShowOnlySelfTasksSwitchJSX = this.getShowOnlySelfTasksSwitchJSX.bind(this);
        this.handleMoreButtonClick = this.handleMoreButtonClick.bind(this);
        this.handleMoreMenuClose = this.handleMoreMenuClose.bind(this);
        this.getMoreMenuJSX = this.getMoreMenuJSX.bind(this);
        this.getTaskListJumpMenuJSX = this.getTaskListJumpMenuJSX.bind(this);
        this.handleTaskListJumpMenuButtonClick = this.handleTaskListJumpMenuButtonClick.bind(this);
        this.handleTaskListJumpMenuClose = this.handleTaskListJumpMenuClose.bind(this);
        this.handleTaskListJumpMenuItemClick = this.handleTaskListJumpMenuItemClick.bind(this);
    }

    render() {
        var showOnlySelfTasksSwitchJSX = this.getShowOnlySelfTasksSwitchJSX();
        let moreMenuJSX = this.getMoreMenuJSX();
        let taskListJumpMenuJSX = this.getTaskListJumpMenuJSX();

        return (
            <AppBar position="sticky" color="secondary">
                <Toolbar>
                    <IconButton onClick={() => {this.props.onProjectToolbarMenuButtonClick()}}>
                        <MenuIcon/>
                    </IconButton>

                    <Typography style={{flexGrow: 1}} variant="h6"> 
                        {this.props.projectName}
                    </Typography>

                    <IconButton buttonRef={this.taskListJumpMenuButtonRef} onClick={this.handleTaskListJumpMenuButtonClick}>
                        <ArrowDownCircleIcon/>
                    </IconButton>
                    {taskListJumpMenuJSX}

                    <IconButton onClick={this.handleMoreButtonClick} buttonRef={this.moreMenuButtonRef}>
                        <MoreVertIcon/>
                    </IconButton>
                    {moreMenuJSX}

                </Toolbar>
            </AppBar>
        )
    }

    getTaskListJumpMenuJSX() {
        let menuItems = this.props.taskLists.map((item, index) => {
            return (
                <MenuItem key={index} onClick={() => {this.handleTaskListJumpMenuItemClick(item.taskListId)}}>
                    {item.taskListName}
                </MenuItem>
            )
        })

        return (
            <Menu open={this.state.isTaskListJumpMenuOpen} anchorEl={this.taskListJumpMenuButtonRef.current}
            onClose={this.handleTaskListJumpMenuClose}>
                {menuItems}
            </Menu>
        )
    }

    handleTaskListJumpMenuItemClick(taskListId) {
        this.setState({ isTaskListJumpMenuOpen: false });
        this.props.onTaskListJumpMenuItemClick(taskListId);
    }

    handleTaskListJumpMenuButtonClick() {
        this.setState({ isTaskListJumpMenuOpen: true });
    }

    handleTaskListJumpMenuClose() {
        this.setState({ isTaskListJumpMenuOpen: false });
    }

    getMoreMenuJSX() {
        let completedTasksMenuItemText = this.props.showCompletedTasks ? "Hide completed tasks" : "Show completed tasks";

        return (
            <Menu open={this.state.isMoreMenuOpen} anchorEl={this.moreMenuButtonRef.current} onClose={this.handleMoreMenuClose}>
                        <MenuItem key={0}>
                            {completedTasksMenuItemText}
                        </MenuItem>

                        <MenuItem key={1}>
                            <Typography>
                                Only assigned to me
                            </Typography>
                            <Switch></Switch>
                        </MenuItem>
                    </Menu>
        )
    }

    handleMoreButtonClick() {
        this.setState({ isMoreMenuOpen: true });
    }

    handleMoreMenuClose() {
        this.setState({ isMoreMenuOpen: false });
    }

    getShowOnlySelfTasksSwitchJSX() {
        if (this.props.isRemote) {
            return (
                <div className="ToolbarPairsFlexContainer">
                    <div className="AssignedToSelfToggleContainer">
                        <Toggle icons={{ checked: <ShowOnlySelfTasks />, unchecked: <ShowAllTasks /> }}
                            onChange={this.handleShowOnlySelfTasksChange} checked={this.props.showOnlySelfTasks} />
                    </div>
                </div>
            )
        }
    }

    handleShowOnlySelfTasksChange(e) {
        this.props.onShowOnlySelfTasksChanged(e.target.checked);
    }

    handleAddTaskButtonClick(e) {
        this.props.onAddTaskButtonClick();
    }

    handleAddTaskListButtonClick(e) {
        this.props.onAddTaskListButtonClick();
    }
}

export default ProjectToolBar;