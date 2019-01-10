import React, { Component } from 'react';
import Hammer from 'hammerjs';

let ContainerGridStyle = {
    width: '100%',
    height: 'fit-content',
    display: 'grid',
    gridTemplateRows: '[Content]1fr [IndicatorPanel]auto',
    gridTemplateColumns: '[PriorityIndicator]auto [Checkbox]auto [Text]1fr [DueDate]auto',
    gridTemplateAreas: `'PriorityIndicator Checkbox       Text           DueDate'
                        'PriorityIndicator IndicatorPanel IndicatorPanel IndicatorPanel'`
}

let TextContainerStyle = {
    gridArea: 'Text',
    placeSelf: 'center flex-start',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
}

class TaskBase extends Component {
    constructor(props) {
        super(props);
        
        // Refs.
        this.textContainerRef = React.createRef();
        this.dueDateContainerRef = React.createRef();
    }

    componentDidMount() {
        let textContainerHammer = new Hammer(this.textContainerRef.current);
        textContainerHammer.on('tap', event => {
            this.props.onTextContainerTap();
        })

        let dueDateContainerHammer = new Hammer(this.dueDateContainerRef.current);
        dueDateContainerHammer.on('tap', event => {
            this.props.onDueDateContainerTap();
        })
    }
    
    
    render() {
        return (
            <div style={ContainerGridStyle}>
                {/* Priority Indicator  */} 
                <div style={{gridArea: 'PriorityIndicator'}}>
                    { this.props.priorityIndicator }
                </div>

                {/* Checkbox  */} 
                <div
                style={{gridArea: 'Checkbox', placeSelf: 'center'}}>
                    { this.props.checkbox }
                </div>

                {/* Text  */}
                <div ref={this.textContainerRef}
                 style={TextContainerStyle}>
                    { this.props.taskText }
                </div> 

                {/* DueDate  */}
                <div ref={this.dueDateContainerRef}
                style={{gridArea: 'DueDate', placeSelf: 'center'}}>
                    { this.props.dueDate }
                </div>
                
                {/* Indicator Panel  */}
                <div style={{gridArea: 'IndicatorPanel'}}>
                    { this.props.indicatorPanel }
                </div> 

            </div>
        );
    }
}

export default TaskBase;