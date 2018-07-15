import React from 'react';
import OverlayMenuContainer from '../containers/OverlayMenuContainer';
import '../assets/css/ListToolbar.css';
import TaskListSettingsMenu from './TaskListSettingsMenu';
import Hammer from 'hammerjs';
import TaskListSettingsIcon from '../assets/icons/SettingsIcon.svg';
import DeleteTaskListIcon from '../assets/icons/DeleteTaskListIcon.svg';
import FloatingTextInput from './FloatingTextInput';

class ListToolbar extends React.Component{
    constructor(props) {
        super(props);

        // Refs.
        this.headerContainerRef = React.createRef();
        
        // Method Bindings.
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
        this.handleSettingsClick = this.handleSettingsClick.bind(this);
        this.handleTaskListSettingsChanged = this.handleTaskListSettingsChanged.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.handleHeaderInputSubmit = this.handleHeaderInputSubmit.bind(this);
        this.handleHeaderInputCancel = this.handleHeaderInputCancel.bind(this);
        this.handleSettingsMenuClose = this.handleSettingsMenuClose.bind(this);
    }

    componentDidMount() {
        if (this.props.isHeaderOpen) {
            this.headerInputRef.current.focus();
        }

        this.hammer = new Hammer(this.headerContainerRef.current);
        this.hammer.on('press', this.handlePress);
    }

    componentWillUnmount() {
        this.hammer.off('press', this.headerContainerRef.current, this.handlePress);
    }

    render() {
        var settingsMenu = this.getSettingsMenu(this.props);
        var headerInputJSX = this.getHeaderInputJSX(this.props);

        return (
            <div className="ListToolbar" data-isfocused={this.props.isFocused}>
                <div className="ListToolbarSettingsMenuContainer" onClick={this.handleSettingsClick}>
                    <img className="ListToolbarSettingsIcon" src={TaskListSettingsIcon} />
                    {settingsMenu}
                </div>

                <div className="ListToolbarHeaderContainer" ref={this.headerContainerRef}>
                    {headerInputJSX}
                    <label className="ListToolbarHeader" data-isfocused={this.props.isFocused} onDoubleClick={this.handleDoubleClick} ref={this.headerLabelRef}>
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

    handlePress(event) {
        this.props.onHeaderPress();
    }

    getSettingsMenu(props) {
        if (props.isSettingsMenuOpen) {
            return (
                <OverlayMenuContainer onOutsideChildBoundsClick={this.handleSettingsMenuClose}>
                    <TaskListSettingsMenu settings={this.props.settings}
                    onSettingsChanged={this.handleTaskListSettingsChanged}/>
                </OverlayMenuContainer>
            ) 
        }
    }

    handleTaskListSettingsChanged(newSettings) {
        this.props.onTaskListSettingsChanged(newSettings);
    }

    handleSettingsClick(e) {
        this.props.onSettingsButtonClick();
    }

    getHeaderInputJSX(props) {
        if (props.isHeaderOpen) {
            return (
                <FloatingTextInput onTextSubmit={this.handleHeaderInputSubmit} onCancel={this.handleHeaderInputCancel}
                defaultValue={props.headerText}/>
            )
        }
    }

    handleRemoveButtonClick(e) {
        this.props.onRemoveButtonClick(e);
    }

    handleHeaderInputCancel() {
        this.props.onHeaderSubmit(this.props.headerText);
    }

    handleHeaderInputSubmit(value) {
        this.props.onHeaderSubmit(value);
    }
}

export default ListToolbar;