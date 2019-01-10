import React, { Component } from 'react';
import { ListItem, Typography } from '@material-ui/core';
import UnreadIndicator from './UnreadIndicator';
import DeleteButton from './DeleteButton';

let gridStyle = {
    width: '100%',
    height: 'fit-content',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: 'auto 1fr 1fr auto',
    gridTemplateAreas: `' UnreadIndicator DisplayName  .    Timestamp Delete '
                        ' UnreadIndicator Text        Text  Text      Delete '`
}

let unreadIndicatorContainer = {
    gridArea: 'UnreadIndicator',
    placeSelf: 'stretch stretch',
}

let displayNameContainer = {
    gridArea: 'DisplayName',
    placeSelf: 'center flex-start '
}

let timestampContainer = {
    gridArea: 'Timestamp',
    placeSelf: 'center flex-end'
}

let textContainer = {
    gridArea: 'Text',
    placeSelf: 'center flex-start'
}

let deleteButtonContainer = {
    gridArea: 'Delete',
    placeSelf: 'center center',
}


class Comment extends Component {
    constructor(props) {
        super(props);
        
        // State
        this.state = {
            isMouseOver: false,
        }
    }

    render() {
        let timeAgo = this.props.isSynced ? this.props.timeAgo : "Not Synced";

        return (
            <ListItem
            onMouseEnter={() => { this.setState({isMouseOver: true}) }}
            onMouseLeave={() => { this.setState({ isMouseOver: false })}}>
                <div style={gridStyle}>
                    <div
                    style={unreadIndicatorContainer}>
                        <UnreadIndicator show={this.props.isUnread}/>
                    </div>

                    <div 
                    style={displayNameContainer}>
                        <Typography color="textSecondary"> { this.props.displayName } </Typography>
                    </div>

                    <div 
                    style={timestampContainer}>
                        <Typography color="textSecondary" variant="caption"> { timeAgo } </Typography>
                    </div>

                    <div 
                    style={textContainer}>
                        <Typography color="textPrimary"> { this.props.text } </Typography>
                    </div>

                    <div
                    style={deleteButtonContainer}>
                        <DeleteButton show={this.state.isMouseOver}/>
                    </div>
                </div>
            </ListItem>
        );
    }
}

export default Comment;