import React from 'react';
import { IconButton } from '@material-ui/core';
import ArrowUpIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';


const ChangeRankButton = (props) => {
    if (props.canPromote === true) {
        return (
            <IconButton onClick={props.onPromote}>
                <ArrowUpIcon fontSize="small"/>
            </IconButton>
        )
    }

    return (
        <IconButton onClick={props.onDemote}>
            <ArrowDownIcon fontSize="small"/>
        </IconButton>  
    );
};

export default ChangeRankButton;