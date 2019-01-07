import React from 'react';

const PriorityIndicator = (props) => {
    if (props.isHighPriority === false) {
        return null;
    }

    
    else {
        let priorityStyle = {
            width: '8px',
            height: '100%',
            background: 'orange',
        }

        return (
            <div style={priorityStyle}/>
        )
    }
};

export default PriorityIndicator;