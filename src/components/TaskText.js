import React from 'react';
import FloatingTextInput from "../components/FloatingTextInput";
import '../assets/css/TaskText.css';

class TaskText extends React.Component {
    constructor(props){
        super(props);

        // Method Bindings.
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
        this.handleInputCancel = this.handleInputCancel.bind(this);
        this.getTaskTextInputJSX = this.getTaskTextInputJSX.bind(this);
    }


    render() {
        var currentClassName = this.props.isComplete ? "TaskText Fade" : "TaskText";
        var taskTextInputJSX = this.getTaskTextInputJSX();

        return (
            <div className={currentClassName} data-ishighpriority={this.props.isHighPriority}>
                {taskTextInputJSX}
                <label>{this.props.text}</label>
            </div>
        )
    }

    getTaskTextInputJSX() {
        if (this.props.isInputOpen) {
            return (
                <div className='TaskText'>
                    <FloatingTextInput defaultValue={this.props.text} onCancel={this.handleInputCancel}
                    onTextSubmit={this.handleInputSubmit}/>  
                </div>
            )
        }
    }

    handleInputSubmit(value) {
        this.props.onTaskTextSubmit(value);
    }

    handleInputCancel() {
        
    }
}

export default TaskText;