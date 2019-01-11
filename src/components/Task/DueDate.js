import React from 'react';
import Color from 'color';
import colorString from 'color-string';

const DueDate = (props) => {
    let isSet = props.type !== "unset";
    let color = isSet ? props.color : "transparent";
    let textColor = props.type === "unset" ? "unset" : getTextColor(color)

    let baseStyle = {
        width: '32px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: isSet === true ? 'transparent' : 'gray',
        background: color,
    }

    let textStyle = {
        flexShrink: '1',
        fontFamily: 'Open Sans',
        fontSize: '7pt',
        fontWeight: '700',
        color: textColor,
    }

    return (
      <div style={baseStyle}>
        <div style={textStyle}> {props.text} </div>
      </div>
    );
};

const getTextColor = (backgroundColor) => {
    if (backgroundColor === undefined || backgroundColor === "transparent") {
        return "#FFF"
    }

    let color = colorString.get(backgroundColor);
    
    if (Color.rgb(color.value).isLight()) {
        return '#000'
    }

    else {
        return '#FFF'
    }
}

export default DueDate;