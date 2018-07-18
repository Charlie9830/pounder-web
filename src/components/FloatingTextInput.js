import React from 'react';
import '../assets/css/FloatingTextInput.css'
import TextareaAutosize from 'react-autosize-textarea';
import OverlayMenuContainer from '../containers/OverlayMenuContainer';
import Button from './Button';
import { CSSTransition } from 'react-transition-group';

class FloatingTextInput extends React.Component {
    constructor(props) {
        super(props);

        // Method Bindings
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
        this.handleOutsideChildBoundsClick = this.handleOutsideChildBoundsClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleContainerClick = this.handleContainerClick.bind(this);
    }

    componentDidMount() {
        // Pull Keyboard Focus.
        this.textarea.focus();
    }

    render() {
        return (
            <OverlayMenuContainer onOutsideChildBoundsClick={this.handleOutsideChildBoundsClick}>
                    <div className="FloatingTextInputPopupContainer" onClick={this.handleContainerClick}>
                        <div className="FloatingTextInputTextAreaContainer">
                            <TextareaAutosize className="FloatingTextInputTextArea" innerRef={ref => this.textarea = ref} type='text' defaultValue={this.props.defaultValue}
                                onKeyDown={this.handleKeyDown} onKeyPress={this.handleKeyPress} />
                        </div>
                        <div className="FloatingTextInputFooter">
                            <Button text="Ok" size="small" onClick={this.handleOkButtonClick} />
                            <Button text="Cancel" size="small" onClick={this.handleCancelButtonClick} />
                        </div>
                    </div>
            </OverlayMenuContainer>
        )
    }

    handleContainerClick() {
        // Push Focus back to Textarea to keep Keyboard open, otherise it closes as before the uses has lifted their finger,
        // from the original Press.
        this.textarea.focus();
    }

    handleOutsideChildBoundsClick() {
        // Push Focus back to Textarea to keep Keyboard open, otherise it closes as before the uses has lifted their finger,
        // from the original Press.
        this.textarea.focus();
    }

    handleCancelButtonClick() {
        this.props.onCancel();
    }

    handleOkButtonClick() {
        this.props.onTextSubmit(this.textarea.value);
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.props.onTextSubmit(this.textarea.value);
        }
    }


}

export default FloatingTextInput;