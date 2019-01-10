import React from 'react';
import { Grid, IconButton, Typography, withTheme } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


const TaskListToolbar = (props) => {
    let { theme } = props;

    let toolbarStyle = {
        display: 'grid',
        gridTemplateColumns: '[Menu]auto [Title]1fr',
        background: props.isFocused ? theme.palette.secondary.light : 'unset',
    }

    return (
        <div 
        style={toolbarStyle}
        >
            <div 
            style={{ gridColumn: 'Menu', placeSelf: 'center' }}>
                <IconButton>
                    <MoreHorizIcon fontSize="small" />
                </IconButton>
            </div>
        
            <div
            style={{gridColumn: 'Title', placeSelf: 'center', marginLeft: '-48px'}}>
                <Typography variant="subheading"> {props.name} </Typography>
            </div>
            
        </div>
            
         
        
    );
};

export default withTheme()(TaskListToolbar);