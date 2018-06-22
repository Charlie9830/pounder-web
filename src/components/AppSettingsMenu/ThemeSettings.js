import React from 'react';
import Button from '../Button';
import ColorPicker from '../ColorPicker';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../assets/css/AppSettingsMenu/AppSettingsMenu.css';

class ThemeSettings extends React.Component {
    constructor(props) {
        super(props);

        // Method Bindings.
        this.getZeroFilledCssValues = this.getZeroFilledCssValues.bind(this);
        this.handleColorPickerClick = this.handleColorPickerClick.bind(this);
        this.getColorPicker = this.getColorPicker.bind(this);
        this.handleColorPickerSelect = this.handleColorPickerSelect.bind(this);
        this.handleDefaultButtonClick = this.handleDefaultButtonClick.bind(this);
        this.handleColorPickerCloseButtonClick = this.handleColorPickerCloseButtonClick.bind(this);
        this.handleDefaultAllColorsButtonClick = this.handleDefaultAllColorsButtonClick.bind(this);
    }

    render() {
        var zeroFilledCssValues = this.getZeroFilledCssValues();

        var jsx = zeroFilledCssValues.map((item,index) => {
            
            var colorDisplayStyle = {
                height: '20px',
                width: '100px',
                background: item.value,
                border: 'gray 1px solid',
            }

            const friendlyPropertyName = this.parsePropertyName(item.property);
            const showColorPicker = index === this.props.openColorPickerIndex;
            const colorPicker = this.getColorPicker(showColorPicker, item.property, item.value );

            return (
                <div key={index} className="CSSSelectorsRowGrid">
                    <span className="CSSSelectors-label">
                        <div className="AppSettingsItemLabel">{friendlyPropertyName}</div>
                    </span>
                    <span className="CSSSelectors-value">
                        <div style={colorDisplayStyle} onClick={(e) => { this.handleColorPickerClick(e, index) }}>
                            <TransitionGroup>
                                {colorPicker}
                            </TransitionGroup>
                        </div>
                    </span>
                    <span className="CSSSelectors-defaultButton">
                        <Button text="Default" size="small" onClick={() => {this.handleDefaultButtonClick(item.property)}}/>
                    </span>
                </div>
            )
        })

        return (
            <div>
                {jsx}
                <div className="CSSSelectorsRowGrid">
                    <div className="CSSSelectorsGridDivider"/>
                </div>
                <div className="CSSSelectorsRowGrid">
                    <div className="CSSSelectors-label">
                        <div className="ResetColorSettingsLink" onClick={this.handleDefaultAllColorsButtonClick}>
                         Reset all colors to default
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleDefaultAllColorsButtonClick() {
        this.props.onDefaultAllColorsButtonClick();
    }

    handleDefaultButtonClick(propertyName) {
        // Determine default Value. Instead of having to deal directly with the CSS Stylesheet from here. We just remove the
        // rule (which removes it from the inline style), then read the Computed Style. This means the browser does the work of
        // falling back to the Stylesheet for us.
        var appRoot = document.getElementById('root')
        appRoot.style.removeProperty(propertyName);
        var value = window.getComputedStyle(appRoot).getPropertyValue(propertyName);

        this.props.onCSSPropertyChange(propertyName, value);
    }

    getColorPicker(showColorPicker, propertyName, currentColor) {
        if (showColorPicker) {
            return (
                <CSSTransition key={"colorSettings"} classNames="ColorPickerContainer"
                    timeout={250}>
                    <ColorPicker defaultValue={currentColor}
                        onColorSelectComplete={newColor => { this.handleColorPickerSelect(newColor, propertyName) }} />
                </CSSTransition>

            )
        }
    }

    handleColorPickerCloseButtonClick() {
        
    }

    handleColorPickerSelect(newColor, propertyName) {
        this.props.onCSSPropertyChange(propertyName, newColor);
        this.props.onColorPickerCloseButtonClick();
    }

    handleColorPickerClick(e,index) {
        if (index === this.props.openColorPickerIndex) {
            e.stopPropagation();
        }

        if (this.props.openColorPickerIndex === -1) {
            this.props.onColorPickerClick(index);
        }
    }

    getZeroFilledCssValues() {
        // Parse the cssConfig object into a "Zero Filled" object. Blanks replaced by current Computed Values.
        var computedStyle = window.getComputedStyle(document.getElementById('root'));
        var filledCSSVariables = [];

        for (var property in this.props.cssConfig) {
            var value = this.props.cssConfig[property];
            var filledValue = value === "" ? computedStyle.getPropertyValue(property) : value;
            filledCSSVariables.push({property: property, value: filledValue});
        }

        return filledCSSVariables;
    }

    parsePropertyName(propertyName) {
        // Remove leading hypens, then replace non Leading hypens with spaces.
        var workingString = propertyName.replace('--','').replace(/-/g,' ');
        return this.toTitleCase(workingString);
    }

    toTitleCase(str) {
        str = str.toLowerCase()
            .split(' ')
            .map(function (word) {
                return (word.charAt(0).toUpperCase() + word.slice(1));
            });

        return str.join(' ');
    }
}


export default ThemeSettings;