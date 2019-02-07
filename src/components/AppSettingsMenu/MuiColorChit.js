import React from 'react';
import { withTheme } from '@material-ui/core';

const MuiColorChit = (props) => {
    let { theme } = props;
    let chitStyle = {
        flexGrow: 0,
        flexShrink: 0,
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: props.color
    }

    let containerStyle = {
        flexGrow: 0,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: props.isSelected ? '0px' : '8px',
        width: props.isSelected ? '32px' : '24px',
        height: props.isSelected ? '32px' : '24px',
        borderRadius: '50%',
        background: theme.palette.action.selected,
        transition: theme.transitions.create(['width', 'height', 'margin']),
    }

    return (
        <div
            style={containerStyle}
            onClick={props.onClick} >
            <div
                style={chitStyle}/>
        </div>
    )
};

export default withTheme()(MuiColorChit);