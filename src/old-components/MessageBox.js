import React from 'react';
import Modal from 'react-modal';
import { MessageBoxTypes } from 'handball-libs/libs/pounder-redux';
import '../assets/css/MessageBox.css';
import '../assets/css/ToolBarButton.css';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide } from '@material-ui/core';

let Transition = (props) => {
    return <Slide direction="up" {...props}/>
}

class MessageBox extends React.Component {
    constructor(props) {
        super(props);

        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
        this.getButtonsJSX = this.getButtonsJSX.bind(this);
    }

    render() {
        var buttonsJSX = this.props.config.isOpen === undefined ? null : this.getButtonsJSX();
        var isOpen = typeof this.props.config.isOpen === 'boolean' ? this.props.config.isOpen : false;
        var message = this.props.config.message === undefined ? "" : this.props.config.message;
        var dialogTitle = this.props.config.dialogTitle === undefined ? "" : this.props.config.dialogTitle;

        return (
            <Dialog open={isOpen} onBackdropClick={this.handleCancelButtonClick} TransitionComponent={Transition}>
                <DialogTitle> {dialogTitle} </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                    <DialogActions>
                        {buttonsJSX}
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
 
    // <Modal portalClassName="ModalPortal" className="ModalContent" overlayClassName="ModalOverlay" isOpen={isOpen}
    //         ariaHideApp={false}>
    //             <div className="MessageBoxVerticalFlexContainer">
    //                 <div className="MessageBoxMessageContainer">
    //                     <div className="MessageBoxMessage">
    //                         {message}
    //                     </div>
    //                 </div>
    //                 {buttonsJSX}
    //             </div>
    //         </Modal>

    getButtonsJSX() {
        if (this.props.config.type === MessageBoxTypes.OK_ONLY) {
            return (
                <React.Fragment>
                    <Button color="primary" onClick={this.handleOkButtonClick}> Okay </Button>
                </React.Fragment>
            )
        }

        else {
            return (
                <React.Fragment>
                    <Button color="primary" onClick={this.handleCancelButtonClick}> Cancel </Button>
                    <Button color="primary" onClick={this.handleOkButtonClick}> Okay </Button>
                </React.Fragment>
            )
        }
    }

    handleOkButtonClick() {
        if (this.props.config.closeCallback !== undefined) {
            this.props.config.closeCallback("ok");
        }    
    }

    handleCancelButtonClick() {
        if (this.props.config.closeCallback !== undefined) {
            this.props.config.closeCallback("cancel");
        }  
    }
}

export default MessageBox;