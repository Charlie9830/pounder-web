import React from 'react';
import Slider from 'rc-slider';
import tinycolor from 'tinycolor2';
import Button from './Button';
import '../assets/css/ColorPicker.css';
import '../assets/css/rc-slider/index.css';
import LightenIcon from '../assets/icons/LightenIcon.svg';
import DarkenIcon from '../assets/icons/DarkenIcon.svg';
import { DisableBodyScroll, EnableBodyScroll } from '../utilities/DOMHelpers';

let railStyle = {
    background: 'gray',
    color: 'purple',
    width: '15px'
}

let baseTrackStyle = {
    width: '15px',
}

let handleStyle = {
    background: 'white',
    borderColor: 'white',
    width: '25px',
    height: '25px',
}

let redTrackStyle = {
    ...baseTrackStyle,
    background: 'red'
}

let greenTrackStyle = {
    ...baseTrackStyle,
    background: 'green'
}

let blueTrackStyle = {
    ...baseTrackStyle,
    background: 'blue'
}

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);

        const color = tinycolor(props.defaultValue);
        const defaultColor = color.toRgb();

        // State.
        this.state = {
            red: defaultColor.r,
            green: defaultColor.g,
            blue: defaultColor.b,
            defaultRed: defaultColor.r,
            defaultGreen: defaultColor.g,
            defaultBlue: defaultColor.b,
        }

        // Method Bindings.
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
        this.handleDarkenButtonClick = this.handleDarkenButtonClick.bind(this);
        this.handleLightenButtonClick = this.handleLightenButtonClick.bind(this);
    }

    componentDidMount() {
        DisableBodyScroll();
    }

    componentWillUnmount() {
        EnableBodyScroll();
    }

    render() {
        const colorDisplayStyle = {
            background: `rgb(${this.state.red},${this.state.green},${this.state.blue}`
        }

        return (
            <div className="ColorPicker">
                <div style={colorDisplayStyle} className="ColorPickerColorDisplay">
                </div>
                <div className="ColorPickerSlidersFlexContainer">
                    {/* Brightness Buttons */}
                    <div className="BrightnessButtonsContainer">
                        <Button iconSrc={LightenIcon} onClick={this.handleLightenButtonClick} />
                        <Button iconSrc={DarkenIcon} onClick={this.handleDarkenButtonClick} />
                    </div>

                    {/* Red  */}
                    <div className="ColorPickerSliderContainer">
                        <Slider railStyle={railStyle} handleStyle={handleStyle} trackStyle={redTrackStyle}
                            min={0} max={255} vertical={true} defaultValue={this.state.defaultRed} value={this.state.red} step={1}
                            onChange={value => { this.handleSliderChange("red", value) }} />
                    </div>

                    {/* Green  */}
                    <div className="ColorPickerSliderContainer">
                        <Slider railStyle={railStyle} handleStyle={handleStyle} trackStyle={greenTrackStyle}
                            min={0} max={255} vertical={true} defaultValue={this.state.defaultGreen} value={this.state.green} step={1}
                            onChange={value => { this.handleSliderChange("green", value) }} />
                    </div>

                    {/* Blue  */}
                    <div className="ColorPickerSliderContainer">
                        <Slider railStyle={railStyle} handleStyle={handleStyle} trackStyle={blueTrackStyle}
                            min={0} max={255} vertical={true} defaultValue={this.state.defaultBlue} value={this.state.blue} step={1}
                            onChange={value => { this.handleSliderChange("blue", value) }} />
                    </div>
                </div>
                <div className="ColorPickerFooter">
                    <Button text="Ok" onClick={this.handleOkButtonClick} />
                </div>
            </div>
        )
    }

    handleDarkenButtonClick() {
        const color = tinycolor({ r: this.state.red, g: this.state.green, b: this.state.blue }).darken(5).toRgb();

        this.setState({
            red: color.r,
            green: color.g,
            blue: color.b
        })
    }

    handleLightenButtonClick() {
        const color = tinycolor({ r: this.state.red, g: this.state.green, b: this.state.blue }).lighten(5).toRgb();

        this.setState({
            red: color.r,
            green: color.g,
            blue: color.b
        })
    }

    handleOkButtonClick() {
        const hexColor = tinycolor({ r: this.state.red, g: this.state.green, b: this.state.blue }).toHexString();
        this.props.onColorSelectComplete(hexColor);
    }

    handleSliderChange(property, value) {
        switch (property) {
            case "red":
                this.setState({ red: value })
                break;

            case "green":
                this.setState({ green: value })
                break;

            case "blue":
                this.setState({ blue: value })
                break;

            default:
                break;

        }
    }
}

export default ColorPicker;