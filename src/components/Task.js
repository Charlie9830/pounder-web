import React from 'react';
import TaskText from './TaskText';
import DueDate from './DueDate';
import TaskCheckBox from './TaskCheckBox';
import TaskMetadata from './TaskMetadata';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Hammer from 'hammerjs';
import '../assets/css/Task.css';
import '../assets/css/TaskCheckBox.css'


class Task extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showOptions: false,
        }

        // Refs.
        this.taskContainerRef = React.createRef();

        // Method Bindings.
        this.forwardOnTaskClick = this.forwardOnTaskClick.bind(this);
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
        this.handleTaskTouchStart = this.handleTaskTouchStart.bind(this);
        this.handleDueDateClick = this.handleDueDateClick.bind(this);
        this.handleNewDateSubmit = this.handleNewDateSubmit.bind(this);
        this.handlePriorityToggleClick = this.handlePriorityToggleClick.bind(this);
        this.getTaskOrMetadata = this.getTaskOrMetadata.bind(this);
        this.handleTaskMetadataCloseButtonClick = this.handleTaskMetadataCloseButtonClick.bind(this);
        this.handleAssignToMember = this.handleAssignToMember.bind(this);
        this.getTaskAssigneeJSX = this.getTaskAssigneeJSX.bind(this);
        this.getAssigneeDisplayName = this.getAssigneeDisplayName.bind(this);
        this.handleTaskAssigneeClick = this.handleTaskAssigneeClick.bind(this);
        this.handleTaskOptionsDeleteButtonClick = this.handleTaskOptionsDeleteButtonClick.bind(this);
        this.handleTaskOptionsCancelButtonClick = this.handleTaskOptionsCancelButtonClick.bind(this);
        this.handleTaskOptionsMoveButtonClick = this.handleTaskOptionsMoveButtonClick.bind(this);
        this.handleTaskTouchEnd = this.handleTaskTouchEnd.bind(this);
    }

    componentDidMount() {
        var hammer = new Hammer(this.taskContainerRef.current, { domEvents: true });

        // Press
        hammer.on('press', event => {
                if (this.props.isMetadataOpen === false) {
                    // Open Metadata.
                    this.props.onMetadataOpen(this.props.taskId);
                }

                else {
                    // Close Metadata.
                    this.props.onTaskMetadataCloseButtonClick();
                }
        })

        // Swipe
        hammer.on('swipe', event => {
            if (event.deltaX > 0 && event.deltaTime > 100) {
                // Swipe Right
                this.props.onTaskOptionsOpen(this.props.taskId);
            }
        })
        
    }

    componentWillUnmount() {
        Hammer.off(this.taskContainerRef.current, 'press');
        Hammer.off(this.taskContainerRef.current, 'swipe')
    }

    render() {
        var taskOrMetadata = this.getTaskOrMetadata();

        return (
            <div ref={this.taskContainerRef} className="TaskContainer" data-isselected={this.props.isSelected} data-ismoving={this.props.isMoving}
                data-ismetadataopen={this.props.isMetadataOpen}>
                <div className="TaskTransitionArea">

                    <TransitionGroup enter={!this.props.disableAnimations} exit={!this.props.disableAnimations}>
                        {taskOrMetadata}
                    </TransitionGroup>
                
                </div>
                {this.getBottomBorderJSX(this.props)}
            </div>
        )
    }

    getTaskAssigneeJSX() {
        if (this.props.assignedTo !== -1) {
            var displayName = this.getAssigneeDisplayName(this.props.assignedTo);

            return (
                <div className="TaskAssigneeContainer" data-ishighpriority={this.props.isHighPriority}
                    onClick={this.forwardOnTaskClick} onTouchStart={this.handleTaskTouchStart}>
                    <div className="TaskAssignee" onClick={this.handleTaskAssigneeClick}>
                        <div className="TaskAssigneeDisplayName"> {displayName} </div>
                    </div>
                </div>
            )
        }
    }

    getAssigneeDisplayName(userId) {
        var member = this.props.projectMembers.find(item => {
            return item.userId === userId;
        })

        if (member !== undefined) {
            return member.displayName;
        }
    }

    getTaskOrMetadata() {
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

        else if (this.props.isMetadataOpen !== true) {
            var taskAssigneeJSX = this.getTaskAssigneeJSX();

            return (
                <CSSTransition classNames="TaskTransitionItem" timeout={250} mountOnEnter={true} unmountOnExit={true}
                 key="task">
                <div>
                    <div className="Task" data-ishighpriority={this.props.isHighPriority} data-iscomplete={this.props.isComplete}>
                        <div className={"TaskCheckBox"} >
                            <TaskCheckBox isChecked={this.props.isComplete} onCheckBoxClick={this.handleCheckBoxClick}
                            disableAnimations={this.props.disableAnimations} />
                        </div>
                        <div className="TaskClickContainer" onClick={this.forwardOnTaskClick} onTouchStart={this.handleTaskTouchStart}
                        onTouchEnd={this.handleTaskTouchEnd}>
                            <div className="TaskTextContainer">
                                <TaskText text={this.props.text} isComplete={this.props.isComplete}/>
                            </div>
                        </div>
                        <div className="DueDateContainer">
                            <DueDate dueDate={this.props.dueDate} onClick={this.handleDueDateClick} isComplete={this.props.isComplete}
                                isCalendarOpen={this.props.isCalendarOpen} onNewDateSubmit={this.handleNewDateSubmit}
                                projectMembers={this.props.projectMembers} onAssignToMember={this.handleAssignToMember}
                                onPriorityToggleClick={this.handlePriorityToggleClick} isHighPriority={this.props.isHighPriority}
                                assignedTo={this.props.assignedTo} disableAnimations={this.props.disableAnimations} />
                        </div>
                    </div>
                    {taskAssigneeJSX}
                </div>
                </CSSTransition>
            )
        }

        else {
            return (
                <CSSTransition classNames="MetadataTransitionItem" timeout={250} mountOnEnter={true} unmountOnExit={true}
                 key="metadata">
                    <div>
                        <TaskMetadata metadata={this.props.metadata} onCloseButtonClick={this.handleTaskMetadataCloseButtonClick}/>
                    </div>
                </CSSTransition>
            )
        }
    }

    handleTaskTouchEnd(touchEvent) {
        if (touchEvent.touches.length === 1) {
            this.forwardOnTaskClick(touchEvent);
        }
    }

    handleTaskOptionsMoveButtonClick() {
        this.props.onTaskTwoFingerTouch(this.props.taskId);
    }

    handleTaskOptionsCancelButtonClick() {
        this.props.onTaskOptionsClose();
    }

    handleTaskOptionsDeleteButtonClick() {
        this.props.onTaskOptionsDeleteButtonClick(this.props.taskId);
    }

    handleTaskAssigneeClick(e) {
        e.stopPropagation();
        this.handleDueDateClick();
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


    handleDueDateClick() {
        this.props.onDueDateClick(this.props.taskId);
    } 

    handleTaskTouchStart(touchEvent) {
        if (touchEvent.touches.length === 2) {
            this.props.onTaskTwoFingerTouch(this.props.taskId);
        }
    }

    forwardOnTaskClick(e) {
        this.props.handleClick(this);
    }

    handleCheckBoxClick(e, incomingValue) {
        this.props.onTaskCheckBoxClick(e, this.props.taskId, incomingValue, this.props.isComplete, this.props.metadata);
    }


    handleNewDateSubmit(newDate) {
        this.props.onNewDateSubmit(this.props.taskId, newDate, this.props.dueDate, this.props.metadata);
    }
}

export default Task;