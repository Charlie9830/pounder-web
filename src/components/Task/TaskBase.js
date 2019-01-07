import React, { Component } from 'react';

let ContainerGridStyle = {
    width: '100%',
    height: 'fit-content',
    display: 'grid',
    gridTemplateRows: '[Content]1fr [IndicatorPanel]auto',
    gridTemplateColumns: '[PriorityIndicator]auto [Checkbox]auto [Text]1fr [DueDate]auto',
    gridTemplateAreas: `'PriorityIndicator Checkbox       Text           DueDate'
                        'PriorityIndicator IndicatorPanel IndicatorPanel IndicatorPanel'`
}

class TaskBase extends Component {
    render() {
        return (
            <div style={ContainerGridStyle}>
                {/* Priority Indicator  */} 
                <div style={{gridArea: 'PriorityIndicator'}}>
                    { this.props.priorityIndicator }
                </div>

                {/* Checkbox  */} 
                <div style={{gridArea: 'Checkbox', placeSelf: 'center'}}>
                    { this.props.checkbox }
                </div>

                {/* Text  */}
                <div style={{gridArea: 'Text', placeSelf: 'center flex-start'}}>
                    { this.props.taskText }
                </div> 

                {/* DueDate  */}
                <div style={{gridArea: 'DueDate', placeSelf: 'center'}}>
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