import React from 'react';
import '../assets/css/DueDate.css';
import Calendar from './Calendar';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import OverlayMenuContainer from '../containers/OverlayMenuContainer';
import { ParseDueDate } from 'pounder-utilities';

class DueDate extends React.Component {
  constructor(props) {
    super(props);

    // Method Bindings.
    this.handleClick = this.handleClick.bind(this);
    this.handleNewDateSubmit = this.handleNewDateSubmit.bind(this);
    this.handlePriorityToggleClick = this.handlePriorityToggleClick.bind(this);
    this.handleAssignToMember = this.handleAssignToMember.bind(this);
    this.handleCalendarCancel = this.handleCalendarCancel.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }


  render() {
    var {className, text} = ParseDueDate(this.props.isComplete, this.props.dueDate);
    var calendarMenu = this.getCalendarMenu(this.props);

    return (
      <div className={className} onClick={this.handleClick}>
        <label className="DueDateText"> {text} </label>
        <TransitionGroup>
        {calendarMenu}
        </TransitionGroup>
      </div>
    );
  }


  getCalendarMenu(props) {
    if (props.isCalendarOpen) {
      return (
        <CSSTransition classNames="CalendarTransition" key="0" timeout={250}>
          <OverlayMenuContainer>
              <Calendar dueDate={this.props.dueDate} onNewDateSubmit={this.handleNewDateSubmit} projectMembers={this.props.projectMembers}
                isHighPriority={this.props.isHighPriority} onPriorityToggleClick={this.handlePriorityToggleClick}
                onAssignToMember={this.handleAssignToMember} assignedTo={this.props.assignedTo} onBackButtonClick={this.handleBackButtonClick} />
          </OverlayMenuContainer>
        </CSSTransition>
        
      )
    } 
  }

  handleAssignToMember(userId) {
    this.props.onAssignToMember(userId);
  }


  handleClick() {
    if (!this.props.isCalendarOpen) {
      this.props.onClick();
    }
  }

  handleBackButtonClick() {
    this.props.onNewDateSubmit(this.props.dueDate);
  }

  handleCalendarCancel() {
    this.props.onNewDateSubmit(this.props.dueDate);
  }

  handleNewDateSubmit(newDate) {
    this.props.onNewDateSubmit(newDate);
  }
  
  handlePriorityToggleClick(newValue) {
    this.props.onPriorityToggleClick(newValue);
  }
}

export default DueDate;
