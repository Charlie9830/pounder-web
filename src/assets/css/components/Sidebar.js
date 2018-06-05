import React from 'react';
import ProjectSelector from './ProjectSelector';
import '../assets/css/Sidebar.css';
import '../assets/css/ToolBarButton.css';
import NewProjectIcon from '../assets/icons/NewProjectIcon.svg';
import RemoveProjectIcon from '../assets/icons/RemoveProjectIcon.svg';

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

            return (
                <ProjectSelector key={index} projectSelectorId={item.uid} projectName={item.projectName} isSelected={isSelected}
                    isInputOpen={isInputOpen} onClick={this.handleProjectSelectorClick} onInputOpen={this.handleProjectSelectorInputOpen}
                    onProjectNameSubmit={this.handleProjectNameSubmit} dueDateDisplay={dueDateDisplay} />
            )
        })

        var sidebarToolbarJSX = this.getSidebarToolbarJSX();

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
            return (
                <div className="SidebarToolbar">
                    <div className="SidebarToolbarFlexContainer">
                        <div className="ToolBarButtonContainer">
                            <img className="ToolBarButton" src={NewProjectIcon} onClick={this.handleAddProjectClick} />
                        </div>
                        <div className="ToolBarButtonContainer">
                            <img className="ToolBarButton" src={RemoveProjectIcon} onClick={this.handleRemoveProjectClick} />
                        </div>
                    </div>
                </div>
            )     
        }

        else {
            return (<div/>)
        }
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