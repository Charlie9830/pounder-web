import React from 'react';
import { Popover, Toolbar, IconButton } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

let gridStyle = {
    width: '85vw',
    height: '90vh',
    display: 'grid',
    gridTemplateRows: '[Toolbar]56px [Children]1fr',
    overflowY: 'hidden'
}

const Expander = (props) => {
    return (
        <Popover
        open={props.open}
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


export default Expander;