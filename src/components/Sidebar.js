import React from 'react';
import ProjectSelector from './ProjectSelector';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import VisibleAppSettingsMenu from './AppSettingsMenu/AppSettingsMenu';
import VisibleShareMenu from './ShareMenu';
import '../assets/css/Sidebar.css';
import '../assets/css/ToolBarButton.css';
import NewProjectIcon from '../assets/icons/NewProjectIcon.svg';
import RemoveProjectIcon from '../assets/icons/RemoveProjectIcon.svg';
import SettingsIcon from '../assets/icons/SettingsIcon.svg';
import AccountIconLoggedIn from '../assets/icons/AccountIconLoggedIn.svg';
import AccountIconLoggedOut from '../assets/icons/AccountIconLoggedOut.svg';
import AccountIconLoggingIn from '../assets/icons/AccountIconLoggingIn.svg';
import ShareIcon from '../assets/icons/ShareIcon.svg';
import AcceptIcon from '../assets/icons/AcceptIcon.svg';
import DenyIcon from '../assets/icons/DenyIcon.svg';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Settings from '@material-ui/icons/Settings';
import Share from '@material-ui/icons/Share';
import Add from '@material-ui/icons/Add';
import { Drawer, Portal } from '@material-ui/core';

class Sidebar extends React.Component{
    constructor(props) {
        super(props);

        // Method Bindings.
        this.handleProjectSelectorClick = this.handleProjectSelectorClick.bind(this);
        this.handleProjectSelectorDoubleClick = this.handleProjectSelectorDoubleClick.bind(this);
        this.handleAddProjectClick = this.handleAddProjectClick.bind(this);
        this.handleRemoveProjectClick = this.handleRemoveProjectClick.bind(this);
        this.getSidebarToolbarJSX = this.getSidebarToolbarJSX.bind(this);
        this.getSidebarBottombarJSX = this.getSidebarBottombarJSX.bind(this);
        this.getAccountIconSrc = this.getAccountIconSrc.bind(this);
        this.getAppSettingsJSX = this.getAppSettingsJSX.bind(this);
        this.handleShareMenuButtonClick = this.handleShareMenuButtonClick.bind(this);
        this.getSplitProjects = this.getSplitProjects.bind(this);
        this.projectMapper = this.projectMapper.bind(this);
        this.getLocalProjectsTitleJSX = this.getLocalProjectsTitleJSX.bind(this);
        this.getRemoteProjectsTitleJSX = this.getRemoteProjectsTitleJSX.bind(this);
        this.getProjectInvitesTitleJSX = this.getProjectInvitesTitleJSX.bind(this);
        this.getSidebarFullBleedDividerJSX = this.getSidebarFullBleedDividerJSX.bind(this);
        this.getInvitesJSX = this.getInvitesJSX.bind(this);
        this.handleDenyInviteButtonClick = this.handleDenyInviteButtonClick.bind(this);
        this.handleAcceptInviteButtonClick = this.handleAcceptInviteButtonClick.bind(this);
        this.getIsInviteUpdating = this.getIsInviteUpdating.bind(this);
        this.getShareMenuJSX = this.getShareMenuJSX.bind(this);
    }

    render() {
        var appSettingsJSX = this.getAppSettingsJSX();
        var sidebarBottombarJSX = this.getSidebarBottombarJSX();

        var splitProjects = this.getSplitProjects();
        var localProjectsCount = splitProjects.localProjects.length;
        var remoteProjectsCount = splitProjects.remoteProjects.length;
        var localProjectsTitleJSX = this.getLocalProjectsTitleJSX(localProjectsCount > 0 && remoteProjectsCount > 0);
        var remoteProjectsTitleJSX = this.getRemoteProjectsTitleJSX(splitProjects.remoteProjects.length > 0);
        var projectInvitesTitleJSX = this.getProjectInvitesTitleJSX(this.props.invites.length > 0);
        var invitesJSX = this.getInvitesJSX();
        var localAndRemoteDividerJSX = this.getSidebarFullBleedDividerJSX(localProjectsCount > 0 && remoteProjectsCount > 0);
        var invitesDividerJSX = this.getSidebarFullBleedDividerJSX((localProjectsCount > 0 || remoteProjectsCount > 0) &&
            this.props.invites.length > 0);
        var localProjectSelectorsJSX = splitProjects.localProjects.map(this.projectMapper);
        var remoteProjectSelectorsJSX = splitProjects.remoteProjects.map(this.projectMapper);
        var sidebarToolbarJSX = this.getSidebarToolbarJSX();
        var shareMenuJSX = this.getShareMenuJSX();


        const fabStyle = {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        };

        return (
            <div style={{height: '100vh', width: '100vw'}}>

                {/* App Settings  */} 
                {appSettingsJSX}   

                {/* Share Menu  */}
                {shareMenuJSX}

                { /* Grid - Toolbar, Selectors and Footer */}
                    {/* AppBar  */}
                        <AppBar position="sticky">
                            <Toolbar>
                                <Typography style={{flexGrow: '1'}} variant="h6">
                                    Handball
                                </Typography>

                                <IconButton>
                                    <Share onClick={this.handleShareMenuButtonClick} />
                                </IconButton>

                                <IconButton onClick={() => { this.props.onAppSettingsButtonClick() }}>
                                    <Settings />
                                </IconButton>

                                <IconButton onClick={() => { this.props.onAccountIconClick() }}>
                                    <AccountCircle />
                                </IconButton>
                            </Toolbar>
                        </AppBar>

                            <List>
                                {localProjectSelectorsJSX}
                            </List>

                <Button variant="fab" color="secondary" style={fabStyle} onClick={this.handleAddProjectClick}>
                    <Add/>
                </Button>
            </div>
        )
    }

    getShareMenuJSX() {
        if (this.props.isShareMenuOpen) {
          return (
            <VisibleShareMenu />
          )
        }
      }

    handleDenyInviteButtonClick(projectId) {
        this.props.onDenyInviteButtonClick(projectId);
    }

    handleAcceptInviteButtonClick(projectId) {
        this.props.onAcceptInviteButtonClick(projectId);
    }


    getInvitesJSX() {
        var jsx = this.props.invites.map((item, index) => {
            
            var isEnabled = !this.getIsInviteUpdating(item.projectId);
            return (
                <CSSTransition key={index} classNames="InviteContainer" timeout={250}>
                    <div className="InviteContainer" key={index} data-isenabled={isEnabled}>
                        {/* Project and Display Name  */}
                        <div className="InviteProjectAndDisplayName">
                            <div className="InviteProjectName"> {item.projectName} </div>
                            <div className="InviteDisplayName"> {item.sourceDisplayName} </div>
                        </div>

                        {/* Buttons  */}
                        <div className="InviteButtons">
                            <Button size='verysmall' iconSrc={AcceptIcon} onClick={() => { this.handleAcceptInviteButtonClick(item.projectId) }} />
                            <Button size='verysmall' iconSrc={DenyIcon} onClick={() => { this.handleDenyInviteButtonClick(item.projectId) }} />
                        </div>
                    </div>
                </CSSTransition>
            )
        })

        return jsx;
    }

    getIsInviteUpdating(inviteId) {
        return this.props.updatingInviteIds.includes(inviteId);
    }

    getSidebarFullBleedDividerJSX(shouldRender) {
        if (shouldRender) {
            return (
                <div className="SidebarFullBleedDivider" />
            )
        }
    }

    getRemoteProjectsTitleJSX(shouldRender) {
        if (shouldRender) {
            return (
                <div className="SidebarProjectsTitleFlexContainer">
                    <div className="SidebarProjectsTitle"> Shared </div>
                </div>
            )
        }
    }

    getProjectInvitesTitleJSX(shouldRender) {
        if (shouldRender) {
            return (
                <div className="SidebarProjectsTitleFlexContainer">
                    <div className="SidebarProjectsTitle"> Invites </div>
                </div>
            )
        }
    }

    getLocalProjectsTitleJSX(shouldRender) {
        if (shouldRender) {
            return (
                <div className="SidebarProjectsTitleFlexContainer">
                    <div className="SidebarProjectsTitle"> Personal </div>
                </div>
            )
        }
    }

    projectMapper(item, index) {
        var isSelected = this.props.selectedProjectId === item.uid;
        var projectIndicators = this.props.projectSelectorIndicators[item.uid];
        var isFavouriteProject = this.props.favouriteProjectId === item.uid;

        let projectSelector = () => {
            return (
                <ProjectSelector projectSelectorId={item.uid} projectName={item.projectName}
                    onClick={this.handleProjectSelectorClick} onDoubleClick={this.handleProjectSelectorDoubleClick}
                    projectIndicators={projectIndicators}
                    isFavouriteProject={isFavouriteProject} />
            )
        }


        return (
            <ListItem style={{width: '100%'}} selected={isSelected} key={index} component={projectSelector}/>
                
        )
    }

    getSplitProjects() {
        var localProjects = [];
        var remoteProjects = [];

        this.props.projects.forEach(item => {
            if (item.isRemote) {
                remoteProjects.push(item);
            }
            else {
                localProjects.push(item);
            }
        })

        return { localProjects: localProjects, remoteProjects: remoteProjects }
    }

    handleShareMenuButtonClick() {
        this.props.onShareMenuButtonClick();
    }

    getAppSettingsJSX() {
        return (
                <Drawer anchor="right" variant="temporary" open={this.props.isAppSettingsOpen}>
                    <VisibleAppSettingsMenu />
                </Drawer>
        )
    }

    getSidebarToolbarJSX() {
        var accountIconSrc = this.getAccountIconSrc();
        var isRemoveProjectButtonEnabled = this.props.selectedProjectId !== -1 && this.props.projects.length > 0 &&
            this.props.isSelectedProjectRemote !== true;

        return (
            <div className="SidebarToolbar">
                <div className="SidebarToolbarFlexContainer">
                    <Button iconSrc={NewProjectIcon} onClick={this.handleAddProjectClick} 
                    isEnabled={this.props.isLoggedIn}/>
                    <Button iconSrc={RemoveProjectIcon} onClick={this.handleRemoveProjectClick} 
                    isEnabled={isRemoveProjectButtonEnabled}/>
                    <div className="SidebarToolbarDivider" />
                    <div className="SidebarAccountIconContainer" onClick={() => { this.props.onAccountIconClick() }}>
                        <img className="SidebarAccountIcon" src={accountIconSrc} />
                    </div>
                </div>
            </div>
        )
    }

    getAccountIconSrc() {
        if (this.props.isLoggingIn) {
            return AccountIconLoggingIn;
        }

        else {
            return this.props.isLoggedIn ? AccountIconLoggedIn : AccountIconLoggedOut;
        }
    }

    getSidebarBottombarJSX() {
        var isShareButtonEnabled = this.props.selectedProjectId !== -1;
        return (
            <div className="SidebarBottombarContainer">
                <div className="SidebarBottombarFlexContainer">
                    <Button iconSrc={SettingsIcon} onClick={() => {this.props.onAppSettingsButtonClick()}}/>
                    <Button iconSrc={ShareIcon} onClick={this.handleShareMenuButtonClick} isEnabled={isShareButtonEnabled}/>
                </div>
            </div>
        )
    }

    handleProjectSelectorClick(e, projectSelectorId) {
        this.props.onProjectSelectorClick(e, projectSelectorId);

        // Only close if a Project Selector Input isn't open.
        if (this.props.openProjectSelectorInputId !== projectSelectorId) {
            this.props.onRequestSidebarClose();
        }
    }

    handleProjectSelectorDoubleClick(e, projectSelectorId, currentData,) {
        this.props.onProjectSelectorInputDoubleClick(projectSelectorId, currentData);
    }

    handleAddProjectClick(e) {
        this.props.onAddProjectClick();
    }

    handleRemoveProjectClick(e) {
        this.props.onRemoveProjectClick(this.props.selectedProjectId);
    }
}

export default Sidebar;