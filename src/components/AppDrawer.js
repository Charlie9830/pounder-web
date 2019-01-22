import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectListItem from './ProjectListItem/ProjectListItem';
import InviteListItem from './InviteListItem';

import { AppBar, Toolbar, Typography, Grid, IconButton, List, ListSubheader, Divider, Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import AccountIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';

import { acceptProjectInviteAsync, denyProjectInviteAsync, addNewProjectAsync,
setIsAppSettingsOpen, selectProject } from 'handball-libs/libs/pounder-redux/action-creators';
import FullScreenView from '../layout-components/FullScreenView';
import TransitionList from './TransitionList/TransitionList';
import ListItemTransition from './TransitionList/ListItemTransition';

let styles = theme => {
    let fabBase = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    }

    return {
        fabMoveUp: {
            ...fabBase,
            transform: 'translate3d(0, -46px, 0)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.enteringScreen,
                easing: theme.transitions.easing.easeOut,
            }),
        },
    
        fabMoveDown: {
            ...fabBase,
            transform: 'translate3d(0, 0, 0)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.leavingScreen,
                easing: theme.transitions.easing.sharp,
            }),
        },
    }
};

class AppDrawer extends Component {
    constructor(props) {
        super(props);

        // Method Bindings.
        this.projectMapper = this.projectMapper.bind(this);
        this.getInvitesJSX = this.getInvitesJSX.bind(this);
    }

    render() {
        let { classes } = this.props;
        let fabClassName = this.props.isASnackbarOpen ? 'fabMoveUp' : 'fabMoveDown';

        return (
            <FullScreenView>
                <AppBar>
                    <Toolbar>
                        <Typography
                        variant="h6"> Handball </Typography>
                        <Grid container
                        direction="row-reverse"
                        justify="flex-start"
                        alignItems="center">
                            <IconButton onClick={() => { this.props.dispatch(setIsAppSettingsOpen(true))}}>
                                <SettingsIcon />
                            </IconButton>
                            <IconButton>
                                <AccountIcon />
                            </IconButton>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <TransitionList style={{marginTop: '56px'}}>
                    {/* Invites  */} 
                    { this.getInvitesSubheading(this.props.invites.length > 0) }
                    { this.props.invites.length > 0 && this.getInvitesJSX() }

                    {/* Local Projects  */} 
                    { this.getLocalProjectsSubheading(this.props.localProjects.length > 0) }
                    { this.props.localProjects.length > 0 && this.getLocalProjectsSubheading() && this.projectMapper(this.props.localProjects) }

                    {/* Remote Projects  */} 
                    { this.getRemoteProjectsSubheading(this.props.remoteProjects.length > 0) }
                    { this.props.remoteProjects.length > 0 && this.getRemoteProjectsSubheading() && this.projectMapper(this.props.remoteProjects) }
                </TransitionList>

                <Fab className={classes[fabClassName]}
                onClick={() => { this.props.dispatch(addNewProjectAsync()) }}>
                    <AddIcon/>
                </Fab>
            </FullScreenView>
        );
    }

    getInvitesSubheading(show) {
        if (show === false) {
            return null;
        }

        return [
            <ListItemTransition
                key="invites">
                <ListSubheader key="invites"> Invites </ListSubheader>,
            <Divider key="invitesdivider" />
            </ListItemTransition>
        ] 
    }

    getLocalProjectsSubheading(show) {
        if (show === false) {
            return null;
        }

        return [
            <ListItemTransition
                key="localprojects">
                <ListSubheader key="localprojects"> Personal Projects </ListSubheader>,
            <Divider key="localprojectsdivider" />
            </ListItemTransition>
        ] 
    }

    getRemoteProjectsSubheading(show) {
        if (show === false) {
            return null;
        }

        return [
            <ListItemTransition
            key="remoteprojects">
                <ListSubheader> Shared Projects </ListSubheader>,
            <Divider />
            </ListItemTransition>
            
        ] 
    }

    getInvitesJSX() {
        let jsx = this.props.invites.map( item => {
            return (
                <ListItemTransition>
                    <InviteListItem
                        key={item.projectId}
                        sourceEmail={item.sourceEmail}
                        projectName={item.projectName}
                        onAccept={() => { this.props.dispatch(acceptProjectInviteAsync(item.projectId)) }}
                        onDeny={() => { this.props.dispatch(denyProjectInviteAsync(item.projectId)) }}
                        isUpdating={this.props.updatingInviteIds.includes(item.projectId)}
                    />
                </ListItemTransition>
            )
        })

        return jsx;
    }

    projectMapper(projects) {
        let jsx = projects.map( item => {
            return (
                <ListItemTransition>
                    <ProjectListItem
                        onClick={() => { this.props.dispatch(selectProject(item.uid)) }}
                        key={item.uid}
                        name={item.projectName}
                        isFavorite={this.props.favouriteProjectId === item.uid}
                        isSelected={this.props.selectedProjectId === item.uid}
                        indicators={this.props.projectSelectorIndicators[item.uid]}
                    />
                </ListItemTransition>
            )
        })

        return jsx;
    }
}

let mapStateToProps = (state) => {
    return {
        localProjects: state.localProjects,
        remoteProjects: state.remoteProjects,
        invites: state.invites,
        projectSelectorIndicators: state.projectSelectorIndicators,
        favouriteProjectId: state.favouriteProjectId,
        selectedProjectId: state.selectedProjectId,
        updatingInviteIds: state.updatingInviteIds,
        isASnackbarOpen: state.isASnackbarOpen,
    }
}

let VisibleAppDrawer = connect(mapStateToProps)(withStyles(styles)(AppDrawer));

export default VisibleAppDrawer;