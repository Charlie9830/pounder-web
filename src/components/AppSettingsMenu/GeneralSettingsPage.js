import React from 'react';
import MenuSubtitle from '../MenuSubtitle';
import ThemeSettings from './ThemeSettings';
import '../../assets/css/AppSettingsMenu/AppSettingsMenu.css';


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
    }

    render() {
        var favoriteProjectSelectorJSX = this.getFavouriteProjectSelectorJSX();

        // Zero Fill any undefined values.
        var disableAnimations = this.props.generalConfig.disableAnimations === undefined ?
            false : this.props.generalConfig.disableAnimations;
        return (
            <div className="AppSettingsVerticalFlexContainer">
            {/* Disable Animations */}
            <div className="AppSettingsVerticalFlexItem">
            <input className="AppSettingsHorizontalFlexItem" type="checkbox" ref={this.disableAnimationsCheckboxRef}
                onChange={this.handleDisableAnimationsChange} checked={disableAnimations} />
            <span className="AppSettingsHorizontalFlexItem">
                <div className="AppSettingsItemLabel"> Disable animations </div>
            </span>
        </div>
                {/* Faviourte Project Selection */}
                <div className="AppSettingsVerticalFlexItem">
                    <span className="AppSettingsHorizontalFlexItem">
                        <div className="AppSettingsItemLabel"> Favourite project </div>
                    </span>
                    <span className="AppSettingsHorizontalFlexItem">
                        {favoriteProjectSelectorJSX}
                    </span>
                </div>

                {/* Color Selection Title */}
                <div className="AppSettingsVerticalFlexItem">
                    <MenuSubtitle text="Application Color Selection"/>
                </div>

                {/* Color Selection Properties and Inputs */}
                <div className="AppSettingsVerticalFlexItem">
                    <ThemeSettings cssConfig={this.props.cssConfig}
                    onCSSPropertyChange={(propertyName, value) => {this.props.onCSSPropertyChange(propertyName, value)}}
                    onColorPickerClick={this.handleColorPickerClick} openColorPickerIndex={this.props.openColorPickerIndex}
                    onColorPickerCloseButtonClick={this.handleColorPickerCloseButtonClick}
                    onDefaultAllColorsButtonClick={this.handleDefaultAllColorsButtonClick}
                    />
                </div>
            </div>
        )
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
        
        // Build options into HTML select Element.
        return (
            <select className="FavouriteProjectSelect" value={this.props.accountConfig.favouriteProjectId}
             ref="favourteProjectSelect" onChange={this.handleFavouriteProjectSelectChange}>
                {optionsJSX}
            </select>
        )
    }

    handleFavouriteProjectSelectChange() {
        var id = this.refs.favourteProjectSelect.value;
        this.props.onFavouriteProjectSelectChange(id);
    }
}

export default GeneralSettingsPage;