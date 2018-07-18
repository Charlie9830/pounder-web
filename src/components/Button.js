import React from 'react';
import '../assets/css/Button.css';

class Button extends React.Component {
    constructor(props) {
        super(props);

        // Class Storage.
        this.acceptButtonInput = false;

        // Method Bindings.
        this.getIconJSX = this.getIconJSX.bind(this);
        this.getTextJSX = this.getTextJSX.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.props.delayButtonInput) {
            setTimeout(() => {
                // Wait before allowing button input, this allows the user to lift their finger after holding down
                // on the item they want to edit.
                this.acceptButtonInput = true;
            }, 400);
        } 
    }

    render() {
        var iconJSX = this.getIconJSX();
        var textJSX = this.getTextJSX();
        var isEnabled = this.props.isEnabled === undefined ? true : this.props.isEnabled;

        return (
            <div className="ButtonContainer" data-isenabled={isEnabled} data-size={this.props.size} onClick={this.handleClick}>
                <div className="ButtonContentFlexContainer">
                {iconJSX}
                {textJSX}
                </div>
            </div>
        )
    }

    handleClick(e) {
        if (this.props.delayButtonInput) {
            // Wait a set amount of time to ensure user has lifted their finger from previous Press down.
            if (this.acceptButtonInput === true) {
                this.props.onClick();
            }
        }

        else {
            this.props.onClick();
        }
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
                    <div className="ButtonText" data-size={this.props.size}> {this.props.text} </div>
                </div>
            )
        }
    }
}

export default Button;