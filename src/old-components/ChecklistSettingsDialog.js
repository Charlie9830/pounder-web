import React from 'react';
import { Drawer, TextField, DialogTitle, FormControlLabel, Divider, DialogContent, DialogActions, Button, Switch, Typography, Select, AppBar, Toolbar, IconButton, Grid, List, ListItem } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class ChecklistSettingsDialog extends React.Component {
    constructor(props) {
        super(props);

        // Method Bindings.
        this.handleEnableChecklistModeChange = this.handleEnableChecklistModeChange.bind(this);
        this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

    }

    render() {
        let gridStyle = {
            width: '100vw',
            height: '100vh',
            paddingLeft: '16px'
        }

        console.log(this.props.isChecklist);

        return (
            <Drawer open={this.props.isOpen} variant="temporary" anchor="bottom">

                    <AppBar position="sticky">
                        <Toolbar>
                            <IconButton onClick={this.handleBackArrowClick}>
                                <ArrowBackIcon />
                            </IconButton>

                            <Typography variant="h6"> Checklist Settings </Typography>

                        </Toolbar>
                    </AppBar>

                    <Grid style={gridStyle}>

                    <Typography variant="body1" color="textSecondary">
                        With checklist mode enabled. This list will automatically reset any completed tasks on a user defined schedule.
                    </Typography>

                    <FormControlLabel label="Enable Checklist Mode" control={<Switch checked={this.props.isChecklist} onChange={this.handleEnableChecklistModeChange} />} />

                    <div style={{ height: '32px' }} />

                    <Typography> Reset completed tasks on</Typography>
                    <TextField type="date" onChange={this.handleDateChange} />

                    <div style={{ height: '16px' }} />

                    <Typography> Then every </Typography>
                    <Select native>
                        <option value={1}> Day </option>
                        <option value={7}> Week </option>
                        <option value={14}> Fortnight </option>
                        <option value={30}> Month </option>
                        <option value="custom"> Custom </option>
                    </Select>
                </Grid>
                
            </Drawer>
        )
    }

    handleDateChange(e) {
        console.log(e.target.value);
    }

    handleBackArrowClick() {
        this.props.onBackArrowClick();
    }

    handleEnableChecklistModeChange(e, value) {
        this.props.onChecklistModeChange(value);
    }
}

export default ChecklistSettingsDialog;