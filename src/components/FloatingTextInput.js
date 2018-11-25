import React from 'react';
import '../assets/css/FloatingTextInput.css'
import TextareaAutosize from 'react-autosize-textarea';
import OverlayMenuContainer from '../containers/OverlayMenuContainer';
import MenuHeader from './MenuHeader';
import { Paper, Grid, TextField, Button } from '@material-ui/core';

class FloatingTextInput extends React.Component {
    constructor(props) {
        super(props);

        // Refs.
        this.textInputRef = React.createRef();

        // Method Bindings
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        let paperStyle = {
            padding: '15px',
        }
        
        return (
            <Paper style={paperStyle}>
                <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="center">
                    <TextField multiline fullWidth inputRef={this.textInputRef} label={this.props.niceTargetName} autoFocus={true}
                    onKeyPress={this.handleKeyPress} />
                </Grid>

                <Grid container
                    direction="row"
                    justify="flex-end"
                    alignItems="center">

                    <Button variant="text" color="secondary" onClick={this.handleCancelButtonClick}>
                        Cancel
                    </Button>

                    <Button variant="text" color="secondary" onClick={this.handleOkButtonClick}>
                        Ok
                    </Button>
                </Grid>
            </Paper>
        )
    }

    handleCancelButtonClick() {
        this.props.onCancel();
    }

    handleOkButtonClick() {
        this.props.onTextSubmit(this.textInputRef.current.value, this.props.defaultValue);
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.props.onTextSubmit(this.textInputRef.current.value);
        }
    }


}

export default FloatingTextInput;