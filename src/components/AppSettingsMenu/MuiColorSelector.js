import React from 'react';
import MuiColorChit from './MuiColorChit';

let container = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
}

const MuiColorSelector = (props) => {
    if (props.muiColors === undefined) {
        return null;
    }

    let colorChits = props.muiColors.map( (item, index) => {
        return (
            <MuiColorChit
            key={index}
            isSelected={ item.id === props.value }
            color={item.color[500]}
            onClick={() => { props.onChange(item.id)}}/>
        )
    })

    return (
        <div
        style={container}>
            {colorChits}
        </div>
    );
};

export default MuiColorSelector;