import React from 'react';
import { Popover, Toolbar, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = {
    paper: {
        maxWidth: '100vw',
        maxHeight: '100vh',
        top: 0,
        left: 0,
    }
}

let gridStyle = {
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: '[Toolbar]56px [Children]1fr',
    overflowY: 'hidden'
}

const Expander = (props) => {
    let { classes } = props;

    return (
        <Popover
        classes={{ paper: classes.paper}}
        open={props.open}
        marginThreshold={0}
        anchorEl={props.anchorEl}
        anchorOrigin={{ vertical: 'center', horizontal: 'center'}}
        transformOrigin={{ vertical: 'center', horizontal: 'center'}}>
            <div
            style={gridStyle}>
                <div style={{ gridRow: 'Toolbar', placeSelf: 'center stretch' }}>
                    <Toolbar>
                        <IconButton onClick={(e) => { e.stopPropagation(); props.onClose() }}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Toolbar>
                </div>

                <div style={{ gridRow: 'Children', placeSelf: 'stretch' }}>
                    { props.children }
                </div>
            </div>
        </Popover>
    );
};


export default withStyles(styles)(Expander);