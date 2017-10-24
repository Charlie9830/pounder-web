import React from 'react';
import ProjectSelector from './ProjectSelector';
import '../assets/css/Sidebar.css';
import '../assets/css/ToolBarButton.css';

class Sidebar extends React.Component{
    constructor(props) {
        super(props);

        // Method Bindings.
        this.handleProjectSelectorClick = this.handleProjectSelectorClick.bind(this);
        this.handleProjectSelectorDoubleClick = this.handleProjectSelectorDoubleClick.bind(this);
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
                    isInputOpen={isInputOpen} onClick={this.handleProjectSelectorClick} onDoubleClick={this.handleProjectSelectorDoubleClick}
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
                        <div className="SidebarCollapseButton" onClick={this.handleSidebarCollapseButtonClick}/>
                    </div>
                </div>
            </div>
        )
    }

    getSidebarToolbarJSX() {
        if (this.state.isCollapsed !== true) {
            return (
                <div className="SidebarToolbar">
                    <img className="ToolBarButton" src="NewProjectIcon.svg" onClick={this.handleAddProjectClick} />
                    <img className="ToolBarButton" src="RemoveProjectIcon.svg" onClick={this.handleRemoveProjectClick} />
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
        this.setState({isCollapsed: true});
        this.props.onProjectSelectorClick(e, projectSelectorId);
    }

    handleProjectSelectorDoubleClick(e, projectSelectorId) {
        this.setState({openProjectSelectorInputId: projectSelectorId});
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