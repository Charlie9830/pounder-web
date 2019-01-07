import React from 'react';

const DueDate = (props) => {
    let baseStyle = {
        width: '32px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'gray',
        background: `${props.color}`,
    }

    let textStyle = {
        flexShrink: '1',
        fontFamily: 'Open Sans',
        fontSize: '7pt',
        fontWeight: '700'
    }

    return (
      <div style={baseStyle}>
        <div style={textStyle}> {props.text} </div>
      </div>
    );
};

export default DueDate;