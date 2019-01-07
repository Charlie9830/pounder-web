import React from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

let toolbarStyle = {
    display: 'grid',
    gridTemplateColumns: '[Menu]auto [Title]1fr'
}

const TaskListToolbar = (props) => {
    return (
        <div style={toolbarStyle}>
            <div style={{ gridColumn: 'Menu', placeSelf: 'center' }}>
                <IconButton>
                    <MoreHorizIcon />
                </IconButton>
            </div>
        
            <div style={{gridColumn: 'Title', placeSelf: 'center', marginLeft: '-48px'}}>
                <Typography variant="subheading"> {props.name} </Typography>
            </div>
            
        </div>
            
         
        
    );
};

export default TaskListToolbar;