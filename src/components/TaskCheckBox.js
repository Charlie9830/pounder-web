import React from 'react';
import Hammer from 'hammerjs';

class TaskCheckBox extends React.Component {
    constructor(props) {
        super(props);

        // Class
        this.lastTouchCount = 0;

        // Method Bindings.
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchCancel = this.handleTouchCancel.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
    }

    render() {
        var currentStyle = this.props.isChecked ? "TaskCheckBoxIsChecked" : "TaskCheckBoxIsNotChecked";

        return (
            <div className="TaskCheckBoxContainer" onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}
            onTouchCancel={this.handleTouchCancel} onTouchMove={this.handleTouchMove}>
                <div className={currentStyle} data-disableanimations={this.props.disableAnimations}>
                </div>
            </div>
        )
    }

    handleTouchMove(e) {
        this.lastTouchCount = 0;
    }

    handleTouchCancel(e) {
        this.lastTouchCount = 0;
    }

    handleTouchStart(e) {
        this.lastTouchCount = e.targetTouches.length;
    }

    handleTouchEnd(e) {
        if (this.lastTouchCount === 1) {
            var incomingValue = !this.props.isChecked;
            this.props.onCheckBoxClick(e, incomingValue);
        }

        this.lastTouchCount = 0;
    }
}

export default TaskCheckBox;