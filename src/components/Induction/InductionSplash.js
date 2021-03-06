import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setIsInducting, bumpVersionNumberToCurrentAsync } from 'handball-libs/libs/pounder-redux/action-creators';
import { Typography, Button, Drawer } from '@material-ui/core';
import FullScreenView from '../../layout-components/FullScreenView';

let gridStyle = {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: '[Message]auto [Button]1fr',
    flexGrow: '1',
    padding: '16px'
}

let buttonContainer = {
    gridRow: 'Button',
    placeSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}

class InductionSplash extends Component {
    constructor(props) {
        super(props);
        
        // Method Bindings.
        this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    }
    

    render() {    
        return (
            <Drawer anchor="top"
            open={this.props.isInducting}>
                <FullScreenView>
                    <div style={gridStyle}>
                        <div
                            style={{ gridRow: 'Message', placeSelf: 'flex-start stretch' }}>
                            <Typography variant="h5" color="secondary">
                                Version 2.2.2
                            </Typography>
    
                            <p />
    
                            <Typography variant="body1">
                                This update brings further improvements to the Scrolling bug introduced in iOS Safari 12.2.
                            </Typography>
                        </div>
                        <div
                            style={buttonContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleStartButtonClick}>
                                Start
                       </Button>
                        </div>
                    </div>
                </FullScreenView>
            </Drawer>
        );
    }

    handleStartButtonClick() {
        this.props.dispatch(setIsInducting(false));
        this.props.dispatch(bumpVersionNumberToCurrentAsync());
    }
}

const mapStateToProps = state => {
    return {
        isInducting: state.isInducting,
    }
}

let VisibleInductionSplash = connect(mapStateToProps)(InductionSplash);
export default VisibleInductionSplash;