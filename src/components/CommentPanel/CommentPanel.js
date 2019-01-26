import React, { Component } from 'react';
import Moment from 'moment';
import CommentInput from './CommentInput';
import ShowMoreButton from './ShowMoreButton';
import Comment from './Comment';
import { getUserUid } from 'handball-libs/libs/pounder-firebase';

import { CircularProgress } from '@material-ui/core';

let gridStyle = {
    width: '100%',
    height: 'calc(100% - 16px)',
    display: 'grid',
    gridTemplateRows: '[Panel]1fr [Input]auto',
    marginTop: '8px',
    marginBotom: '8px',
}

let commentContainerStyle = {
    gridRow: 'Panel',
    placeSelf: 'stretch stretch',
    overflowY: 'scroll',
    padding: '0px 8px 0px 8px',
}

let spinnerContainer = {
    ...commentContainerStyle,
    justifyContent: 'center',
    alignItems: 'center'
}

const Panel = (props) => {
    if (props.isLoadingComments) {
        return (
            <div style={spinnerContainer}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div style={commentContainerStyle}>
            {props.children}
        </div>
    );
};


class CommentPanel extends Component {
    constructor(props) {
        super(props);
        
        // Method Bindings.
        this.getCommentsJSX = this.getCommentsJSX.bind(this);
    }
    
    render() {
        return (
            <div style={gridStyle}>
                <Panel isLoadingComments={this.props.isLoadingComments}>
                    { this.getCommentsJSX() }
                </Panel>
                    

                <div style={{gridRow: 'Input', placeSelf: 'stretch stretch'}}>
                    <CommentInput onPost={this.props.onCommentPost}/>
                </div>
            </div>
        );
    }

    getCommentsJSX() {
        let sortedComments = this.props.comments.slice().sort(this.commentSorter);

        let jsx = sortedComments.map( item => {
            let canDelete = item.createdBy === getUserUid();
            let timeAgo = Moment(item.created).fromNow();
            let isUnread = !item.seenBy.some(item => { return item === getUserUid() })

            return (
                <Comment 
                key={item.uid}
                text={item.text}
                timeAgo={timeAgo}
                displayName={item.displayName}
                isUnread={isUnread}
                canDelete={canDelete}
                isSynced={item.isSynced}
                onDelete={() => { this.props.onCommentDelete(item.uid)}}
                />
            )
        })

        jsx.unshift(<ShowMoreButton
            key="showmorebutton"
            isLoadingMore={this.props.isPaginating}
            hasMoreComments={!this.props.isAllLoaded}
            onClick={this.props.onPaginateComments} />
        )

        return jsx;
    }


    commentSorter(a,b) {
        var createdA = new Date(a.created);
        var createdB = new Date(b.created);
        return createdA - createdB;
    }

}

export default CommentPanel;