import React from 'react';
import AppSettingsMenuSubtitle from './AppSettingsMenuSubtitle';
import ThemeSettings from './ThemeSettings';
import '../../assets/css/AppSettingsMenu/AppSettingsMenu.css';


class GeneralSettingsPage extends React.Component {
    constructor(props) {
        super(props);
        
        // Method Bindings.
        this.getFavouriteProjectSelectorJSX = this.getFavouriteProjectSelectorJSX.bind(this);
        this.handleStartInFullscreenChange = this.handleStartInFullscreenChange.bind(this);
        this.handleStartLockedChange = this.handleStartLockedChange.bind(this);
        this.handleFavouriteProjectSelectChange = this.handleFavouriteProjectSelectChange.bind(this);
        this.handleColorPickerClick = this.handleColorPickerClick.bind(this);
        this.handleColorPickerCloseButtonClick = this.handleColorPickerCloseButtonClick.bind(this);
        this.handleDefaultAllColorsButtonClick = this.handleDefaultAllColorsButtonClick.bind(this);
    }

    render() {
        var favoriteProjectSelectorJSX = this.getFavouriteProjectSelectorJSX();

        return (
            <div className="AppSettingsVerticalFlexContainer">
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
                    <AppSettingsMenuSubtitle text="Application Color Selection"/>
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
        var optionsJSX = this.props.projects.map((project,index) => {
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

    getColorPropertiesJSX() {
        // Parse the cssConfig object into a "Zero Filled" object. Blanks replaced by current Computed Values.
        var computedStyle = window.getComputedStyle(document.getElementById('root'));
        var filledCSSVariables = [];

        for (var property in this.props.cssConfig) {
            var value = this.props.cssConfig[property];
            var filledValue = value === "" ? computedStyle.getPropertyValue(property) : value;
            filledCSSVariables.push({property: property, value: filledValue});
        }

        var jsx = filledCSSVariables.map((item,index) => {
            var colorDisplayStyle = {
                height: '10px',
                width: '100%',
                background: item.value,
                border: 'gray 1px solid'
            }

            return (
                <div key={index}>
                <div className="AppSettingsVerticalFlexItem">
                    <span className="ColorConfigHorizontalFlexItem">
                        <div className="AppSettingsItemLabel">{item.property}</div>
                    </span>
                    <span className="ColorConfigHorizontalFlexItem">
                        <input className="AppSettingsItemInput" type="text" defaultValue={item.value}
                        onBlur={(e) => this.handleCSSPropertyInputBlur(e, item.property)}
                        onKeyPress={(e) => this.handleCSSPropertyInputKeyPress(e, item.property)}/>
                    </span>
                    
                </div>
                        <div style={colorDisplayStyle}>
                        </div>
                </div>
            )
        })

        return jsx;
    }

    handleCSSPropertyInputKeyPress(e, propertyName) {
        if (e.key === "Enter") {
            this.props.onCSSPropertyChange(propertyName, e.target.value);
        }

    }

    handleCSSPropertyInputBlur(e, propertyName) {
        this.props.onCSSPropertyChange(propertyName, e.target.value);
    }
}

export default GeneralSettingsPage;