import React from 'react';
import CenteringContainer from '../../containers/CenteringContainer';
import HorizontalCenteringContainer from '../../containers/HorizontalCenteringContainer';
import Button from '../Button';
import '../../assets/css/AppSettingsMenu/AboutPage.css';
import AppIcon from '../../assets/icons/Handball-Icon-Desktop-Draft.svg'
let dependencyVersions = [
    { name: "handball-libs", value: require('handball-libs/package.json').version },
]

// eslint-disable-next-line
const appVersion = HANDBALL_VERSION;

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
            <div className="AboutPageContainer">
                <CenteringContainer>
                    <div className="AboutPageAppInfoContainer">
                        <img className="AboutPageAppIcon" src={AppIcon}
                        onDoubleClick={() => {this.setState({showDependencyVersionInfo: true})}} />
                        <div className="AboutPageAppTitle"> Handball </div>
                        <div className="AboutPageVersionNumber"> Version {appVersion} </div>
                        <div className="AboutPageAuthor"> Charlie Hall </div>
                        
                        <div className="AboutPageDivider"/>
                        {dependencyJSX}

                    </div>

                    <div className="AboutPageDivider"/>

                    <div className="AboutPageContactContainer">
                        <div className="AboutPageContactText">
                            To report bugs, suggest features or join the development team visit
                        </div>
                        <div className="AboutPageContactText">
                            {this.props.issuesURL}
                        </div>
                    </div>
                </CenteringContainer>
            </div>
        )
    }

    getDependencyJSX() {
        if (this.state.showDependencyVersionInfo) {
            var jsx = dependencyVersions.map((item,index) => {
                return (
                    <HorizontalCenteringContainer key={index}>
                        <div className="AboutPageSystemValue"> {item.name} : {item.value} </div>
                    </HorizontalCenteringContainer>
                )
            })
    
            return (
                <div className="AboutPageSystemValueContainer">
                    {jsx}
                </div>
            )
        }
    }
}

export default AboutPage;