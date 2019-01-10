import React, { Component } from 'react';
import CommentInput from './CommentInput';
import { Popover, Toolbar, IconButton } from '@material-ui/core';
import CommentPanel from './CommentPanel';
import Expander from '../Expander';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

let gridStyle = {
    width: '85vw',
    height: '90vh',
    display: 'grid',
    gridTemplateRows: '[Toolbar]56px [CommentPanel]1fr',
    overflowY: 'hidden'
}

class ExpandingCommentPanel extends Component {
    constructor(props) {
        super(props);
        
        // Refs
        this.anchorRef = React.createRef();

        // State
        this.state = {
            isOpen: false,
        }
    }
    

    render() {
        return (
            <div 
            style={{padding: '8px'}}
            onClick={() => { if (this.state.isOpen === false) this.setState({ isOpen: true })}}>
                <CommentInput
                 ref={this.anchorRef}
                 onPost={this.props.onCommentPost}/>

                <Expander
                    open={this.state.isOpen}
                    anchorEl={this.anchorRef.current}
                    onClose={() => { this.setState({ isOpen: false }) }}>
                    <CommentPanel {...this.props} />
                </Expander>
            </div>
        );
    }
}

export default ExpandingCommentPanel;