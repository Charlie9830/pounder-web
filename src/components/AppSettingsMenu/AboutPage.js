import React from 'react';
import CenteringContainer from '../../containers/CenteringContainer';
import HorizontalCenteringContainer from '../../containers/HorizontalCenteringContainer';
import '../../assets/css/AppSettingsMenu/AboutPage.css';
import AppIcon from '../../assets/icons/Handball-Icon-Desktop-Draft.svg'

import { Grid, Typography, Button } from '@material-ui/core';

let dependencyVersions = [
    { name: "handball-libs", value: require('handball-libs/package.json').version },
]

// eslint-disable-next-line
const appVersion = HANDBALL_VERSION;

let AppIconComponent = (props) => {
    let style = {
        flex: 1,
        width: '96px',
        height: '96px',
        marginTop: '32px',
        marginBottom: '32px',
    }
    return (
        <img style={style} src={AppIcon}/>
    )
}

class AboutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDependencyVersionInfo: false,
        }

        // Method Bindings.
        this.getDependencyJSX = this.getDependencyJSX.bind(this);
    }
    render() {
        var dependencyJSX = this.getDependencyJSX();

        return (
            <Grid container
            direction="column"
            justify="center"
            alignItems="center">

                <Grid item onClick={() => {this.setState({showDependencyVersionInfo: !this.state.showDependencyVersionInfo})}}>
                    <AppIconComponent/>
                </Grid>
                

                <Typography color="textPrimary" variant="h6"> Handball </Typography>
                <Typography color="textSecondary"> Version {appVersion} </Typography>
                <Typography color="textSecondary"> Charlie Hall </Typography>

                {dependencyJSX}
                
                <Grid container
                direction="column"
                justify="flex-end"
                alignItems="center"
                style={{marginTop: '32px'}}>
                    <Typography color="textSecondary"> To report bugs or suggest features visit </Typography>
                    <Typography color="textPrimary"> {this.props.issuesURL} </Typography>
                </Grid>

            </Grid>
        )
    }

    // <div className="AboutPageContainer">
    //             <CenteringContainer>
    //                 <div className="AboutPageAppInfoContainer">
    //                     <img className="AboutPageAppIcon" src={AppIcon}
    //                     onDoubleClick={() => {this.setState({showDependencyVersionInfo: true})}} />
    //                     <div className="AboutPageAppTitle"> Handball </div>
    //                     <div className="AboutPageVersionNumber"> Version {appVersion} </div>
    //                     <div className="AboutPageAuthor"> Charlie Hall </div>
                        
    //                     <div className="AboutPageDivider"/>
    //                     {dependencyJSX}

    //                 </div>

    //                 <div className="AboutPageDivider"/>

    //                 <div className="AboutPageContactContainer">
    //                     <div className="AboutPageContactText">
    //                         To report bugs, suggest features or join the development team visit
    //                     </div>
    //                     <div className="AboutPageContactText">
    //                         {this.props.issuesURL}
    //                     </div>
    //                 </div>
    //             </CenteringContainer>
    //         </div>

    getDependencyJSX() {
        if (this.state.showDependencyVersionInfo) {
            var jsx = dependencyVersions.map((item,index) => {
                return (
                    <Typography key={index}> {item.name} : {item.value} </Typography>
                )
            })
    
            return (
                <Grid item style={{marginTop: '24px'}}>
                    {jsx}
                </Grid>    
            )
        }
    }
}

export default AboutPage;