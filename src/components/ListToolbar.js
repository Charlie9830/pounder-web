import React from 'react';
import VerticalCenteringContainer from '../containers/VerticalCenteringContainer';
import OverlayMenuContainer from '../containers/OverlayMenuContainer';
import '../assets/css/ListToolbar.css';
import TaskListSettingsMenu from './TaskListSettingsMenu';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Hammer from 'hammerjs';
import TaskListSettingsIcon from '../assets/icons/SettingsIcon.svg';
import DeleteTaskListIcon from '../assets/icons/DeleteTaskListIcon.svg';

class ListToolbar extends React.Component{
    constructor(props) {
        super(props);

        // Refs.
        this.headerContainerRef = React.createRef();
        
        // Method Bindings.
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
        this.handleSettingsClick = this.handleSettingsClick.bind(this);
        this.handleTaskListSettingsChanged = this.handleTaskListSettingsChanged.bind(this);
        this.handleDoubleTap = this.handleDoubleTap.bind(this);
        this.handleSettingsMenuClose = this.handleSettingsMenuClose.bind(this);
        this.handleRenewNowButtonClick = this.handleRenewNowButtonClick.bind(this);
    }

    componentDidMount() {
        this.hammer = new Hammer(this.headerContainerRef.current);
        this.hammer.on('tap', this.handleDoubleTap);

        this.hammer.get('tap').set({interval: 300, taps: 2});
    }

    componentWillUnmount() {
        this.hammer.off('tap', this.headerContainerRef.current, this.handleDoubleTap);
    }

    render() {
        var settingsMenu = this.getSettingsMenu(this.props);
        var typeText = this.props.settings.checklistSettings.isChecklist ? "Checklist" : "";

        return (
            <div className="ListToolbar" data-isfocused={this.props.isFocused}>
                <div className="ListToolbarSettingsMenuContainer" onClick={this.handleSettingsClick}>
                    <img className="ListToolbarSettingsIcon" src={TaskListSettingsIcon} />
                    <TransitionGroup>
                        {settingsMenu}
                    </TransitionGroup>
                </div>

                <div className="ListToolbarTypeContainer">
                    <VerticalCenteringContainer>
                        <div className="ListToolbarTypeLabel"> {typeText} </div>
                    </VerticalCenteringContainer>
                </div>

                <div className="ListToolbarHeaderContainer" ref={this.headerContainerRef}>
                    <label className="ListToolbarHeader" data-isfocused={this.props.isFocused}>
                        {this.props.headerText}
                    </label>
                </div>

                <div className="ListToolbarDeleteButtonContainer" onClick={this.handleRemoveButtonClick}>
                    <img className="DeleteButton" src={DeleteTaskListIcon} />
                </div>
            </div>
        )
    }

    handleSettingsMenuClose() {
        this.props.onSettingsMenuClose();
    }

    handleDoubleTap(event) {
        this.props.onHeaderPress();
    }

    getSettingsMenu(props) {
        if (props.isSettingsMenuOpen) {
            return (
                <CSSTransition classNames="TaskListSettingsTransition" timeout={250} key="0">
                    <OverlayMenuContainer onOutsideChildBoundsClick={this.handleSettingsMenuClose}>
                        <TaskListSettingsMenu settings={this.props.settings} onSettingsMenuClose={this.handleSettingsMenuClose}
                            onSettingsChanged={this.handleTaskListSettingsChanged} />
                    </OverlayMenuContainer>
                </CSSTransition>
            ) 
        }
    }

    handleRenewNowButtonClick() {
        this.props.onRenewNowButtonClick();
    }

    handleTaskListSettingsChanged(newSettings, closeMenu) {
        this.props.onTaskListSettingsChanged(newSettings, closeMenu);
    }

    handleSettingsClick(e) {
        this.props.onSettingsButtonClick();
    }

    handleRemoveButtonClick(e) {
        this.props.onRemoveButtonClick(e);
    }
}

export default ListToolbar;