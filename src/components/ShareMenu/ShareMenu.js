import React from 'react';
import { connect } from 'react-redux';
import { inviteUserToProjectAsync, kickUserFromProjectAsync, updateMemberRoleAsync, setIsShareMenuOpen,
removeRemoteProjectAsync, migrateProjectBackToLocalAsync } from 'handball-libs/libs/pounder-redux/action-creators';
import { getUserUid } from 'handball-libs/libs/pounder-firebase';
import MemberStatusIcon from './MemberStatusIcon';
import WaitingOverlay from './WaitingOverlay';


import {
    Toolbar, IconButton, TextField, Button, List, ListSubheader, Paper, Divider,
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import FullScreenView from '../../layout-components/FullScreenView';
import ActionButton from './ActionButton';
import MemberListItem from './MemberListItem';


let grid = {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: '[Toolbar]56px [Invite]1fr [Members]3fr [Actions]auto'
}

let inviteContainer = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

let actionsContainer = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
}

let paperStyle = {
    margin: '0px 8px 8px 8px',
    padding: '8px',
}


class ShareMenu extends React.Component {
    constructor(props) {
        super(props);

        // Refs.
        this.emailInputRef = React.createRef();

        // Method Bindings.
        this.getProjectName = this.getProjectName.bind(this);
        this.getMembersJSX = this.getMembersJSX.bind(this);
        this.getFilteredMembers = this.getFilteredMembers.bind(this);
        this.isCurrentUserAnOwner = this.isCurrentUserAnOwner.bind(this);
        this.isUserAlreadyAMember = this.isUserAlreadyAMember.bind(this);
        this.getIsMemberUpdating = this.getIsMemberUpdating.bind(this);
        this.handleEmailInputKeyPress = this.handleEmailInputKeyPress.bind(this);
        this.handleInviteButtonClick = this.handleInviteButtonClick.bind(this);
        this.handleInviteButtonClick = this.handleInviteButtonClick.bind(this);
        this.handleDeleteProjectButtonClick = this.handleDeleteProjectButtonClick.bind(this);
        this.handleLeaveProjectButtonClick = this.handleLeaveProjectButtonClick.bind(this);
        this.handleMakePersonalButtonClick = this.handleMakePersonalButtonClick.bind(this);
        this.getMembersJSX = this.getMembersJSX.bind(this);
    }

    render() {
        let filteredMembers = this.getFilteredMembers();

        return (
            <FullScreenView>
                <div style={grid}>
                    <div style={{ gridRow: 'Toolbar' }}>
                        <Toolbar
                        disableGutters={true}>
                            <IconButton
                                onClick={() => { this.props.dispatch(setIsShareMenuOpen(false)) }}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Toolbar>
                    </div>

                    <div style={{ gridRow: 'Invite'}}>
                        <div style={inviteContainer}>
                            <TextField
                                placeholder="Email address"
                                inputRef={this.emailInputRef}
                                onKeyPress={this.handleEmailInputKeyPress} />
                            <Button
                                style={{ marginTop: '16px'}}
                                variant="contained"
                                onClick={this.handleInviteButtonClick}>
                                Invite
                             </Button>
                        </div>
                    </div>

                        <Paper style={{...paperStyle, gridRow: 'Members', overflowY: 'scroll'}}>
                            <List style={{padding: '8px 0px 8px 0px'}}>
                                <ListSubheader disableSticky={true}> Owners </ListSubheader>
                                <Divider />
                                { this.getMembersJSX(filteredMembers, 'owner') }

                                <ListSubheader disableSticky={true}> Members </ListSubheader>
                                <Divider />
                                { this.getMembersJSX(filteredMembers, 'member') }
                            </List>
                            
                        </Paper>

                    <div style={{ gridRow: 'Actions'}}>
                        <Paper style={paperStyle}>
                            <div style={actionsContainer}>
                                

                                <ActionButton
                                    onClick={() => {this.handleLeaveProjectButtonClick(filteredMembers)}}>
                                    Leave
                        </ActionButton>

                                <ActionButton
                                    onClick={() => { this.handleMakePersonalButtonClick(filteredMembers)}}>
                                    Make Personal
                        </ActionButton>

                        <ActionButton
                                    color="secondary"
                                    hidden={!this.isCurrentUserAnOwner(filteredMembers)}
                                    onClick={() => {this.handleDeleteProjectButtonClick(filteredMembers)}}>
                                    Delete
                        </ActionButton>
                            </div>
                        </Paper>
                    </div>
                </div>

                <WaitingOverlay open={this.props.isShareMenuWaiting} message={this.props.shareMenuMessage}
                    subMessage={this.props.shareMenuSubMessage} />

            </FullScreenView>      
        )
    }

    handleMakePersonalButtonClick(filteredMembers) {
        
    }

    handleLeaveProjectButtonClick(filteredMembers) {

    }

    handleDeleteProjectButtonClick(filteredMembers) {
        this.props.dispatch(removeRemoteProjectAsync(this.props.selectedProjectId, this.isCurrentUserAnOwner(filteredMembers)))
    }

    handleInviteButtonClick() {
        this.props.dispatch(inviteUserToProjectAsync(this.emailInputRef.current.value));
    }

    handleEmailInputKeyPress(e) {
        if (e.key === "Enter") {
            this.props.dispatch(inviteUserToProjectAsync(this.emailInputRef.current.value));
        }
    }

    getMembersJSX(filteredMembers, role) {
        var membersJSX = [];
        
        if (this.props.selectedProjectId !== -1) {
            var isCurrentUserOwner = this.isCurrentUserAnOwner(filteredMembers);

            var roledMembers = filteredMembers.filter(item => {
                return item.role === role;
            })            

            membersJSX = roledMembers.map( item => {
                var isUpdating = this.getIsMemberUpdating(item.userId, this.props.selectedProjectId);

                return (
                    <MemberListItem
                    key={item.userId}
                    isUpdating={isUpdating}
                    status={item.status}
                    displayName={item.displayName}
                    email={item.email}
                    role={item.role}
                    allowElevatedPrivileges={ isCurrentUserOwner }
                    canBeKicked={ isCurrentUserOwner && item.userId !== getUserUid() }
                    onKick={ () => { this.props.dispatch(kickUserFromProjectAsync(this.props.selectedProjectId, item.userId)) }}
                    onPromote={ () => { this.props.dispatch(updateMemberRoleAsync(item.userId, this.props.selectedProjectId, 'owner')) }}
                    onDemote={ () => { this.props.dispatch(updateMemberRoleAsync(item.userId, this.props.selectedProjectId, 'member')) }}
                    />
                )
            })

            return membersJSX;
        }
    }

    getIsMemberUpdating(userId, projectId) {
        return this.props.updatingUserIds.some(item => {
            return item.userId === userId && item.projectId === projectId;
        })
    }

    isCurrentUserTheOnlyOwner(filteredMembers) {
        if (this.isCurrentUserAnOwner(filteredMembers)) {
            var ownersOnly = filteredMembers.filter(item => {
                return item.role === 'owner';
            })

            return ownersOnly.length === 1;
        }
    }

    isCurrentUserAnOwner(filteredMembers) {
        var currentUserUid = getUserUid();
        var member = filteredMembers.find(item => {
            return item.userId === currentUserUid;
        })

        if (member) {
            return member.role === 'owner';
        }

        else {
            return false;
        }
    }

    getFilteredMembers() {
        var filteredMembers = [];
        filteredMembers =  this.props.members.filter(item => {
            return item.project === this.props.selectedProjectId;
        })

        return filteredMembers;
    }

    isUserAlreadyAMember(email) {
        var index = this.getFilteredMembers().findIndex(item => {
            return item.email === email;
        })

        return index !== -1;
    }

    parseStatusIntoKickButtonText(status) {
        switch (status) {
            case 'pending':
            return 'Revoke';

            case 'added':
            return 'Kick';

            case 'rejected invite':
            return 'Revoke';

            default: 
            return '';
        }
    }

    getProjectName() {
        if (this.props.selectedProjectId !== -1) {
            var selectedProject = this.props.projects.find(item => {
                return item.uid === this.props.selectedProjectId
            })

            if (selectedProject !== undefined) {
                return selectedProject.projectName;
            }
        }
    }

    toTitleCase(str) {
        str = str.toLowerCase()
            .split(' ')
            .map(function (word) {
                return (word.charAt(0).toUpperCase() + word.slice(1));
            });

        return str.join(' ');
    }
}

let mapStateToProps = state => {
    return {
        shareMenuMessage: state.shareMenuMessage,
        shareMenuSubMessage: state.shareMenuSubMessage,
        isShareMenuWaiting: state.isShareMenuWaiting,
        selectedProjectId: state.selectedProjectId,
        isSelectedProjectRemote: state.isSelectedProjectRemote,
        projects: state.projects,
        members: state.members,
        userEmail: state.userEmail,
        displayName: state.displayName,
        updatingUserIds: state.updatingUserIds,
        generalConfig: state.generalConfig,
    }
}

let VisibleShareMenu = connect(mapStateToProps)(ShareMenu);
export default VisibleShareMenu;