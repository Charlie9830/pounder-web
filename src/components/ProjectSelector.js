import React from 'react';
import '../assets/css/ProjectSelector.css';
import Hammer from 'hammerjs';
import FavoriteIcon from '../assets/icons/HeartIcon.svg';
import HasUnseenCommentsIcon from '../assets/icons/HasCommentsIcon.svg';

class ProjectSelector extends React.Component {
    constructor(props) {
        super(props);

        this.hammer = {};

        // Refs.
        this.containerRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.getIndicatorsJSX = this.getIndicatorsJSX.bind(this);
        this.getHeartJSX = this.getHeartJSX.bind(this);
    }

    componentDidMount() {
        this.hammer = new Hammer(this.containerRef.current);
        this.hammer.on('press', this.handlePress);
    }


    componentWillUnmount() {
        this.hammer.off('press', this.containerRef.current, this.handlePress);
    }

    render(){
        var indicators = this.getIndicatorsJSX(this.props);
        var heartJSX = this.getHeartJSX();

        return (
            <div className="ProjectSelectorContainer" ref={this.containerRef} onClick={this.handleClick} onDoubleClick={this.handlePress}>
                    <div className="ProjectSelectorFlexContainer">
                            {heartJSX}
                        <div className="ProjectSelectorLabelContainer">
                            <div className="ProjectSelectorText" data-isselected={this.props.isSelected}>
                                {this.props.projectName}
                            </div>
                        </div>
                        <div className="ProjectSelectorIconContainer">
                            {indicators}
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
    
    getIndicatorsJSX(props) {
        // eslint-disable-next-line
        if (props.projectIndicators == undefined || props.projectIndicators == {}) {
            return ( <div/>)
        }
        
        var hasUnseenCommentsJSX = this.getHasUnseenCommentsIconJSX(props);
        return (
            <div>
                <div className="ProjectSelectorIcon" data-colour="Red" data-count={props.projectIndicators.reds}>
                    <label className="ProjectSelectorIconText"> {props.projectIndicators.reds} </label>
                </div>
                <div className="ProjectSelectorIcon" data-colour="Blue" data-count={props.projectIndicators.yellowReds}>
                    <label className="ProjectSelectorIconText"> {props.projectIndicators.yellowReds} </label>
                </div>
                <div className="ProjectSelectorIcon" data-colour="Yellow" data-count={props.projectIndicators.yellows}>
                    <label className="ProjectSelectorIconText"> {props.projectIndicators.yellows} </label>
                </div>
                <div className="ProjectSelectorIcon" data-colour="Green" data-count={props.projectIndicators.greens}>
                    <label className="ProjectSelectorIconText"> {props.projectIndicators.greens} </label>
                </div>
                {hasUnseenCommentsJSX}
            </div>
        )
    }


    getHasUnseenCommentsIconJSX(props) {
        if (props.projectIndicators.hasUnseenComments) {
            return (
                <img className="ProjectSelectorCommentsIcon" src={HasUnseenCommentsIcon}/>
            )
        }
    }

    handleClick(e) {
        this.props.onClick(e, this.props.projectSelectorId);
    }

    handlePress(e) {
        this.props.onDoubleClick(e, this.props.projectSelectorId, this.props.projectName);
    }
}

export default ProjectSelector;