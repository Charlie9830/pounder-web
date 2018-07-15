import React from 'react';
import '../assets/css/ProjectSelector.css';
import Hammer from 'hammerjs';
import FavoriteIcon from '../assets/icons/HeartIcon.svg';
import FloatingTextInput from './FloatingTextInput';

class ProjectSelector extends React.Component {
    constructor(props) {
        super(props);

        this.hammer = {};

        // Refs.
        this.containerRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.getDueDateCountsJSX = this.getDueDateCountsJSX.bind(this);
        this.getHeartJSX = this.getHeartJSX.bind(this);
        this.getInputJSX = this.getInputJSX.bind(this);
        this.handleInputCancel = this.handleInputCancel.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
    }

    componentDidMount() {
        this.hammer = new Hammer(this.containerRef.current);
        this.hammer.on('press', this.handlePress);
    }


    componentWillUnmount() {
        this.hammer.off('press', this.containerRef.current, this.handlePress);
    }

    render(){
        var inputJSX = this.getInputJSX();
        var dueDateCounts = this.getDueDateCountsJSX(this.props);
        var heartJSX = this.getHeartJSX();

        return (
            <div className="ProjectSelectorContainer" ref={this.containerRef} onClick={this.handleClick} onDoubleClick={this.handlePress}>
                    <div className="ProjectSelectorFlexContainer">
                            {heartJSX}
                        <div className="ProjectSelectorLabelContainer">
                            {inputJSX}
                            <div className="ProjectSelectorText" data-isselected={this.props.isSelected}>
                                {this.props.projectName}
                            </div>
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

    getInputJSX() {
        if (this.props.isInputOpen) {
            return (
                <FloatingTextInput defaultValue={this.props.projectName} onTextSubmit={this.handleInputSubmit}
                onCancel={this.handleInputCancel}/>
            )
        }
    }

    handleClick(e) {
        this.props.onClick(e, this.props.projectSelectorId);
    }

    handlePress(e) {
        this.props.onDoubleClick(e, this.props.projectSelectorId);
    }

    handleInputCancel() {
        this.props.onProjectNameSubmit(this.props.projectSelectorId, this.props.projectName);
    }

    handleInputSubmit(value) {
        this.props.onProjectNameSubmit(this.props.projectSelectorId, value);
    }

    

}

export default ProjectSelector;