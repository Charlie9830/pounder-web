import React from 'react';
import CommentIcon from '@material-ui/icons/Comment';
import NotesIcon from '@material-ui/icons/Notes';
import AssignedToIcon from '@material-ui/icons/AssignmentInd';

let gridStyle = {
    display: 'grid',
    gridTemplateRows: '[Content]auto',
    gridTemplateColumns: '[UnreadComments]auto [Notes]auto [Assignment]1fr',
    gridTemplateAreas: 'UnreadComments Notes Assignment',
}

const IndicatorPanel = (props) => {
    let commentIconJSX = props.hasUnreadComments === true ? <CommentIcon fontSize="small" color="action"/> : null;
    let notesIconJSX = props.hasNote === true ? <NotesIcon fontSize="small" color="action"/> : null;
    let assignedToJSX = props.assignedTo !== -1 ? <AssignedToIcon fontSize="small"/> : null;

    return (
        <div style={gridStyle}>
            {/* Unread Comments  */} 
            <div style={{gridArea: 'UnreadComments'}}>
                { commentIconJSX }
            </div>

            {/* Notes  */} 
            <div style={{gridArea: 'Notes'}}>
                { notesIconJSX }
            </div>

            {/* Assignment  */} 
            <div style={{gridArea: 'Assignment'}}>
                { assignedToJSX }
            </div>
            
        </div>
    );
};

export default IndicatorPanel;