import React from 'react';
import '../assets/css/ProjectSelector.css';
import Hammer from 'hammerjs';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NewCommentsIcon from '../assets/icons/NewCommentsIcon.svg';

import ReactSwipe from 'react-swipe';

import { ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon, Grid } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';

const DueDateColorLookup = {
        "today": '#1455c0',
        "soon": '#FF9300',
        "overdue": '#F00',
        "later": '#22B30B'
}

let DueDateIndicator = (props) => {
    if (props.count === 0) {
        return null;
    }

    let circleStyle = {
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        margin: '0px 2px',
        background: DueDateColorLookup[props.type]
    }

    let labelStyle = {
        fontSize: '12pt',
        color: 'white',
        lineHeight: '24px',
        margin: '0px auto',
        textAlign: 'center'
    }

    return (
        <div style={circleStyle}>
            <div style={labelStyle}>
                {props.count}
            </div>
        </div>
    ) 
}

let UnseenCommentsIndicator = (props) => {
    if (props.show === false) {
        return null;
    }

    return <CommentIcon fontSize="small"/>
}

class ProjectSelector extends React.Component {
    constructor(props) {
        super(props);

        this.hammer = {};

        // Refs.
        this.containerRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.getIndicatorsJSX = this.getIndicatorsJSX.bind(this);
        this.getHeartJSX = this.getHeartJSX.bind(this);
    }

    componentDidMount() {
    }


    componentWillUnmount() {
    }

    render(){
        var indicators = this.getIndicatorsJSX(this.props);
        var heartJSX = this.getHeartJSX();

        return (
            <ListItem selected={this.props.isSelected} onClick={this.handleClick}>
                {heartJSX}

                <ListItemText primary={this.props.projectName} />

                <ListItemSecondaryAction>
                    {indicators}
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    getHeartJSX() {
        if (this.props.isFavouriteProject) {
            return (
                <ListItemIcon>
                    <FavoriteIcon fontSize="small"/>
                </ListItemIcon>
            )
        }
    }
    
    getIndicatorsJSX(props) {
        // eslint-disable-next-line
        if (props.projectIndicators == undefined || props.projectIndicators == {}) {
            return null;
        }
        

        return (
            <Grid container
            direction="row"
            justify="flex-end"
            alignItems="center">
                <DueDateIndicator type="overdue" count={props.projectIndicators.reds}/>
                <DueDateIndicator type="today" count={props.projectIndicators.yellowReds}/>
                <DueDateIndicator type="soon" count={props.projectIndicators.yellows}/>
                <DueDateIndicator type="later" count={props.projectIndicators.greens}/>

                <UnseenCommentsIndicator show={props.projectIndicators.hasUnseenComments}/>
            </Grid>
        )
    }


    getHasUnseenCommentsIconJSX(props) {
        if (props.projectIndicators.hasUnseenComments) {
            return (
                <img className="ProjectSelectorCommentsIcon" src={NewCommentsIcon}/>
            )
        }
    }

    handleClick(e) {
        this.props.onClick(e, this.props.projectSelectorId);
    }

    handlePress(e) {
        this.props.onDoubleClick(e, this.props.projectSelectorId, this.props.projectName);
    }
}

export default withTheme()(ProjectSelector);