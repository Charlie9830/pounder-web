import React from 'react';
import TaskText from './TaskText';
import DueDate from './DueDate';
import TaskCheckBox from './TaskCheckBox';
import TaskMetadata from './TaskMetadata';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Hammer from 'hammerjs';
import Ink from 'react-ink';
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
        this.inkCanvasRef = React.createRef();
        this.taskContainerRef = React.createRef();
        this.taskClickContainerRef = React.createRef();
        this.dueDateContainerRef = React.createRef();
        this.taskCheckboxContainerRef = React.createRef();
        this.taskAssigneeRef = React.createRef();
        this.taskAssigneeContainerRef = React.createRef()

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
        this.determineTapTarget = this.determineTapTarget.bind(this);
        this.getTaskOrOptions = this.getTaskOrOptions.bind(this);
    }

    componentDidMount() {
        var hammer = new Hammer(this.taskContainerRef.current, { domEvents: true });

        // Swipe
        hammer.on('swipe', event => {
            if (event.deltaX > 0 && event.deltaTime > 100) {
                // Swipe Right
                this.props.onTaskTwoFingerTouch(this.props.taskId);
            }

            if (event.deltaX < 0 && event.deltaTime > 100) {
                // Swipe Left.
                
                this.props.onTaskOptionsOpen(this.props.taskId);
            }
        })
        
        hammer.on('tap', event => {
            switch (this.determineTapTarget(event.target)) {
                case 'click-container':
                    if (event.tapCount === 1) {
                        this.props.handleClick(this);
                    }

                    if (event.tapCount >= 2) {
                        this.props.onOpenTextInput(this);
                    }
                    break;

                case 'due-date-container':
                    this.props.onTaskInspectorOpen(this.props.taskId);

                    break;

                case 'checkbox-container':
                    this.props.onTaskCheckBoxClick(this.props.taskId, !this.props.isComplete, this.props.isComplete, this.props.metadata);
                    break;

                case 'assignee':
                    this.props.onDueDateClick(this.props.taskId);
                    break;

                case 'task-assignee-container':
                    this.props.handleClick(this);
                    break;

                default:
                    break;

            }
        })

        hammer.get('tap').set({interval: 500})
    }

    componentWillUnmount() {
        Hammer.off(this.taskContainerRef.current, 'press');
        Hammer.off(this.taskContainerRef.current, 'swipe');
        Hammer.off(this.taskContainerRef.current, 'tap');
    }


    render() {
        var taskOrOptions = this.getTaskOrOptions();

        return (
            <div ref={this.taskContainerRef} className="TaskContainer" data-isselected={this.props.isSelected} data-ismoving={this.props.isMoving}
                data-ismetadataopen={this.props.isMetadataOpen}>
                <div className="TaskTransitionArea">
                    <TransitionGroup enter={!this.props.disableAnimations} exit={!this.props.disableAnimations}>
                        {taskOrOptions}
                    </TransitionGroup>
                
                </div>
                {this.getBottomBorderJSX(this.props)}
            </div>
        )
    }

    

    getTaskIndicatorPanelJSX() {
        var taskAssigneeJSX = this.getTaskAssigneeJSX();
        var unreadCommentsIndicatorJSX = this.getUnreadCommentsIndicatorJSX();
        var noteIndicatorJSX = this.getNoteIndicatorJSX();

        return (
            <div className="TaskIndicatorPanelContainer" data-ishighpriority={this.props.isHighPriority}
                onClick={this.forwardOnTaskClick} onTouchStart={this.handleTaskTouchStart}>
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


    getTaskOrOptions() {
        if (this.props.isOptionsOpen) {
            return (
                <CSSTransition classNames="OptionsTransitionItem" timeout={150} mountOnEnter={true} unmountOnExit={true}
                key="options">
                    <div>
                        <div className="TaskOptionsOverlay" onClick={() => {this.setState({showOptions: false})}}>
                            <div className="TaskOptionsDeleteButton" onClick={this.handleTaskOptionsDeleteButtonClick}>
                                <div className="TaskOptionsDeleteButtonText"> Delete </div>
                            </div>

                            <div className="TaskOptionsCancelButton" onClick={this.handleTaskOptionsCancelButtonClick}>
                                <div className="TaskOptionsCancelButtonText"> Cancel </div>
                            </div>

                            <div className="TaskOptionsMoveButton" onClick={this.handleTaskOptionsMoveButtonClick}>
                                <div className="TaskOptionsMoveButtonText"> Move </div>
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            )
            
        }

        else {
            var taskIndicatorPanelJSX = this.getTaskIndicatorPanelJSX();

            return (
                <CSSTransition classNames="TaskTransitionItem" timeout={250} mountOnEnter={true} unmountOnExit={true}
                    key="task">
                    <div>
                        <div className="Task" data-ishighpriority={this.props.isHighPriority} data-iscomplete={this.props.isComplete}>
                            <Ink style={{color: '#555'}} ref={this.inkCanvasRef}/>    

                            <div className="TaskCheckboxContainer" ref={this.taskCheckboxContainerRef}>
                                <TaskCheckBox isChecked={this.props.isComplete}
                                    disableAnimations={this.props.disableAnimations} />
                            </div>
                            
                            <div className="TaskTextContainer">
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
                </CSSTransition>
            )
        }
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

    getBottomBorderJSX(props) {
        if (props.renderBottomBorder) {
            return (
                <div className="TaskBottomBorder"/>
            )
        }
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

    isChild (obj, parentObj, upperBoundingObj) {

        // Recursievly search up the DOM Tree from obj looking to find parentObj. Stop searching when upperBoundingObj or document body
        // is hit.
        while (obj !== undefined && obj !== null && obj !== upperBoundingObj && obj.tagName.toUpperCase() !== 'BODY'){
            if (obj === parentObj){
                return true;
            }
            obj = obj.parentNode;
        }
        return false;
    }

    determineTapTarget(eventTarget) {
        if (eventTarget.tagName.toUpperCase() === "CANVAS") {
            /* For some reason, You can't get react-ink to work properly when you try and differentiate out the tasktext clicks.
            Either Ink consumes the touch events. Or it doesn't trigger the animation at all. It always works for Due date and the
            checkbox, but almost always fails with Task text. 
            */
            return 'click-container'
        }

        // Check for nested assignee BEFORE checking for task-assignee-container.
        if (this.isChild(eventTarget, this.taskAssigneeRef.current, this.taskContainerRef.current)) {
            return 'assignee'
        }

        // Check for task-assignee-container AFTER checking for assignee.
        if (this.isChild(eventTarget, this.taskAssigneeContainerRef.current, this.taskContainerRef.current)) {
            return 'task-assignee-container';
        }

        if (this.isChild(eventTarget, this.dueDateContainerRef.current, this.taskContainerRef.current)) {
            return 'due-date-container';
        }

        if (this.isChild(eventTarget, this.taskCheckboxContainerRef.current, this.taskContainerRef.current)) {
            return 'checkbox-container';
        }

        else {
            // Probably a touch on metadata or options or something else.
            return 'something-else';
        }
    }
}


export default Task;

