import React, { Component } from 'react';
import { Modal, TextField, DialogActions, Button, withTheme, Collapse, Typography } from '@material-ui/core';

class TextInputDialog extends Component {
    constructor(props) {
        super(props);

        // Refs.
        this.textInputRef = React.createRef();
    }    
    
    render() {
        let { theme } = this.props;

        const gridStyle = {
            display: 'grid',
            gridTemplateRows: '[Title]auto [Input]1fr [Actions]auto',
            width: '100vw',
            height: 'fit-content',
            background: theme.palette.background.paper,
            padding: '8px'
        }

        const titleContainer = {
            gridRow: 'Title',
            placeSelf: 'center flex-start',
        }

        const inputContainer = {
            gridRow: 'Input',
            placeSelf: 'center stretch',
            width: '100%',
        }

        const actionsContainer = {
            gridRow: 'Actions',
            placeSelf: 'center stretch',
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }

        let textFieldStyle = {
            width: '100%',
        }

        return (
            <React.Fragment>
                <Modal open={this.props.isOpen}>
                    <Collapse in={this.props.isOpen} collapsedHeight="0px" >
                        <div style={gridStyle}>
                            <div style={titleContainer}>
                                <Typography style={{marginBottom: '16px'}} color="textSecondary"> {this.props.title} </Typography>
                            </div>
                            <div style={inputContainer}>
                                <TextField
                                    inputRef={this.textInputRef}
                                    autoFocus
                                    style={textFieldStyle}
                                    multiline
                                    label={this.props.label}
                                    defaultValue={this.props.text}
                                    />
                            </div>

                            <div style={actionsContainer}>
                                <DialogActions>
                                    <Button variant="text" color="default" 
                                    onClick={() => { this.props.onCancel()}}> Cancel </Button>
                                    <Button variant="text" color="primary"
                                    onClick={() => { this.props.onOkay(this.textInputRef.current.value)}}> Okay </Button>
                                </DialogActions>
                            </div>
                        </div>
                    </Collapse>

                </Modal>
            </React.Fragment>
        );
    }
}

export default withTheme()(TextInputDialog);