import React from 'react';
import '../assets/css/ListToolbar.css';
import TaskListSettingsMenu from './TaskListSettingsMenu';
import Hammer from 'hammerjs';
import SettingsIcon from '../assets/icons/SettingsIcon.svg';

class ListToolbar extends React.Component{
    constructor(props) {
        super(props);

        // Method Bindings.
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
        this.handleSettingsClick = this.handleSettingsClick.bind(this);
        this.handleTaskListSettingsChanged = this.handleTaskListSettingsChanged.bind(this);
        this.handleHeaderPress = this.handleHeaderPress.bind(this);
    }

    componentDidMount() {
        // Initialize Hammerjs.
        var hammer = new Hammer(this.refs.listToolbarHeaderContainer);
        hammer.on('press', this.handleHeaderPress);
    }

    handleHeaderPress(ev) {
        this.props.onHeaderPress();
    }

    render() {
        var listToolbarHeader = this.getListToolbarHeader(this.props);
        var settingsMenu = this.getSettingsMenu(this.props);

        return (
            <div className="ListToolbar">
                <div className="SettingsMenu">
                    <img id="ListToolbarSettingsIcon" src={SettingsIcon} onClick={this.handleSettingsClick}/>
                    {settingsMenu}
                </div>
                <div className="ListToolbarHeader" ref="listToolbarHeaderContainer">
                    {listToolbarHeader}
                </div>
                <label className="DeleteButton" onClick={this.handleRemoveButtonClick}>X</label>
            </div>
        )
    }

    getSettingsMenu(props) {
        if (props.isSettingsMenuOpen) {
            return (
                <TaskListSettingsMenu settings={this.props.settings}
                 onSettingsChanged={this.handleTaskListSettingsChanged}/>
            ) 
        }
    }

    handleTaskListSettingsChanged(newSettings) {
        this.props.onTaskListSettingsChanged(newSettings);
    }

    handleSettingsClick(e) {
        this.props.onSettingsButtonClick();
    }

    getListToolbarHeader(props) {
        if (props.isHeaderOpen) {
            return (
                <input id="headerInput" className="ListToolbarHeaderInput nonDraggable" type='text' defaultValue={props.headerText} onKeyPress={this.handleKeyPress}/>
            )
        }

        else {
            return (
                <label>
                    {this.props.headerText}  
                 </label>
            )
        }
    }

    handleRemoveButtonClick(e) {
        this.props.onRemoveButtonClick(e);
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.props.onHeaderSubmit(document.getElementById('headerInput').value);
        }
    }
}

export default ListToolbar;