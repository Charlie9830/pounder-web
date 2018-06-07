import React from 'react';
import '../assets/css/ProjectSelector.css';
import Hammer from 'hammerjs';
import FavoriteIcon from '../assets/icons/HeartIcon.svg';

class ProjectSelector extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.getDueDateCountsJSX = this.getDueDateCountsJSX.bind(this);
        this.getHeartJSX = this.getHeartJSX.bind(this);
    }

    componentDidMount() {
        var hammer = new Hammer(this.refs.projectSelector);
        hammer.on('press', ev => {
            this.props.onInputOpen(this.props.projectSelectorId);
        })
    }

    render(){
        // var currentClassName = this.props.isSelected ? "ProjectSelectorActiveStyle" : "ProjectSelectorInactiveStyle";
        var projectLabelJSX = this.getProjectLabelJSX(this.props);
        var dueDateCounts = this.getDueDateCountsJSX(this.props);
        var heartJSX = this.getHeartJSX();

        return (
            <div className="ProjectSelectorContainer" ref="projectSelector" onClick={this.handleClick}>
                    <div className="ProjectSelectorFlexContainer">
                            {heartJSX}
                        <div className="ProjectSelectorLabelContainer">
                            {projectLabelJSX}
                        </div>
                        <div className="ProjectSelectorIconContainer">
                            {dueDateCounts}
                        </div>
                    </div>
            </div>
        )
    }

    getHeartJSX() {
        if (this.props.isFavouriteProject) {
            return (
                <div className="ProjectSelectorHeartContainer">
                    <img className="ProjectSelectorFavoriteIcon" src={FavoriteIcon} />
                </div>
            )
        }
    }
    
    getDueDateCountsJSX(props) {
        // eslint-disable-next-line
        if (props.dueDateDisplay == undefined || props.dueDateDisplay == {}) {
            return ( <div/>)
        }
        
        return (
            <div>
                <div className="ProjectSelectorIcon" data-colour="Red" data-count={props.dueDateDisplay.reds}>
                    <label className="ProjectSelectorIconText"> {props.dueDateDisplay.reds} </label>
                </div>
                <div className="ProjectSelectorIcon" data-colour="Blue" data-count={props.dueDateDisplay.yellowReds}>
                    <label className="ProjectSelectorIconText"> {props.dueDateDisplay.yellowReds} </label>
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
                <div className="ProjectSelectorText" data-isselected={this.props.isSelected}>{props.projectName}</div>
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