import React from 'react';
import TaskText from './TaskText';
import DueDate from './DueDate';
import TaskCheckBox from './TaskCheckBox';
import Hammer from 'hammerjs';
import '../assets/css/Task.css';
import '../assets/css/TaskCheckBox.css'
import NewCommentsIcon from '../assets/icons/NewCommentsIcon.svg';
import HasNotesIcon from '../assets/icons/HasNotesIcon.svg';


class Task extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showOptions: false,
        }

        // Refs.
        this.taskContainerRef = React.createRef();
        this.taskClickContainerRef = React.createRef();
        this.dueDateContainerRef = React.createRef();
        this.taskCheckboxContainerRef = React.createRef();
        this.taskAssigneeRef = React.createRef();
        this.taskAssigneeContainerRef = React.createRef()
        this.taskIndicatorPanelRef = React.createRef();

        // Method Bindings.
        this.forwardOnTaskClick = this.forwardOnTaskClick.bind(this);
        this.getTaskAssigneeJSX = this.getTaskAssigneeJSX.bind(this);
        this.handleTaskAssigneeClick = this.handleTaskAssigneeClick.bind(this);
        this.getTaskIndicatorPanelJSX = this.getTaskIndicatorPanelJSX.bind(this);
        this.getUnreadCommentsIndicatorJSX = this.getUnreadCommentsIndicatorJSX.bind(this);
        this.handleTaskNoteIndicatorClick = this.handleTaskNoteIndicatorClick.bind(this);
        
        this.handleTaskOptionsDeleteButtonClick = this.handleTaskOptionsDeleteButtonClick.bind(this);
        this.handleTaskOptionsCancelButtonClick = this.handleTaskOptionsCancelButtonClick.bind(this);
        this.handleTaskOptionsMoveButtonClick = this.handleTaskOptionsMoveButtonClick.bind(this);
        this.handleTap = this.handleTap.bind(this);
    }

    componentDidMount() {
        let taskContainerHammer = new Hammer(this.taskContainerRef.current, { domEvents: true });
        let taskCheckboxHammer = new Hammer(this.taskCheckboxContainerRef.current, { domEvents: true });
        let taskTextContainerHammer = new Hammer(this.taskClickContainerRef.current, { domEvents: true });
        let dueDateContainerHammer = new Hammer(this.dueDateContainerRef.current, { domEvents: true });
        let taskIndicatorPanelHammer = new Hammer(this.taskIndicatorPanelRef.current, { domEvents: true });


        // Swipe
        taskContainerHammer.on('swipe', event => {
            if (event.deltaX > 0 && event.deltaTime > 100) {
                // Swipe Right
                this.props.onTaskTwoFingerTouch(this.props.taskId);
            }

            if (event.deltaX < 0 && event.deltaTime > 100) {
                // Swipe Left.
                
                this.props.onTaskOptionsOpen(this.props.taskId);
            }
        })
        
        // Checkbox Tap
        taskCheckboxHammer.on('tap', event => {
            this.props.onTaskCheckBoxClick(this.props.taskId, !this.props.isComplete, this.props.isComplete, this.props.metadata);
        })

        // Click Container Tap or Double Tap
        taskTextContainerHammer.on('tap', event => {
            this.handleTap(event.tapCount);
        })

        // Due Date Circle Tap.
        dueDateContainerHammer.on('tap', event => {
            this.props.onTaskInspectorOpen(this.props.taskId);
        })

        // Indicator Panel Tap
        taskIndicatorPanelHammer.on('tap', event => {
            this.handleTap(event.tapCount);
        })

        taskContainerHammer.get('tap').set({interval: 500})
    }


    componentWillUnmount() {
        Hammer.off(this.taskContainerRef.current, 'press');
        Hammer.off(this.taskContainerRef.current, 'swipe');
        Hammer.off(this.taskContainerRef.current, 'tap');

        Hammer.off(this.taskCheckboxContainerRef.current, 'tap');
        Hammer.off(this.dueDateContainerRef.current, 'tap');
        Hammer.off(this.taskIndicatorPanelRef.current, 'tap');
        Hammer.off(this.taskClickContainerRef.current, 'tap');
    }


    render() {
        var taskIndicatorPanelJSX = this.getTaskIndicatorPanelJSX();

        return (
            <div ref={this.taskContainerRef} className="TaskContainer" data-ismoving={this.props.isMoving}
                data-ismetadataopen={this.props.isMetadataOpen}>

                <div className="Task" data-ishighpriority={this.props.isHighPriority} data-iscomplete={this.props.isComplete}>

                    <div className="TaskCheckboxContainer" ref={this.taskCheckboxContainerRef}>
                        <TaskCheckBox isChecked={this.props.isComplete}
                            disableAnimations={this.props.disableAnimations} />
                    </div>

                    <div className="TaskTextContainer" ref={this.taskClickContainerRef}>
                        <TaskText text={this.props.text} isComplete={this.props.isComplete} />
                    </div>

                    <div className="DueDateContainer" ref={this.dueDateContainerRef}>
                        <DueDate dueDate={this.props.dueDate} isComplete={this.props.isComplete}
                            isCalendarOpen={this.props.isCalendarOpen} onNewDateSubmit={this.handleNewDateSubmit}
                            projectMembers={this.props.projectMembers} onAssignToMember={this.handleAssignToMember}
                            onPriorityToggleClick={this.handlePriorityToggleClick} isHighPriority={this.props.isHighPriority}
                            assignedTo={this.props.assignedTo} disableAnimations={this.props.disableAnimations} />
                    </div>
                </div>
                {taskIndicatorPanelJSX}
            </div>
        )
    }

    
    handleTap(tapCount) {
        if (tapCount === 1) {
            this.props.handleClick(this);
        }

        if (tapCount >= 2) {
            this.props.onOpenTextInput(this);
        }
    }
    

    getTaskIndicatorPanelJSX() {
        var taskAssigneeJSX = this.getTaskAssigneeJSX();
        var unreadCommentsIndicatorJSX = this.getUnreadCommentsIndicatorJSX();
        var noteIndicatorJSX = this.getNoteIndicatorJSX();

        return (
            <div className="TaskIndicatorPanelContainer" ref={this.taskIndicatorPanelRef} 
                data-ishighpriority={this.props.isHighPriority}>
                {taskAssigneeJSX}
                {unreadCommentsIndicatorJSX}
                {noteIndicatorJSX}
            </div>
        )
    }

    getTaskAssigneeJSX() {
        if (this.props.assignedToDisplayName !== "") {
            return (
                <div className="TaskAssignee" onClick={this.handleTaskAssigneeClick}>
                    <div className="TaskAssigneeDisplayName"> {this.props.assignedToDisplayName} </div>
                </div>
            )
        }
    }

    getUnreadCommentsIndicatorJSX() {
        if (this.props.hasUnseenComments === true) {
            return (
                <img className="UnreadTaskCommentsIndicator" src={NewCommentsIcon} onClick={this.handleUnreadCommentsIndicatorClick}/>
            )
        }
    }

    getNoteIndicatorJSX() {
        if (this.props.note !== undefined && this.props.note.length > 0) {
            return (
                <img className="TaskNoteIndicator" src={HasNotesIcon} onClick={this.handleTaskNoteIndicatorClick}/>
            )
        }
    }

    handleTaskNoteIndicatorClick(e) {
        this.props.onTaskInspectorOpen(this.props.taskId);
    }

    handleUnreadCommentsIndicatorClick(e) {
        this.props.onTaskInspectorOpen(this.props.taskId);
    }

    handleTaskAssigneeClick(e) {
        this.props.onTaskInspectorOpen(this.props.taskId);
    }

    handleTaskOptionsMoveButtonClick() {
        this.props.onTaskTwoFingerTouch(this.props.taskId);
    }

    handleTaskOptionsCancelButtonClick() {
        this.props.onTaskOptionsCancel();
    }

    handleTaskOptionsDeleteButtonClick() {
        this.props.onTaskOptionsDeleteButtonClick(this.props.taskId);
    }

    handleAssignToMember(userId) {
        this.props.onAssignToMember(userId, this.props.assignedTo, this.props.taskId);
    }

    handleTaskMetadataCloseButtonClick() {
        this.props.onTaskMetadataCloseButtonClick();
    }

    handlePriorityToggleClick(newValue) {
        this.props.onPriorityToggleClick(this.props.taskId, newValue, this.props.isHighPriority, this.props.metadata);
    }


    forwardOnTaskClick(e) {
        this.props.handleClick(this);
    }


    handleNewDateSubmit(newDate) {
        this.props.onNewDateSubmit(this.props.taskId, newDate, this.props.dueDate, this.props.metadata);
    }
}


export default Task;

