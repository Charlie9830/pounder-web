import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import SwipeableListItemAction from './SwipeableListItemAction';
import { withSize } from 'react-sizeme';
import { ClickAwayListener } from '@material-ui/core';

const swipeLeftThreshold = 64 * 1.5; // Todo Make these aware of their Children Sizes.
const swipeRightThreshold = 64 * 1.5;
const transitionDuration = 250;

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
            isSwiping: false,
            leftOffset: 0,
            isLeftOpen: false,
            rightOffset: 0,
            isRightOpen: false,
        }

        // Refs.
        this.childrenContainerRef = React.createRef();

        // Method Bindings.
        this.handleSwipingLeft = this.handleSwipingLeft.bind(this);
        this.handleSwipingRight = this.handleSwipingRight.bind(this);
        this.handleSwiped = this.handleSwiped.bind(this);
        this.processActions = this.processActions.bind(this);
        this.reset = this.reset.bind(this);
    }
    
    render() {
        let capturedWidth = 
        this.state.isSwiping ||
         this.state.leftOffset > 0 ||
          this.state.rightOffset > 0 ?
           this.props.size.width :
            'unset'; // Capture the Width at Drag start and set it here. 
                    // This stops the Text flowing downards as it its width is squeezed

        let container = {
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `[LeftActions]auto [Children]1fr [RightActions]auto`,
            width: capturedWidth,
            overflowX: 'hidden', // With Width set above, container will crop the child, stopping the Document Width increasing.
        }

        let leftActionsContainer = {
            gridColumn: 'LeftActions',
            width: `${this.state.leftOffset}px`,
            overflowX: 'hidden',
            transition: this.state.isSwiping ? 'unset' : `width ${transitionDuration}ms, margin-left ${transitionDuration}ms`,
            marginLeft: `${this.state.rightOffset * -1}px`,

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        }

        let childrenContainer = {
            gridColumn: 'Children',
            transform: 'scaleX(1)',
            width: capturedWidth,
            marginLeft: `${this.state.rightOffset * -1}px`,
            transition:  this.state.isSwiping ? 'unset' : `margin-left ${transitionDuration}ms`,
        }

        let rightActionsContainer = {
            gridColumn: 'RightActions',
            width: `${this.state.rightOffset}px`,
            overflowX: 'hidden',
            transition: this.state.isSwiping ? 'unset' : `width ${transitionDuration}ms`,

            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        }

        return (
            <ClickAwayListener
                touchEvent="onTouchStart"
                onClickAway={() => { this.reset() }}>
                <div style={container}>
                    <div style={leftActionsContainer}>
                        {this.processActions(this.props.leftActions)}
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
                        {this.processActions(this.props.rightActions)}
                    </div>
                </div>
            </ClickAwayListener>
        );
    }

    reset() {
        this.setState({
            isSwiping: false,
            isLeftOpen: false,
            isRightOpen: false,
            leftOffset: 0.1,
            rightOffset: 0.1,
        })

        // Wait for animation to finish.
        setTimeout( () => {
            this.setState({
                leftOffset: 0,
                rightOffset: 0,
            })
        }, transitionDuration)

    }

    handleActionClick(value) {
        this.reset();
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
        if ( !this.state.isLeftOpen && !this.state.isRightOpen) {
            // Threshold was not acheived.
            this.reset();
        }

        else {
            this.setState({ isSwiping: false });
        }
    }

    handleSwipingLeft(e, deltaX) {
        if (deltaX > swipeLeftThreshold) {
            // Threshold Acheived.
            this.setState({
                isSwiping: false,
                rightOffset: 64, // TODO: Measure children and set this accordingly.
                isRightOpen: true,
                leftOffset: 0,
                isLeftOpen: false,
            })
        }

        else {
            // Keep sliding open.
            let baseUpdate = {
                isSwiping: true,
                rightOffset: deltaX,
            }

            // Start closing the Left Action if it's open.
            let optionalUpdate = {};
            if (this.state.isLeftOpen === true) {
                let leftOffset = this.state.leftOffset - deltaX;
                leftOffset = leftOffset > 0 ? leftOffset : 0;
                optionalUpdate.leftOffset = leftOffset;

                if (leftOffset === 0) {
                    optionalUpdate.isLeftOpen = false;
                }
            }

            this.setState({
                ...baseUpdate,
                ...optionalUpdate,
            })
        }
    }

    handleSwipingRight(e, deltaX) {
        if (deltaX > swipeRightThreshold) {
            // Threshold Acheived.
            this.setState({
                isSwiping: false,
                leftOffset: 64, // TODO: Measure children and set this accordingly.
                isLeftOpen: true,
            })
        }

        else {
            // Keep sliding open.
            let baseUpdate = {
                isSwiping: true,
                leftOffset: deltaX,
            }

            // Start closing the Right Action if it's open.
            let optionalUpdate = {};
            if (this.state.isRightOpen === true ) {
                let rightOffset = this.state.rightOffset - deltaX;
                rightOffset = rightOffset > 0 ? rightOffset : 0;
                optionalUpdate.rightOffset = rightOffset;

                if (rightOffset === 0) {
                    optionalUpdate.isRightOpen = false;
                }
            }

            this.setState({
                ...baseUpdate,
                ...optionalUpdate,
            })
        }
    }
}

export default withSize()(SwipeableListItem);