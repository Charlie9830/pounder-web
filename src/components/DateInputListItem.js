import React, { Component } from 'react';
import DateInput from './DateInput';
import { ListItem, ListItemIcon } from '@material-ui/core';

import CalendarIcon from '@material-ui/icons/CalendarToday';

class DateInputListItem extends Component {
    constructor(props) {
        super(props);
        
        // State.
        this.state = {
            isInputOpen: false,
        }

        // Method Bindings.
        this.handleDateInputChange = this.handleDateInputChange.bind(this);
    }
    

    render() {
        return (
            <ListItem 
            disabled={this.props.disabled}
            onClick={() => { this.setState({ isInputOpen: true })}}>
                <ListItemIcon>
                    <CalendarIcon />
                </ListItemIcon>
                <DateInput
                    { ...this.props }
                    isOpen={this.state.isInputOpen}
                    value={this.props.value}
                    onChange={this.handleDateInputChange} />
            </ListItem>
        );
    }

    handleDateInputChange(newValue) {
        this.setState({ isInputOpen: false });
        this.props.onChange(newValue);
    }
}

export default DateInputListItem;