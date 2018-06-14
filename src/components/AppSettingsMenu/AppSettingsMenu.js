import React from 'react';
import Button from '../Button';
import GeneralSettingsPage from './GeneralSettingsPage';
import AccountSettingsPage from './AccountSettingsPage';
import AppSettingsSidebar from './AppSettingsSidebar';
import CenteringContainer from '../../containers/CenteringContainer';
import '../../assets/css/AppSettingsMenu/AppSettingsMenu.css';
import '../../assets/css/ToolBarButton.css';
import BackArrow from '../../assets/icons/BackArrow.svg';
import { connect } from 'react-redux';
import { setAppSettingsMenuPage, getDatabaseInfoAsync, purgeCompleteTasksAsync, setFavouriteProjectIdAsync,
         setCSSConfigAsync, setMessageBox, 
         setGeneralConfigAsync, setIsAppSettingsOpen, 
         logInUserAsync, logOutUserAsync } from 'pounder-redux/action-creators';
import { MessageBoxTypes } from 'pounder-redux';
import MessageBox from '../MessageBox';
import { getFirestore } from 'pounder-firebase';


class AppSettingsMenu extends React.Component {
    constructor(props) {
        super(props);

        // Method Bindings.
        this.getPageJSX = this.getPageJSX.bind(this);
        this.handleSidebarItemClick = this.handleSidebarItemClick.bind(this);
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
        this.handleFavouriteProjectSelectChange = this.handleFavouriteProjectSelectChange.bind(this);
        this.handleCSSPropertyChange = this.handleCSSPropertyChange.bind(this);
    }

    componentDidMount() {
    }

    render() {
        var contentsJSX = this.getPageJSX()

        return (
            <div>
                <div className="AppSettingsMenuContainer">
                    <div className="AppSettingsMenuHeader">
                        <div className="AppSettingsBackArrowContainer" onClick={() => {this.props.dispatch(setIsAppSettingsOpen(false))}}>
                            <img className="AppSettingsBackArrow" src={BackArrow}/>
                        </div>
                    </div>
                    <div className="AppSettingsMenuSidebarContentFlexContainer">
                        {/* Sidebar */}
                        <div className="AppSettingsMenuSidebarContainer">
                            <AppSettingsSidebar menuPage={this.props.menuPage} onItemClick={this.handleSidebarItemClick} />
                        </div>

                        {/* Content */}
                        <div className="AppSettingsMenuContentContainer">
                            {contentsJSX}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    

    handleCSSPropertyChange(propertyName, value) {
        var newConfig = {...this.props.cssConfig};
        newConfig[propertyName] = value;

        this.props.dispatch(setCSSConfigAsync(newConfig));
    }

    handleOkButtonClick() {
        this.props.dispatch(setIsAppSettingsOpen(false));
    }

    getPageJSX() {
        var menuPage = this.props.menuPage === "" ? "general" : this.props.menuPage;

        switch(menuPage) {
            case "general":
                return (
                    <GeneralSettingsPage projects={this.props.projects} generalConfig={this.props.generalConfig}
                    onStartInFullscreenChange={this.handleStartInFullscreenChange} onStartLockedChange={this.handleStartLockedChange}
                    onFavouriteProjectSelectChange={this.handleFavouriteProjectSelectChange} accountConfig={this.props.accountConfig}
                    cssConfig={this.props.cssConfig} onCSSPropertyChange={this.handleCSSPropertyChange}/>
                )
            break;

            case "account":
                return (
                    <AccountSettingsPage authStatusMessage={this.props.authStatusMessage} isLoggingIn={this.props.isLoggingIn}
                    isLoggedIn={this.props.isLoggedIn} userEmail={this.props.userEmail}
                    onLogInButtonClick={(email, password) => {this.props.dispatch(logInUserAsync(email,password))}}
                    onLogOutButtonClick={() => {this.props.dispatch(logOutUserAsync())}}/>
                )
            break;

            default: 
                return (<div/>)
        }
    }

    handleFavouriteProjectSelectChange(projectId) {
        this.props.dispatch(setFavouriteProjectIdAsync(projectId));
    }

    handleSidebarItemClick(itemName) {
        this.props.dispatch(setAppSettingsMenuPage(itemName));
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects,
        menuPage: state.appSettingsMenuPage,
        generalConfig: state.generalConfig,
        accountConfig: state.accountConfig,
        cssConfig: state.cssConfig,
        authStatusMessage: state.authStatusMessage,
        isLoggingIn: state.isLoggingIn,
        isLoggedIn: state.isLoggedIn,
        userEmail: state.userEmail,
    }
}

let VisibleAppSettingsMenu = connect(mapStateToProps)(AppSettingsMenu);

export default VisibleAppSettingsMenu;