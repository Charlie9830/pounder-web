import React from 'react';
import ProjectSelector from './ProjectSelector';
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
        this.handleSidebarCollapseButtonClick = this.handleSidebarCollapseButtonClick.bind(this);
        this.getSidebarToolbarJSX = this.getSidebarToolbarJSX.bind(this);
        this.getSidebarBottombarJSX = this.getSidebarBottombarJSX.bind(this);
        this.getAccountIconSrc = this.getAccountIconSrc.bind(this);

        this.state = {
            openProjectSelectorInputId: -1,
            isCollapsed: false,
        }
    }

    render() {
        var projectSelectorsContainerClassName = this.state.isCollapsed ? "ProjectSelectorsFlexItemContainerCollapsed" :
         "ProjectSelectorsFlexItemContainerOpen";
        var sidebarClassName = this.state.isCollapsed ? "SidebarCollapsed" : "SidebarOpen";

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
            <div className={sidebarClassName}>
                <div>
                    {sidebarToolbarJSX}
                </div>
                <div className="SidebarVerticalFlexContainer">
                    <div className={projectSelectorsContainerClassName}>
                        <div>
                            {projectSelectorsJSX}
                        </div>
                    </div>
                    {sidebarBottombarJSX}
                    <div className="CollapseButtonFlexItemContainer">
                        <div className="SidebarCollapseButton" onClick={this.handleSidebarCollapseButtonClick}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getSidebarToolbarJSX() {
        if (this.state.isCollapsed !== true) {
            var accountIconSrc = this.getAccountIconSrc();

            return (
                <div className="SidebarToolbar">
                    <div className="SidebarToolbarFlexContainer">
                        <Button iconSrc={NewProjectIcon} onClick={this.handleAddProjectClick}/>
                        <Button iconSrc={RemoveProjectIcon} onClick={this.handleRemoveProjectClick}/>
                        <div className="SidebarToolbarDivider"/>
                        <div className="SidebarAccountIconContainer" onClick={() => {this.props.onAccountIconClick()}}>
                            <img className="SidebarAccountIcon" src={accountIconSrc}/>
                        </div>
                    </div>
                </div>
            )     
        }

        else {
            return (<div/>)
        }
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
            <div className="SidebarBottombarContainer" data-iscollapsed={this.state.isCollapsed}>
                <div className="SidebarBottombarFlexContainer">
                    <Button iconSrc={SettingsIcon} onClick={() => {this.props.onAppSettingsButtonClick()}}/>
                </div>
            </div>
        )
    }

    handleSidebarCollapseButtonClick(e) {
        this.setState({isCollapsed: !this.state.isCollapsed});
    }

    handleProjectSelectorClick(e, projectSelectorId) {
        if (this.state.openProjectSelectorInputId !== projectSelectorId) {
            this.setState({isCollapsed: true }); // Don't collapse if an Input is open.
        }

        this.props.onProjectSelectorClick(e, projectSelectorId);
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