import React from 'react';
import CenteringContainer from '../../containers/CenteringContainer';
import HorizontalCenteringContainer from '../../containers/HorizontalCenteringContainer';
import '../../assets/css/AppSettingsMenu/AboutPage.css';
import AppIcon from '../../assets/icons/Handball-Icon-Desktop-Draft.svg'
import GitHubMark from '../../assets/icons/GitHubMark.svg';

class AboutPage extends React.Component {
    render() {
        const appVersion = "2.0.2 RC";

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
                            www.github.com/Charlie9830/Pounder/issues
                        </div>

                        <div className="AboutPageGithubMarkContainer" onClick={this.handleGitHubMarkClick}>
                            <img className="AboutPageGithubMark" src={GitHubMark}/>
                        </div>
                    </div>
                </CenteringContainer>
            </div>
        )
    }
}

export default AboutPage;