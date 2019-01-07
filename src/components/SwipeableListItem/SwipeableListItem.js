import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import SwipeableListItemAction from './SwipeableListItemAction';

const leftThreshold = 128;
const rightThreshold = 128;

// Actions Arrays expect Array of Object Type {
//    value: Returned as an argument in the Click handler.
//    icon: <Icon/>
//    background: color
// }

class SwipeableListItem extends Component {
    constructor(props) {
        super(props);

        // State.
        this.state = {
            leftActionsWidth: 0,
            rightActionsWidth: 0,
            isLeftActionsOpen: false,
            isRightActionsOpen: false,
            childrenTranslate: 0,
        }

        // Refs.
        this.childrenContainerRef = React.createRef();

        // Method Bindings.
        this.handleSwipingLeft = this.handleSwipingLeft.bind(this);
        this.handleSwipingRight = this.handleSwipingRight.bind(this);
        this.handleSwiped = this.handleSwiped.bind(this);
        this.processActions = this.processActions.bind(this);
    }

    render() {
        let leftActionsColumnWidth = this.state.isLeftActionsOpen ? 'max-content' : `${this.state.leftActionsWidth}px`;
        let rightActionsColumnWidth = this.state.isRightActionsOpen ? 'max-content' : `${this.state.rightActionsWidth}px`;
        let childrenWidth = this.childrenContainerRef.current === null ? `1fr` : `${this.childrenContainerRef.current.offsetWidth}px`;

        //childrenWidth = '319.200px';

        let containerGrid = {
            width: '100%',
            position: 'relative',
            overflowX: 'hidden',
            display: 'grid',
            gridTemplateColumns: `[LeftActions]${leftActionsColumnWidth} [Children]${childrenWidth} [RightActions]${rightActionsColumnWidth}`,
        }

        console.log(containerGrid.gridTemplateColumns);

        let leftActionsContainer = {
            gridColumn: 'LeftActions',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }

        let childrenContainer = {
            gridColumn: 'Children',
            placeSelf: 'center flex-start',
            width: '100%',
            // transform: `translateX(${this.state.childrenTranslate}px)`,
            marginLeft: this.state.rightActionsWidth * -1,
            background: 'purple',
        }

        let rightActionsContainer = {
            gridColumn: 'RightActions',
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'flex-start',
            marginLeft: this.state.rightActionsWidth * -1,
            alignItems: 'center'
        }

        return (
            <div style={containerGrid}>
                <div style={leftActionsContainer}>
                    { this.processActions(this.props.leftActions) }
                </div>

                <div style={childrenContainer}>
                    <Swipeable 
                    onSwipingLeft={this.handleSwipingLeft}
                    onSwipingRight={this.handleSwipingRight}
                    onSwiped={this.handleSwiped}>
                        <div ref={this.childrenContainerRef}>
                            {this.props.children}
                        </div>
                    </Swipeable>
                </div>

                <div style={rightActionsContainer}>
                    { this.processActions(this.props.rightActions) }
                </div>
            </div>
        );
    }

    handleActionClick(value) {
        this.setState({
            leftActionsWidth: 0,
            rightActionsWidth: 0,
            isLeftActionsOpen: false,
            isRightActionsOpen: false,
            childrenTranslate: 0,
        })

        this.props.onActionClick(value);
    }

    processActions(actions) {
        let jsx = actions.map( (item, index) => {
            return (
                <SwipeableListItemAction
                    key={index}
                    onClick={() => { this.handleActionClick(item.value) }}
                    background={item.background}>
                    {item.icon}
                </SwipeableListItemAction>
            )
        })

        return jsx;
    }

    handleSwiped(e, deltaX, deltaY) {
        if (this.state.isLeftActionsOpen) {

        }

        else if (this.state.isRightActionsOpen) {

        }

        else {
            // Threshold was not acheived.
            this.setState({
                leftActionsWidth: 0,
                rightActionsWidth: 0,
                childrenTranslate: 0,
            })
        }
        
    }

    handleSwipingLeft(e, deltaX) {
        let absX = e.target.getBoundingClientRect().x

        if (deltaX > leftThreshold) {
            // Threshold Acheived.
            this.setState({
                isRightActionsOpen: true,
            })
        }

        else {
            // Keep sliding open.
            this.setState({
                rightActionsWidth: deltaX,
                childrenTranslate: absX * -1,
            });
        }
    }

    handleSwipingRight(e, deltaX) {
        console.log(deltaX);
        if (deltaX > rightThreshold) {
            // Threshold Acheived.
            this.setState({
                isLeftActionsOpen: true,
            })
        }

        else {
            // Keep sliding open.
            this.setState({
                leftActionsWidth: deltaX,
                childrenTranslate: deltaX
            });
        }
    }
}

export default SwipeableListItem;