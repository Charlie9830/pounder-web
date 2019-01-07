import React from 'react';

const SwipeableListItemAction = (props) => {
    let containerStyle = {
        width: '64px',
        height: '100%',
        maxWidth: '64px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflowX: 'hidden',
        background: props.background,
    }
    
    return (
        <div style={containerStyle} onClick={props.onClick}>
            {props.children}
        </div>
    );
};

export default SwipeableListItemAction;