import React, { Component } from 'react';
import { Typography, TextField, Grow, ClickAwayListener } from '@material-ui/core';

let textFieldStyle = {
    width: '100%',
    height: '200px',
}

class ExpandingTextInput extends Component {
    constructor(props) {
        super(props);
        
        // Refs.
        this.inputRef = React.createRef();

        // State.
        this.state = {
            isOpen: false,
        }

        // Method Bindings.
        this.handleInputBlur = this.handleInputBlur.bind(this);
    }

    render() {
        // Controlled or Uncontrolled Mode.
        let isExpanded = this.props.isOpen=== undefined ? this.state.isOpen : this.props.isOpen

        let hasValue = this.props.value !== undefined && this.props.value.trim() !== "";
        let closedValue = hasValue ?  this.props.value : this.props.placeholder || "";
        let typographyColor = hasValue ? "textPrimary" : "textSecondary";
        
        return (
            <React.Fragment>
                <Grow
                    in={!isExpanded}
                    unmountOnExit={true}
                    mountOnEnter={true}
                    timeout={{ enter: 250, exit: 0 }}>
                    <Typography
                        style={{width: '100%', minHeight: '1em'}}
                        color={typographyColor}
                        hidden={isExpanded}
                        onClick={() => { this.setState({ isOpen: true }) }}> {closedValue} </Typography>
                </Grow>

                <Grow
                    in={isExpanded}
                    unmountOnExit={true}
                    mountOnEnter={true}>
                        <TextField
                            inputRef={this.inputRef}
                            autoFocus
                            style={textFieldStyle}
                            multiline
                            defaultValue={this.props.value}
                            onBlur={this.handleInputBlur} />
                </Grow>
            </React.Fragment>
        );
    }

    handleInputBlur() {
        this.props.onChange(this.inputRef.current.value);

        if (this.props.isExpanded === undefined) {
            // Uncontrolled Mode.
            this.setState({ isOpen: false });
        }
        
    }
}

export default ExpandingTextInput;