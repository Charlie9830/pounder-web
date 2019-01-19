import React, { Component } from 'react';
import Hammer from 'hammerjs';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import MuiColorChit from './MuiColorChit';

let grid = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '[Text]1fr [Chits]auto [DeleteButton]auto'
}

let chitContainer = {
    gridColumn: 'Chits',
    placeSelf: 'center stretch',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
}

class ThemeListItem extends Component {
    constructor(props) {
        super(props);
        
        // Refs.
        this.containerRef = React.createRef();
    }
    
    componentDidMount() {
        let containerHammer = new Hammer(this.containerRef.current);
        containerHammer.on('press', (e) => {
            this.props.onPress();
        })

        containerHammer.on('tap', (e) => {
            this.props.onClick();
        })
    }

    componentWillUnmount() {
        Hammer.off(this.containerRef.current, 'press');
        Hammer.off(this.containerRef.current, 'tap');
    }

    render() {
        let secondaryAction = (
            <IconButton
                onClick={this.props.onDelete}>
                <DeleteIcon />
            </IconButton>
        )

        return (
            <div
                ref={this.containerRef}>
                <ListItem
                    selected={this.props.isSelected}>
                    <div
                        style={grid}>
                        <div style={{ gridColumn: 'Text', placeSelf: 'center flex-start' }}>
                            <ListItemText
                                primary={this.props.name}
                            />
                        </div>

                        <div style={chitContainer}>
                            <MuiColorChit
                                color={this.props.primaryColor} />
                            <MuiColorChit
                                color={this.props.secondaryColor} />
                            <MuiColorChit
                                color={this.props.backgroundColor} />
                        </div>

                        <div
                            style={{ gridColumn: 'DeleteButton', placeSelf: 'center' }}>
                            {this.props.isSelected && this.props.canDelete && secondaryAction}
                        </div>
                    </div>
                </ListItem>
            </div>
        );
    }
}

    

export default ThemeListItem;