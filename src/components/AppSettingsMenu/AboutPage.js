import React from 'react';
import CenteringContainer from '../../containers/CenteringContainer';
import Button from '../Button';
import '../../assets/css/AppSettingsMenu/AboutPage.css';
import AppIcon from '../../assets/icons/Handball-Icon-Desktop-Draft.svg'

// eslint-disable-next-line
const appVersion = HANDBALL_VERSION;

class AboutPage extends React.Component {

    render() {
        return (
            <div className="AboutPageContainer">
                <CenteringContainer>
                    <div className="AboutPageAppInfoContainer">
                        <img className="AboutPageAppIcon" src={AppIcon} />
                        <div className="AboutPageAppTitle"> Handball </div>
                        <div className="AboutPageVersionNumber"> Version {appVersion} </div>
                        <div className="AboutPageAuthor"> Charlie Hall </div>
                        
                        <div className="AboutPageDivider"/>

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
}

export default AboutPage;