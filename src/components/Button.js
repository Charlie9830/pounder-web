import React from 'react';
import '../assets/css/Button.css';

class Button extends React.Component {
    constructor(props) {
        super(props);

        // Method Bindings.
        this.getIconJSX = this.getIconJSX.bind(this);
        this.getTextJSX = this.getTextJSX.bind(this);
    }

    render() {
        var iconJSX = this.getIconJSX();
        var textJSX = this.getTextJSX();

        return (
            <div className="ButtonContainer" data-size={this.props.size} onClick={(e) => {this.props.onClick(e)}}>
                <div className="ButtonContentFlexContainer">
                {iconJSX}
                {textJSX}
                </div>
            </div>
        )
    }

    getIconJSX() {
        if (this.props.iconSrc !== undefined) {
            return (
                <div className="ButtonContentFlexItemContainer">
                    <img className="ButtonIcon" src={this.props.iconSrc}/>
                </div>
            )
        }
    }

    getTextJSX() {
        if (this.props.text !== undefined) {
            return (
                <div className="ButtonContentFlexItemContainer">
                    <div className="ButtonText"> {this.props.text} </div>
                </div>
            )
        }
    }
}

export default Button;