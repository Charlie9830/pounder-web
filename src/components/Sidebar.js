import React from 'react';
import ProjectSelector from './ProjectSelector';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import VisibleAppSettingsMenu from './AppSettingsMenu/AppSettingsMenu';
import '../assets/css/Sidebar.css';
import '../assets/css/ToolBarButton.css';
import NewProjectIcon from '../assets/icons/NewProjectIcon.svg';
import RemoveProjectIcon from '../assets/icons/RemoveProjectIcon.svg';
import SettingsIcon from '../assets/icons/SettingsIcon.svg';
import Button from './Button';
import AccountIconLoggedIn from '../assets/icons/AccountIconLoggedIn.svg';
import AccountIconLoggedOut from '../assets/icons/AccountIconLoggedOut.svg';
import AccountIconLoggingIn from '../assets/icons/AccountIconLoggingIn.svg';

class Sidebar extends React.Component{
    constructor(props) {
        super(props);

        // Method Bindings.
        this.handleProjectSelectorClick = this.handleProjectSelectorClick.bind(this);
        this.handleProjectSelectorInputOpen = this.handleProjectSelectorInputOpen.bind(this);
        this.handleAddProjectClick = this.handleAddProjectClick.bind(this);
        this.handleRemoveProjectClick = this.handleRemoveProjectClick.bind(this);
        this.handleProjectNameSubmit = this.handleProjectNameSubmit.bind(this);
        this.getSidebarToolbarJSX = this.getSidebarToolbarJSX.bind(this);
        this.getSidebarBottombarJSX = this.getSidebarBottombarJSX.bind(this);
        this.getAccountIconSrc = this.getAccountIconSrc.bind(this);
        this.getAppSettingsJSX = this.getAppSettingsJSX.bind(this);

        this.state = {
            openProjectSelectorInputId: -1,
        }
    }

    render() {
        var appSettingsJSX = this.getAppSettingsJSX();

        var projectSelectorsJSX = this.props.projects.map((item, index) => {
            var isSelected = this.props.selectedProjectId === item.uid;
            var isInputOpen = item.uid === this.state.openProjectSelectorInputId;
            var dueDateDisplay = this.props.projectSelectorDueDateDisplays[item.uid];
            var isFavouriteProject = this.props.favouriteProjectId === item.uid;

            return (
                <ProjectSelector key={index} projectSelectorId={item.uid} projectName={item.projectName} isSelected={isSelected}
                    isInputOpen={isInputOpen} onClick={this.handleProjectSelectorClick} onInputOpen={this.handleProjectSelectorInputOpen}
                    onProjectNameSubmit={this.handleProjectNameSubmit} dueDateDisplay={dueDateDisplay}
                    isFavouriteProject={isFavouriteProject} />
            )
        })

        var sidebarToolbarJSX = this.getSidebarToolbarJSX();
        var sidebarBottombarJSX = this.getSidebarBottombarJSX();

        return (
            <div>
                {/* App Settings */}
                {appSettingsJSX}

                <div>
                    {sidebarToolbarJSX}
                </div>
                <div className="SidebarVerticalFlexContainer">
                    <div className="ProjectSelectorsFlexItemContainer">
                        <div>
                            {projectSelectorsJSX}
                        </div>
                    </div>
                    {sidebarBottombarJSX}
                </div>
            </div>
        )
    }

    getAppSettingsJSX() {
            return (
                <CSSTransition key={"appSettings"} classNames="AppSettingsContainer" in={this.props.isAppSettingsOpen} timeout={250}
                mountOnEnter={true} unmountOnExit={true}>
                    <VisibleAppSettingsMenu/>
                </CSSTransition>
            )
    }

    getSidebarToolbarJSX() {
        var accountIconSrc = this.getAccountIconSrc();

        return (
            <div className="SidebarToolbar">
                <div className="SidebarToolbarFlexContainer">
                    <Button iconSrc={NewProjectIcon} onClick={this.handleAddProjectClick} />
                    <Button iconSrc={RemoveProjectIcon} onClick={this.handleRemoveProjectClick} />
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
        return (
            <div className="SidebarBottombarContainer">
                <div className="SidebarBottombarFlexContainer">
                    <Button iconSrc={SettingsIcon} onClick={() => {this.props.onAppSettingsButtonClick()}}/>
                </div>
            </div>
        )
    }

    handleProjectSelectorClick(e, projectSelectorId) {
        this.props.onProjectSelectorClick(e, projectSelectorId);

        // Only close if a Project Selector Input isn't open.
        if (this.state.openProjectSelectorInputId !== projectSelectorId) {
            this.props.onRequestSidebarClose();
        }
    }

    handleProjectSelectorInputOpen(projectSelectorId) {
        this.setState({openProjectSelectorInputId: projectSelectorId });
    }

    handleAddProjectClick(e) {
        this.props.onAddProjectClick();
    }

    handleRemoveProjectClick(e) {
        this.props.onRemoveProjectClick(this.props.selectedProjectId);
    }

    handleProjectNameSubmit(projectSelectorId, newProjectName) {
        // Close Input and Forward on Event.
        this.setState({openProjectSelectorInputId: -1})
        this.props.onProjectNameSubmit(projectSelectorId, newProjectName);
    }
}

export default Sidebar;