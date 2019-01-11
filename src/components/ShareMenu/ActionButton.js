import React from 'react';
import { Button } from '@material-ui/core';

const ActionButton = (props) => {
    return (
        <Button style={{margin: '8px'}} {...props} variant='outlined'> {props.children} </Button>
    );
};

export default ActionButton;