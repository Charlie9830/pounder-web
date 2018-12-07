import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MenuSubtitle from './MenuSubtitle';
import MenuHeader from './MenuHeader';
import Spinner from './Spinner';
import CenteringContainer from '../containers/CenteringContainer';
import '../assets/css/ShareMenu.css';
import { inviteUserToProjectAsync, kickUserFromProjectAsync, updateMemberRoleAsync, setMessageBox, setIsShareMenuOpen,
removeRemoteProjectAsync, migrateProjectBackToLocalAsync } from 'handball-libs/libs/pounder-redux/action-creators';
import { MessageBoxTypes } from 'handball-libs/libs/pounder-redux';
import { getUserUid } from 'handball-libs/libs/pounder-firebase';
import BackArrow from '../assets/icons/BackArrow.svg';

import { Grid, Toolbar, AppBar, Typography, IconButton, TextField, NativeSelect, Button, List, ListSubheader, Paper,  ListItem, ListItemText, ListItemIcon,
ListItemSecondaryAction, Modal, CircularProgress } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import ArrowUpIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';
import CheckIcon from '@material-ui/icons/Check';
import ClockIcon from '@material-ui/icons/AccessTime';
import CrossIcon from '@material-ui/icons/Clear';

let MemberStatusIcon = (props) => {
    switch(props.status) {
        case "pending":
        return <ClockIcon fontSize="small"/>

        case "added":
        return <CheckIcon fontSize="small"/>

        case "denied":
        return <CrossIcon fontSize="small"/>

        default:
        return null;
    }
}

let WaitingOverlay = (props) => {
    let gridStyle = {
        width: '100%',
        height: '100%',
    }

    return (
        <Modal open={props.open} disableAutoFocus={true}>
            <Grid container style={gridStyle}
                direction="column"
                justify="center"
                alignItems="center">
                    <Grid item>
                        <CircularProgress />
                    </Grid>

                    <Grid item>
                        <Typography align="center" variant="h6"> {props.message} </Typography>
                    </Grid>

                    <Grid item style={{marginTop: '32px'}}>
                        <Typography align="center" variant="h6"> {props.subMessage} </Typography>
                    </Grid>
                    
            </Grid>
        </Modal>
    )
}

class ShareMenu extends React.Component {
    constructor(props) {
        super(props);

        // Refs.
        this.emailInputRef = React.createRef();
        this.roleSelectRef = React.createRef();

        // Method Bindings.
        this.getProjectName = this.getProjectName.bind(this);
        this.getMembersJSX = this.getMembersJSX.bind(this);
        this.getRoleButtonJSX = this.getRoleButtonJSX.bind(this);
        this.getKickButtonJSX = this.getKickButtonJSX.bind(this);
        this.handleRoleButtonClick = this.handleRoleButtonClick.bind(this);
        this.handleKickButtonClick = this.handleKickButtonClick.bind(this);
        this.handleInviteButtonClick = this.handleInviteButtonClick.bind(this);
        this.getFilteredMembers = this.getFilteredMembers.bind(this);
        this.isCurrentUserAnOwner = this.isCurrentUserAnOwner.bind(this);
        this.handleLeaveButtonClick = this.handleLeaveButtonClick.bind(this);
        this.getInviteButtonJSX = this.getInviteButtonJSX.bind(this);
        this.isUserAlreadyAMember = this.isUserAlreadyAMember.bind(this);
        this.handleMakePersonalButtonClick = this.handleMakePersonalButtonClick.bind(this);
        this.handleEmailInputKeyPress = this.handleEmailInputKeyPress.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
        this.getIsMemberUpdating = this.getIsMemberUpdating.bind(this);
        this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    }

    render() {
        let ShareMenuGrid = {
            width: '100vw',
            height: '100vh',
            display: 'grid',
            gridTemplateRows: '[Toolbar]auto [Invite]min-content [MemberList]1fr [Actions]1fr ',
        }

        let ToolbarContainer = {
            gridRow: 'Toolbar'
        }

        let InviteContainer = {
            gridRow: 'Invite',
        }

        let ActionsContainer = {
            gridRow: 'Actions'
        }

        let MemberListContainer = {
            gridRow: 'MemberList'
        }

        var filteredMembers = this.getFilteredMembers();
        var ownersJSX = this.getMembersJSX(filteredMembers, 'owner');
        var membersJSX = this.getMembersJSX(filteredMembers, 'member');
        var isLeaveButtonEnabled = this.props.isSelectedProjectRemote;
        var isMakePersonalButtonEnabled = this.props.isSelectedProjectRemote && this.isCurrentUserAnOwner(filteredMembers);
        var isCurrentUserAnOwner = this.isCurrentUserAnOwner(filteredMembers);

        return (
            <div style={ShareMenuGrid}>  
                {/* Spinner Overlay  */} 
                <WaitingOverlay open={this.props.isShareMenuWaiting} message={this.props.shareMenuMessage}
                 subMessage={this.props.shareMenuSubMessage}/>
            
                {/* Toolbar  */} 
                <div style={ToolbarContainer}>
                    <AppBar position="sticky">
                        <Toolbar>
                            <IconButton onClick={this.handleBackArrowClick}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography variant="h6">
                                Invite Users
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>

                {/* Invite Container  */} 
                <div style={InviteContainer}>
                    <Grid container
                    direction="column"
                    justify="space-between"
                    alignItems="center">
                        <TextField type="email" label="Email" inputRef={this.emailInputRef} onKeyPress={this.handleEmailInputKeyPress}/>

                        <div style={{height: '8px'}}/>

                        <NativeSelect defaultValue="member" inputRef={this.roleSelectRef}>
                            <option value='owner'> Owner </option>
                            <option value='member'> Member </option>
                        </NativeSelect>

                        <div style={{height: '16px'}}/>

                        <Button variant="contained" onClick={this.handleInviteButtonClick}> Invite </Button>
                    </Grid>
                </div>

                {/* Member List Container  */} 
                <div style={MemberListContainer}>
                        <List>
                            <ListSubheader> Owners </ListSubheader>
                                {ownersJSX}
                            <ListSubheader> Members </ListSubheader>
                                {membersJSX}
                        </List>
                    
                </div>

                 {/* Actions Container */ }
                 <div style={ActionsContainer}>
                 <Grid container style={{height: '100%'}}
                 direction="row"
                 justify="center"
                 alignItems="center">
                     <Button variant="outlined" style={{margin: '8px'}} size="small" onClick={this.handleLeaveButtonClick} hidden={!isLeaveButtonEnabled}> Leave Project </Button>
                     <Button variant="outlined" style={{margin: '8px'}} size="small" onClick={this.handleMakePersonalButtonClick} hidden={!isMakePersonalButtonEnabled}> Make Personal </Button>
                     <Button variant="outlined"  style={{margin: '8px'}} size="small" color="secondary" onClick={this.handleDeleteButtonClick} hidden={!isCurrentUserAnOwner}> Delete Project </Button>
                 </Grid>
             </div>

            </div>      
        )
    }

    getMembersJSX(filteredMembers, role) {
        var membersJSX = [];
        
        if (this.props.selectedProjectId !== -1) {
            var isCurrentUserOwner = this.isCurrentUserAnOwner(filteredMembers);

            var roledMembers = filteredMembers.filter(item => {
                return item.role === role;
            })

            var promoteDemoteIcon = role === "owner" ? <ArrowDownIcon fontSize="small"/> : <ArrowUpIcon fontSize="small"/>;
            var roleButtonAction = role === "owner" ? "demote" : "promote";
            

            membersJSX = roledMembers.map((item, index) => {
                var isUpdating = this.getIsMemberUpdating(item.userId, this.props.selectedProjectId);
                var kickUserButtonJSX = isCurrentUserOwner && item.userId !== getUserUid() ? <IconButton onClick={() => {this.handleKickButtonClick(item.displayName, item.userId)}}> <RemoveIcon fontSize="small"/> </IconButton> : null;

                return (
                    <ListItem key={item.userId} disabled={isUpdating}>
                        <ListItemIcon>
                            <MemberStatusIcon status={item.status}/>
                        </ListItemIcon>

                        <ListItemText primary={item.displayName} secondary={item.email}/>

                        <ListItemSecondaryAction>

                            <IconButton onClick={() => {this.handleRoleButtonClick(roleButtonAction, item.userId, filteredMembers)}} >
                                {promoteDemoteIcon}
                            </IconButton>

                            {kickUserButtonJSX}
                            
                        </ListItemSecondaryAction>
                    </ListItem>
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

    handleEmailInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleInviteButtonClick();
        }
    }

    handleMakePersonalButtonClick() {
        var message  = "This will kick all users from the Project and return it to being Personal only. " +
        "Are you sure you want to continue?";
        this.props.dispatch(setMessageBox(true, "Make this project Personal only?" ,message, MessageBoxTypes.STANDARD, null,
        result => {
            if (result === 'ok') {
                this.props.dispatch(migrateProjectBackToLocalAsync(this.props.selectedProjectId, this.getProjectName()));
            }

            this.props.dispatch(setMessageBox(false));
        } ))
    }

    handleDeleteButtonClick() {
        var message  = "Deleting this project will remove it from all other contributors accounts as well. Are you sure you want to continue?"
        this.props.dispatch(setMessageBox(true, "Delete this project?", message, MessageBoxTypes.STANDARD, null,
        result => {
            if (result === 'ok') {
                this.props.dispatch(removeRemoteProjectAsync(this.props.selectedProjectId));
            }

            this.props.dispatch(setMessageBox(false));
        } ))
    }

    handleBackArrowClick() {
        this.props.dispatch(setIsShareMenuOpen(false));
    }

    getInviteButtonJSX() {
        if (this.props.isInvitingUser) {
            return (
                <Spinner size="big"/>
            )
        }

        else {
            return (
                <Button text="Invite" onClick={this.handleInviteButtonClick} />
            )
        }
        
    }

    getWaitingOverlay() {
        if (this.props.isShareMenuWaiting) {
            return (
                <div className="ShareMenuOverlay">
                    <CenteringContainer>
                        <div className="ShareMenuOverlayContentContainer">
                            <Spinner size="medium"/>
                            <div className="ShareMenuMessage">
                                {this.props.shareMenuMessage}
                            </div>
                            <div className="ShareMenuSubMessage">
                                {this.props.shareMenuSubMessage}
                            </div>
                        </div>
                    </CenteringContainer>
                </div>
            )
        }
    }

    handleLeaveButtonClick() {
        var filteredMembers = this.getFilteredMembers();
        if (filteredMembers.length === 1) {
            // User is last Member.
            var message = "You are the sole contributor to this project, if you leave the project, it will be deleted from the database. " +
            "Are you sure you want to leave?";
            this.props.dispatch(setMessageBox(true, "Leave this project?", message, MessageBoxTypes.STANDARD, null, result => {
                this.props.dispatch(setMessageBox(false));
                if (result === "ok") {
                    this.props.dispatch(removeRemoteProjectAsync(this.props.selectedProjectId));
                }
            }))
        }
        
        else if (filteredMembers.length > 1 && this.isCurrentUserTheOnlyOwner(filteredMembers)) {
            // User is the only Owner.
            this.props.dispatch(setMessageBox(true, "You are the sole owner", 'You must promote another user to Owner before you can leave the project.',
                MessageBoxTypes.OK_ONLY, null, result => {
                    this.props.dispatch(setMessageBox(false))
                }
            ))
        }

        else {
            this.props.dispatch(setMessageBox(true, "Leave Project", 'Are you sure you want to Leave?', MessageBoxTypes.STANDARD, null,
        result => {
            if (result === "ok") {
                this.props.dispatch(kickUserFromProjectAsync(this.props.selectedProjectId, getUserUid()));
                this.props.dispatch(setIsShareMenuOpen(false));
            }

            this.props.dispatch(setMessageBox(false));
        }))
            
        }
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

    handleInviteButtonClick() {
        var email = this.emailInputRef.current.value;

        if (email === this.props.userEmail) {
            this.props.dispatch(setMessageBox(true, "", "You can't invite yourself to your own project.", MessageBoxTypes.OK_ONLY,
        null, () => {this.props.dispatch(setMessageBox(false))}));
        }

        if (this.isUserAlreadyAMember(email)) {
            this.props.dispatch(setMessageBox(true, "", "User is already a contributor.", MessageBoxTypes.OK_ONLY,
        null, () => {this.props.dispatch(setMessageBox(false))}));
        }

        else {
            this.props.dispatch(inviteUserToProjectAsync(this.getProjectName(),
            email,
            this.props.userEmail,
            this.props.displayName,
            this.props.selectedProjectId,
            this.roleSelectRef.current.value));
        }
    }

    isUserAlreadyAMember(email) {
        var index = this.getFilteredMembers().findIndex(item => {
            return item.email === email;
        })

        return index !== -1;
    }

    handleRoleButtonClick(action, userId, filteredMembers) {
        if (action === 'promote') {
            this.props.dispatch(updateMemberRoleAsync(userId, this.props.selectedProjectId, 'owner'));
        }

        if (action === 'demote') {
            // Ensure the user can't Demote themselves before first delegating another Member to be an Owner.
            if (this.isCurrentUserTheOnlyOwner(this.getFilteredMembers())) {
               this.props.dispatch(setMessageBox(true, "You are the sole Owner", "You must delegate another member to be an owner before you can demote yourself.", MessageBoxTypes.OK_ONLY,
            null, () => { this.props.dispatch(setMessageBox(false)) }));
            }

            else {
                this.props.dispatch(updateMemberRoleAsync(userId, this.props.selectedProjectId, 'member'));
            }
            
        }
    }

    handleKickButtonClick(displayName, userId) {
        this.props.dispatch(setMessageBox(true, "", `Are you sure you want to kick ${displayName} from the Project?`, MessageBoxTypes.STANDARD, null, (result) => {
            if (result === "ok") {
                this.props.dispatch(kickUserFromProjectAsync(this.props.selectedProjectId, userId));
            }

            this.props.dispatch(setMessageBox(false));
        }))
        
    }

    getRoleButtonJSX(member, isCurrentUserOwner) {
        if (member.role === 'member') {
            return (
                <Button text="Promote" size="small" isEnabled={isCurrentUserOwner}
                 onClick={() => { this.handleRoleButtonClick('promote', member.userId) }} />
            )
        }

        else {
            return (
                <Button text="Demote" size="small" isEnabled={isCurrentUserOwner}
                 onClick={() => { this.handleRoleButtonClick('demote', member.userId) }} />
            )
        }
    }

    getKickButtonJSX(member, isCurrentUserOwner) {
        var isCurrentUser = member.userId === getUserUid();
        var isEnabled = !isCurrentUser && isCurrentUserOwner;
        
        var text = this.parseStatusIntoKickButtonText(member.status);
        return (
            <Button text={text} size="small" isEnabled={isEnabled}
             onClick={() => { this.handleKickButtonClick(member.displayName, member.userId) }} />
        )
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