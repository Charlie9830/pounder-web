import React, { Component } from 'react';
import Hammer from 'hammerjs';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import MuiColorChit from './MuiColorChit';

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
    }

    componentWillUnmount() {
        Hammer.off(this.containerRef.current, 'press');
    }

    render() {
        let secondaryAction = (
            <ListItemSecondaryAction
            style={{marginLeft: '16px'}}>
                <IconButton
                onClick={this.props.onDelete}>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        )

        return (
            <div
            ref={this.containerRef}>
                <ListItem
                    selected={this.props.isSelected}>
                    <ListItemText
                        primary={this.props.name}
                        onClick={this.props.onClick} />
                    
                    <MuiColorChit 
                    color={this.props.primaryColor}/>
                    <MuiColorChit 
                    color={this.props.secondaryColor}/>
                    <MuiColorChit 
                    color={this.props.backgroundColor}/>

                        { this.props.isSelected && this.props.canDelete && secondaryAction }
                </ListItem>
            </div>
        );
    }
}

    

export default ThemeListItem;