import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectListItem from './ProjectListItem/ProjectListItem';
import InviteListItem from './InviteListItem';

import { AppBar, Toolbar, Typography, withTheme, Grid, IconButton, List, ListSubheader, Divider, Fab } from '@material-ui/core';

import AccountIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ShareIcon from '@material-ui/icons/Share';
import AddIcon from '@material-ui/icons/Add';

import { acceptProjectInviteAsync, denyProjectInviteAsync, addNewProjectAsync,
setIsAppSettingsOpen } from 'handball-libs/libs/pounder-redux/action-creators';

const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

class AppDrawer extends Component {
    constructor(props) {
        super(props);

        // Method Bindings.
        this.projectMapper = this.projectMapper.bind(this);
        this.getInvitesJSX = this.getInvitesJSX.bind(this);
    }

    render() {
        let { theme } = this.props;

        let appDrawerContainerStyle = {
            width: '100vw',
            height: '100vh',
            background: theme.palette.background.default,
        }

        return (
            <div style={appDrawerContainerStyle}>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6"> Handball </Typography>
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
                            <IconButton>
                                <ShareIcon />
                            </IconButton>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <List style={{marginTop: '56px'}}>
                    {/* Invites  */} 
                    { this.getInvitesSubheading(this.props.invites.length > 0) }
                    { this.props.invites.length > 0 && this.getInvitesJSX() }

                    {/* Local Projects  */} 
                    { this.getLocalProjectsSubheading(this.props.localProjects.length > 0) }
                    { this.props.localProjects.length > 0 && this.getLocalProjectsSubheading() && this.projectMapper(this.props.localProjects) }

                    {/* Remote Projects  */} 
                    { this.getRemoteProjectsSubheading(this.props.remoteProjects.length > 0) }
                    { this.props.remoteProjects.length > 0 && this.getRemoteProjectsSubheading() && this.projectMapper(this.props.remoteProjects) }
                </List>

                <Fab style={fabStyle} onClick={() => { this.props.dispatch(addNewProjectAsync()) }}>
                    <AddIcon/>
                </Fab>
            </div>
        );
    }

    getInvitesSubheading(show) {
        if (show === false) {
            return null;
        }

        return [
            <ListSubheader key="invites"> Invites </ListSubheader>,
            <Divider key="invitesdivider"/>
        ] 
    }

    getLocalProjectsSubheading(show) {
        if (show === false) {
            return null;
        }

        return [
            <ListSubheader key="localprojects"> Personal Projects </ListSubheader>,
            <Divider key="localprojectsdivider"/>
        ] 
    }

    getRemoteProjectsSubheading(show) {
        if (show === false) {
            return null;
        }

        return [
            <ListSubheader key="remoteprojects"> Shared Projects </ListSubheader>,
            <Divider key="remoteprojectsdivider"/>
        ] 
    }

    getInvitesJSX() {
        let jsx = this.props.invites.map( item => {
            return (
                <InviteListItem 
                key={item.projectId}
                sourceEmail={item.sourceEmail}
                projectName={item.projectName}
                onAccept={() => { this.props.dispatch(acceptProjectInviteAsync(item.projectId)) }}
                onDeny={() => { this.props.dispatch(denyProjectInviteAsync(item.projectId)) }}
                isUpdating={this.props.updatingInviteIds.includes(item.projectId)}
                />
            )
        })

        return jsx;
    }

    projectMapper(projects) {
        let jsx = projects.map( item => {
            return (
                <ProjectListItem 
                key={item.uid}
                name={item.name}
                isFavorite={this.props.favouriteProjectId === item.uid}
                isSelected={this.props.selectedProjectId === item.uid}
                indicators={this.props.projectSelectorIndicators[item.uid]}
                />
            )
        })

        return jsx;
    }
}

let mapStateToProps = (state) => {
    return {
        localProjects: [ { uid: 'L1', name: 'Local Project A' }, { uid: 'L2', name: 'Local Project B' }, { uid: 'L3', name: 'Local Project C' }, ],
        remoteProjects: [ { uid: 'R1', name: 'Remote Project A' }, { uid: 'R2', name: 'Remote Project B' }, { uid: 'R3', name: 'Remote Project C' }, ],
        invites: [ { projectName: 'Harry Plopper', sourceDisplayName: 'Rob Garrison', projectId: 'HarryPlopper', sourceEmail: 'rob@garrison.com.au' } ],
        projectSelectorIndicators: { 'L1': { later: 2, soon: 1, today: 1, overdue: 1, hasUnseenComments: true}},
        favouriteProjectId: 'L2',
        selectedProjectId: 'L1',
        updatingInviteIds: []
    }
}

let AppDrawerWithTheme = withTheme()(AppDrawer);
let VisibleAppDrawer = connect(mapStateToProps)(AppDrawerWithTheme);

export default VisibleAppDrawer;