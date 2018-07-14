import React from 'react';
import '../assets/css/ProjectSelector.css';
import Hammer from 'hammerjs';
import FavoriteIcon from '../assets/icons/HeartIcon.svg';
import TextareaAutosize from 'react-autosize-textarea';

class ProjectSelector extends React.Component {
    constructor(props) {
        super(props);

        this.hammer = {};

        // Refs.
        this.containerRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.getDueDateCountsJSX = this.getDueDateCountsJSX.bind(this);
        this.getHeartJSX = this.getHeartJSX.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
    }

    componentDidMount() {
        if (this.props.isInputOpen) {
            this.textarea.focus();
        }

        this.hammer = new Hammer(this.containerRef.current);
        this.hammer.on('tap', this.handleDoubleClick);
        this.hammer.get('tap').set({taps: 2});
    }


    componentWillUnmount() {
        this.hammer.off('tap', this.containerRef.current, this.handleDoubleClick);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isInputOpen !== this.props.isInputOpen) {
            if (this.props.isInputOpen) {
                this.textarea.focus();
            }
        }
    }
    render(){
        // var currentClassName = this.props.isSelected ? "ProjectSelectorActiveStyle" : "ProjectSelectorInactiveStyle";
        var projectLabelJSX = this.getProjectLabelJSX(this.props);
        var dueDateCounts = this.getDueDateCountsJSX(this.props);
        var heartJSX = this.getHeartJSX();

        return (
            <div className="ProjectSelectorContainer" ref="projectSelector" ref={this.containerRef} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
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

    getProjectLabelJSX() {
        if (this.props.isInputOpen) {
            return (
                <TextareaAutosize className="ProjectSelectorInput" innerRef={ref => this.textarea = ref} type='text' defaultValue={this.props.projectName}
                onKeyPress={this.handleKeyPress} onBlur={this.handleInputBlur}/>
            )
        }

        else {
            return (
                <div className="ProjectSelectorText" data-isselected={this.props.isSelected}>{this.props.projectName}</div>
            )
        }
    }

    handleClick(e) {
        this.props.onClick(e, this.props.projectSelectorId);
    }

    handleDoubleClick(e) {
        this.props.onDoubleClick(e, this.props.projectSelectorId);
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.props.onProjectNameSubmit(this.props.projectSelectorId, this.textarea.value);
        }
    }

    handleInputBlur() {
        this.props.onProjectNameSubmit(this.props.projectSelectorId, this.textarea.value);
    }
    

}

export default ProjectSelector;