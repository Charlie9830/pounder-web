import React from 'react';
import CenteringContainer from '../containers/CenteringContainer';

class TaskCheckBox extends React.Component {
    render() {
        var currentStyle = this.props.isChecked ? "TaskCheckBoxIsChecked" : "TaskCheckBoxIsNotChecked";

        return (
            <div className="TaskCheckBoxTouchContainer">
                <CenteringContainer>
                    <div className={currentStyle} data-disableanimations={this.props.disableAnimations}>
                    </div>
                </CenteringContainer>
            </div>
        )
    }
}

export default TaskCheckBox;