import React from 'react';

const MuiColorChit = (props) => {
    let style = {
        flexGrow: 0,
        flexShrink: 0,
        width: '16px',
        height: '16px',
        margin: '8px',
        borderRadius: '50%',
        borderWidth: props.isSelected ? '4px' : 'unset',
        borderColor: props.isSelected ? 'grey' : 'unset',
        background: props.color,
    }

    return (
        <div
        style={style}
        onClick={props.onClick}/>
    );
};

export default MuiColorChit;