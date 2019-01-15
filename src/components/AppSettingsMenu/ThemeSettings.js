import React, { Component } from 'react';
import MuiColorSelector from './MuiColorSelector';
import { List, ListItem, FormControlLabel, Switch, ListSubheader } from '@material-ui/core';
import { GetMuiColorArray } from '../../utilities/MuiColors';
import { connect } from 'react-redux';

class ThemeSettings extends Component {
    render() {
        let muiColors = GetMuiColorArray();

        return (
            <List>
                <ListItem>
                    <FormControlLabel
                    label='Go dark'
                    control={<Switch/>}/>
                </ListItem>

                <ListSubheader> Primary Colour </ListSubheader>
                <ListItem style={{ maxWidth: '100%' }}>
                    <MuiColorSelector
                    muiColors={muiColors}
                    />
                </ListItem>

                <ListSubheader> Secondary Colour </ListSubheader> 
                <ListItem style={{ maxWidth: '100%' }}>
                    <MuiColorSelector
                    muiColors={muiColors}
                    />
                </ListItem>
            </List>
        );
    }
}

let mapStateToProps = state => {
    return {
        muiThemes: state.muiThemes,
        selectedMuiThemeId: state.selectedMuiThemeId,
    }
}

let VisibleThemeSettings = connect(mapStateToProps)(ThemeSettings);
export default VisibleThemeSettings;