import React from 'react';
import { Dialog, RadioGroup, DialogTitle, FormControlLabel, Radio, DialogContent, DialogActions, Button } from '@material-ui/core';

class MoveTaskListDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedValue: -1
        }

        // Method Bindings.
        this.handleMoveButtonClick = this.handleMoveButtonClick.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
        this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    }

    render() {
        let optionsJSX = this.props.projects.map(item => {
            if (item.uid !== this.props.currentProjectId) {
                return (
                    <FormControlLabel key={item.uid} value={item.uid} control={<Radio />} label={item.projectName} />
                )
            }
        })

        return (
            <Dialog open={this.props.isOpen}>
                <DialogTitle> Choose project </DialogTitle>
                <DialogContent>
                    <RadioGroup name="Projects" value={this.state.selectedValue} onChange={this.handleRadioButtonChange}>
                        {optionsJSX}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.handleCancelButtonClick}> Cancel </Button>
                    <Button color="primary" onClick={this.handleMoveButtonClick} disabled={this.state.selectedValue === -1}> Move </Button>
                </DialogActions>
            </Dialog>
        )
    }

    handleRadioButtonChange(e, value) {
        this.setState({ selectedValue: value })
    }

    handleMoveButtonClick() {
        this.props.onMoveButtonClick(this.state.selectedValue);
    }

    handleCancelButtonClick() {
        this.props.onCancelButtonClick();
    }
}

export default MoveTaskListDialog;