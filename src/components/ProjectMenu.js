import React, { Component } from 'react';
import { IconButton, Menu, MenuItem, Typography, Switch } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/MoreVert';

class ProjectMenu extends Component {
    constructor(props) {
        super(props);

        // State.
        this.state = {
            isOpen: false,
        }

        // Refs.
        this.anchorRef = React.createRef();

        // Method Bindings.
        this.handleMenuSelection = this.handleMenuSelection.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <IconButton
                onClick={() => { this.setState({ isOpen: true })}}
                buttonRef={this.anchorRef}>
                    <MenuIcon/>
                </IconButton>

                <Menu
                open={this.state.isOpen}
                anchorEl={this.anchorRef.current}
                onClose={ () => { this.setState({ isOpen: false })}}>
                    <MenuItem onClick={() => { this.handleMenuSelection('share') }}> Share </MenuItem>

                    <MenuItem onClick={() => { this.handleMenuSelection('completedTasks') }}> Show completed tasks </MenuItem>

                    <MenuItem onClick={() => { this.handleMenuSelection('assignedTasks')}}>
                        <Typography> Show only my tasks </Typography>
                        <Switch/>
                    </MenuItem>

                    <MenuItem onClick={() => { this.handleMenuSelection('renameProject')}}> Rename project </MenuItem>
                </Menu>
            </React.Fragment>
        );
    }

    handleMenuSelection(selection) {
        this.setState({ isOpen: false });

        if (selection === 'share') {
            this.props.onShareMenuButtonClick();
        }
        
    }
}

export default ProjectMenu;
