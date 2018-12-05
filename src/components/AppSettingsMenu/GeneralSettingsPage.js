import React from 'react';
import MenuSubtitle from '../MenuSubtitle';
import ThemeSettings from './ThemeSettings';
import '../../assets/css/AppSettingsMenu/AppSettingsMenu.css';
import { Grid, Paper, List, ListItem, Typography, Select, InputLabel, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';


class GeneralSettingsPage extends React.Component {
    constructor(props) {
        super(props);
        
        // Refs.
        this.disableAnimationsCheckboxRef = React.createRef();
        
        // Method Bindings.
        this.getFavouriteProjectSelectorJSX = this.getFavouriteProjectSelectorJSX.bind(this);
        this.handleStartInFullscreenChange = this.handleStartInFullscreenChange.bind(this);
        this.handleStartLockedChange = this.handleStartLockedChange.bind(this);
        this.handleFavouriteProjectSelectChange = this.handleFavouriteProjectSelectChange.bind(this);
        this.handleColorPickerClick = this.handleColorPickerClick.bind(this);
        this.handleColorPickerCloseButtonClick = this.handleColorPickerCloseButtonClick.bind(this);
        this.handleDefaultAllColorsButtonClick = this.handleDefaultAllColorsButtonClick.bind(this);
        this.handleDisableAnimationsChange = this.handleDisableAnimationsChange.bind(this);
        this.getSortProjectsBySelectorJSX = this.getSortProjectsBySelectorJSX.bind(this);
        this.handleSortProjectsBySelectorChange = this.handleSortProjectsBySelectorChange.bind(this);
    }

    render() {
        var favoriteProjectSelectorJSX = this.getFavouriteProjectSelectorJSX();
        var sortProjectsBySelectorJSX = this.getSortProjectsBySelectorJSX();

        // Zero Fill any undefined values.
        var disableAnimations = this.props.generalConfig.disableAnimations === undefined ?
            false : this.props.generalConfig.disableAnimations;

        return (
            <Grid container
            direction="column"
            justify="flex-start"
            alignItems="stretch">

                    <List>
                        <ListItem>
                            <ListItemText primary="Favourite Project"
                            secondary="Auto select this project on launch"/>
                            <ListItemSecondaryAction>
                                {favoriteProjectSelectorJSX}
                            </ListItemSecondaryAction>
                            
                        </ListItem>

                        <ListItem>
                            <ListItemText primary="Sort projects by"/>
                            <ListItemSecondaryAction>
                                {sortProjectsBySelectorJSX}
                            </ListItemSecondaryAction>
                        </ListItem>

                        <ListItem>
                            <ListItemText primary="Disable animations" 
                            secondary="Improve performance on low power devices"/>
                            <ListItemSecondaryAction>
                                <Checkbox/>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
            </Grid>
        )
    }

    // <div className="AppSettingsVerticalFlexContainer">
    //             {/* Disable Animations */}
    //             <div className="AppSettingsVerticalFlexItem">
    //                 <input className="AppSettingsHorizontalFlexItem" type="checkbox" ref={this.disableAnimationsCheckboxRef}
    //                     onChange={this.handleDisableAnimationsChange} checked={disableAnimations} />
    //                 <span className="AppSettingsHorizontalFlexItem">
    //                     <div className="AppSettingsItemLabel"> Disable animations </div>
    //                 </span>
    //             </div>
    //             {/* Faviourte Project Selection */}
    //             <div className="AppSettingsVerticalFlexItem">
    //                 <span className="AppSettingsHorizontalFlexItem">
    //                     <div className="AppSettingsItemLabel"> Favourite project </div>
    //                 </span>
    //                 <span className="AppSettingsHorizontalFlexItem">
    //                     {favoriteProjectSelectorJSX}
    //                 </span>
    //             </div>

    //             {/* Sort projects by */}
    //             <div className="AppSettingsVerticalFlexItem">
    //                 <span className="AppSettingsHorizontalFlexItem">
    //                     <div className="AppSettingsItemLabel"> Sort Projects by </div>
    //                 </span>
    //                 <span className="AppSettingsHorizontalFlexItem">
    //                     {sortProjectsBySelectorJSX}
    //                 </span>
    //             </div>


    //             {/* Color Selection Title */}
    //             <div className="AppSettingsVerticalFlexItem">
    //                 <MenuSubtitle text="Application Color Selection" />
    //             </div>

    //             {/* Color Selection Properties and Inputs */}
    //             <div className="AppSettingsVerticalFlexItem">
    //                 <ThemeSettings cssConfig={this.props.cssConfig}
    //                     onCSSPropertyChange={(propertyName, value) => { this.props.onCSSPropertyChange(propertyName, value) }}
    //                     onColorPickerClick={this.handleColorPickerClick} openColorPickerIndex={this.props.openColorPickerIndex}
    //                     onColorPickerCloseButtonClick={this.handleColorPickerCloseButtonClick}
    //                     onDefaultAllColorsButtonClick={this.handleDefaultAllColorsButtonClick}
    //                 />
    //             </div>
    //         </div>

    handleSortProjectsBySelectorChange(e) {
        var value = e.target.value;

        this.props.onSortProjectsBySelectorChange(value);
    }

    handleDefaultAllColorsButtonClick() {
        this.props.onDefaultAllColorsButtonClick();
    }

    handleColorPickerCloseButtonClick() {
        this.props.onColorPickerCloseButtonClick();
    }

    handleColorPickerClick(index) {
        this.props.onColorPickerClick(index);
    }

    handleDisableAnimationsChange() {
        var value = this.disableAnimationsCheckboxRef.current.checked;
        this.props.onDisableAnimationsChange(value);
    }

    handleStartLockedChange() {
        var value = this.refs.startLockedCheckbox.checked;
        this.props.onStartLockedChange(value);
    }

    handleStartInFullscreenChange(e) {
        var value = this.refs.startInFullscreenCheckbox.checked;
        this.props.onStartInFullscreenChange(value);
    }

    getFavouriteProjectSelectorJSX() {
        // Build Projects into HTML Option Elements.
        var optionsJSX = this.props.projects.map((project, index) => {
            return (
                <option key={index + 1} value={project.uid}> {project.projectName} </option>
            )
        })

        // Append a "None" option.
        optionsJSX.unshift((<option key={0} value="-1"> None </option>))

        let favouriteProjectId = this.props.accountConfig.favouriteProjectId === undefined ?
         "-1" : this.props.accountConfig.favouriteProjectId;

        // Build options into HTML select Element.
        return (
            <Select value={favouriteProjectId}
            onChange={this.handleFavouriteProjectSelectChange}>
                {optionsJSX}
            </Select>
        )
    }

    getSortProjectsBySelectorJSX() {
        var sortProjectsBy = this.props.generalConfig.sortProjectsBy === undefined ? 'alphabetically' : this.props.generalConfig.sortProjectsBy;

        return (
            <Select value={sortProjectsBy}
            onChange={this.handleSortProjectsBySelectorChange}>
                <option key={0} value='alphabetically'> Alphabetically </option>
                <option key={1} value='created'> Date created </option>
                <option key={2} value='updated'> Updated </option>
            </Select>
        )
    }
    
    handleFavouriteProjectSelectChange(e) {
        let id = e.target.value;
        this.props.onFavouriteProjectSelectChange(id);
    }
}

export default GeneralSettingsPage;