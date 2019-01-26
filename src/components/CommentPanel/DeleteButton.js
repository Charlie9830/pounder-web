import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = (props) => {
    if (props.show === false) {
        return null;
    }
    
    return (
        <IconButton
        onClick={props.onClick}>
            <DeleteIcon/>
        </IconButton>
    );
};

export default DeleteButton;