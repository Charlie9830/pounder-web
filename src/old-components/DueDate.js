import React from 'react';
import '../assets/css/DueDate.css';
import Calendar from './Calendar';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import OverlayMenuContainer from '../containers/OverlayMenuContainer';
import { ParseDueDate } from 'handball-libs/libs/pounder-utilities';
import CenteringContainer from '../containers/CenteringContainer';

class DueDate extends React.Component {
  constructor(props) {
    super(props);

    // Method Bindings.
  }


  render() {
    var {className, text} = ParseDueDate(this.props.isComplete, this.props.dueDate);

    return (
      <div className={className}>
        <CenteringContainer>
          <div className="DueDateText"> {text} </div>
        </CenteringContainer>
      </div>
    );
  }
}

export default DueDate;
