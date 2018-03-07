import React from 'react';
import '../assets/css/ProjectSelector.css';
import Hammer from 'hammerjs';

class ProjectSelector extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.getDueDateCountsJSX = this.getDueDateCountsJSX.bind(this);
    }

    componentDidMount() {
        var hammer = new Hammer(this.refs.projectSelector);
        hammer.on('press', ev => {
            this.props.onInputOpen(this.props.projectSelectorId);
        })
    }

    render(){
        var currentClassName = this.props.isSelected ? "ProjectSelectorActiveStyle" : "ProjectSelectorInactiveStyle";
        var projectLabelJSX = this.getProjectLabelJSX(this.props);
        var dueDateCounts = this.getDueDateCountsJSX(this.props);

        return (
            <div className="ProjectSelectorContainer">
                <div className={currentClassName} ref="projectSelector" onClick={this.handleClick}>
                    <div className="ProjectSelectorFlexContainer">
                        <div className="ProjectSelectorLabelContainer">
                            {projectLabelJSX}
                        </div>
                        <div className="ProjectSelectorIconContainer">
                            {dueDateCounts}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getDueDateCountsJSX(props) {
        if (props.dueDateDisplay == undefined || props.dueDateDisplay == {}) {
            return ( <div/>)
        }
        
        return (
            <div>
                <div className="ProjectSelectorIcon" data-colour="Red" data-count={props.dueDateDisplay.reds}>
                    <label className="ProjectSelectorIconText"> {props.dueDateDisplay.reds} </label>
                </div>
                <div className="ProjectSelectorIcon" data-colour="YellowRed" data-count={props.dueDateDisplay.reds}>
                    <label className="ProjectSelectorIconText"> {props.dueDateDisplay.reds} </label>
                </div>
                <div className="ProjectSelectorIcon" data-colour="Yellow" data-count={props.dueDateDisplay.yellows}>
                    <label className="ProjectSelectorIconText"> {props.dueDateDisplay.yellows} </label>
                </div>
                <div className="ProjectSelectorIcon" data-colour="Green" data-count={props.dueDateDisplay.greens}>
                    <label className="ProjectSelectorIconText"> {props.dueDateDisplay.greens} </label>
                </div>
            </div>
        )
    }

    getProjectLabelJSX(props) {
        if (this.props.isInputOpen) {
            return (
                <input id="projectSelectorInput" type="text" defaultValue={props.projectName} onKeyPress={this.handleKeyPress}/>
            )
        }

        else {
            return (
                <label className="ProjectSelectorText">{props.projectName}</label>
            )
        }
    }

    handleClick(e) {
        this.props.onClick(e, this.props.projectSelectorId);
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.props.onProjectNameSubmit(this.props.projectSelectorId, document.getElementById("projectSelectorInput").value);
        }
    }


}

export default ProjectSelector;