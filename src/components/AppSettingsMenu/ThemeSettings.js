import React, { Component } from 'react';
import { List, ListItem, FormControlLabel, Switch, ListSubheader, Button } from '@material-ui/core';
import { GetMuiColorArray, GetColor } from '../../utilities/MuiColors';
import { connect } from 'react-redux';
import {
    createNewMuiThemeAsync, updateMuiThemeAsync, selectMuiTheme, renameMuiThemeAsync,
    removeMuiThemeAsync,
    persistMuiThemeSelection
} from 'handball-libs/libs/pounder-redux/action-creators';

import ThemeEditor from './ThemeEditor';
import ThemeListItem from './ThemeListItem';

class ThemeSettings extends Component {
    constructor(props) {
        super(props);
        
        // Method Bindings.
        this.extractSelectedMuiTheme = this.extractSelectedMuiTheme.bind(this);
        this.getThemesJSX = this.getThemesJSX.bind(this);
        this.randomize = this.randomize.bind(this);
    }
    
    componentWillUnmount() {
        this.props.dispatch(persistMuiThemeSelection());
    }

    render() {
        let muiColors = GetMuiColorArray();
        let muiThemeEntity = this.extractSelectedMuiTheme();

        if (muiThemeEntity === undefined) {
            return null;
        }

        return (
            <React.Fragment>
                <List>
                    {this.getThemesJSX()}
                </List>
                <ThemeEditor
                    muiTheme={muiThemeEntity.theme}
                    onCreate={() => { this.props.dispatch(createNewMuiThemeAsync()) }}
                    isOpen={muiThemeEntity.isInbuilt === false}
                    muiColors={muiColors}
                    onThemeChange={(newTheme) => { this.props.dispatch(updateMuiThemeAsync(this.props.selectedMuiThemeId, newTheme)) }} />
                {/* 
                    <Button variant="contained" onClick={() => {this.randomize()}} > I'm Feeling Lucky </Button>
                */}

            </React.Fragment>
        );
    }

    getThemesJSX() {        
        if (this.props.muiThemes === undefined) {
            return null;
        }

        let muiThemes = [...this.props.muiThemes];
        muiThemes.sort((a, b) => {
            return b.isInbuilt - a.isInbuilt;
        })

        let jsx = muiThemes.map( item => {
            return (
                <ThemeListItem
                key={item.id}
                name={item.name}
                canDelete={ item.isInbuilt === false }
                isSelected={ item.id === this.props.selectedMuiThemeId }
                primaryColor={ GetColor(item.theme.palette.primaryColor.id, item.theme.palette.primaryColor.shadeIndex)}
                secondaryColor={ GetColor(item.theme.palette.secondaryColor.id, item.theme.palette.secondaryColor.shadeIndex) }
                backgroundColor={ GetColor(item.theme.palette.backgroundColor.id, item.theme.palette.backgroundColor.shadeIndex) }
                onClick={() => { this.props.dispatch(selectMuiTheme(item.id))}}
                onPress={() => { this.props.dispatch(renameMuiThemeAsync(item.id))}}
                onDelete={() => { this.props.dispatch(removeMuiThemeAsync(item.id))}}/>
            )
        })

        return jsx;
    }

    randomize() {
        let  getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let newTheme = {...this.extractSelectedMuiTheme()};

        let colors = GetMuiColorArray();
        let colorMax = colors.length - 1;
        let shadeMax = 13;

        newTheme.theme.palette.primaryColor = {
            id: colors[getRandomInt(0, colorMax)].id,
            shadeIndex: getRandomInt(0, shadeMax)
        }

        newTheme.theme.palette.secondaryColor = {
            id: colors[getRandomInt(0, colorMax)].id,
            shadeIndex: getRandomInt(0, shadeMax)
        }

        newTheme.theme.palette.backgroundColor = {
            id: colors[getRandomInt(0, colorMax)].id,
            shadeIndex: getRandomInt(0, shadeMax)
        }

        this.props.dispatch(updateMuiThemeAsync(newTheme.id, newTheme.theme));
    }
    
    extractSelectedMuiTheme() {
        return this.props.muiThemes.find( item => {
            return item.id === this.props.selectedMuiThemeId;
        })
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