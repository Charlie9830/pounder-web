import React from 'react';
import { Button } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

const AddNewTaskButton = (props) => {
    return (
        <Button
            variant="text"
            color="primary"
            onClick={props.onClick}
            disabled={props.disabled}>
            <AddIcon />
            Create Task
        </Button>
    );
};

export default AddNewTaskButton;