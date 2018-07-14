import React from 'react';
import GeneralSettingsPage from './GeneralSettingsPage';
import AccountSettingsPage from './AccountSettingsPage';
import AppSettingsSidebar from './AppSettingsSidebar';
import MenuHeader from '../MenuHeader';
import '../../assets/css/AppSettingsMenu/AppSettingsMenu.css';
import '../../assets/css/ToolBarButton.css';
import { connect } from 'react-redux';
import { setAppSettingsMenuPage, setFavouriteProjectIdAsync,
    setCSSConfigAsync, setMessageBox, 
    setGeneralConfigAsync, setIsAppSettingsOpen, setAllColorsToDefaultAsync,
    logInUserAsync, logOutUserAsync, registerNewUserAsync, postSnackbarMessage, unsubscribeFromDatabaseAsync,
    subscribeToDatabaseAsync, selectProject, sendPasswordResetEmailAsync, setAuthStatusMessage } from 'pounder-redux/action-creators';
import { MessageBoxTypes } from 'pounder-redux';


class AppSettingsMenu extends React.Component {
    constructor(props) {
        super(props);

        // State.
        this.state = {
            openColorPickerIndex: -1,
        }


        // Method Bindings.
        this.getPageJSX = this.getPageJSX.bind(this);
        this.handleSidebarItemClick = this.handleSidebarItemClick.bind(this);
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
        this.handleFavouriteProjectSelectChange = this.handleFavouriteProjectSelectChange.bind(this);
        this.handleCSSPropertyChange = this.handleCSSPropertyChange.bind(this);
        this.handleColorPickerCloseButtonClick = this.handleColorPickerCloseButtonClick.bind(this);
        this.handleDefaultAllColorsButtonClick = this.handleDefaultAllColorsButtonClick.bind(this);
        this.handleAppSettingsMenuContainerClick = this.handleAppSettingsMenuContainerClick.bind(this);
        this.handleColorPickerClick = this.handleColorPickerClick.bind(this);
        this.handleRegisterButtonClick = this.handleRegisterButtonClick.bind(this);
        this.handleDisableAnimationsChange = this.handleDisableAnimationsChange.bind(this);
        this.handlePasswordResetButtonClick = this.handlePasswordResetButtonClick.bind(this);
        this.handleIsFirstTimeBootChange = this.handleIsFirstTimeBootChange.bind(this);
    }

    componentDidMount() {
    }

    render() {
        var contentsJSX = this.getPageJSX()
        
        return (
            <div>
                <div className="AppSettingsMenuContainer" onClick={this.handleAppSettingsMenuContainerClick}>
                    <MenuHeader onBackButtonClick={() => {this.props.dispatch(setIsAppSettingsOpen(false))}}/>
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

    handleAppSettingsMenuContainerClick() {
        // Close Color Picker if it's open.
        if (this.state.openColorPickerIndex !== -1) {
            this.setState({openColorPickerIndex: -1});
        }
    }
    

    handleCSSPropertyChange(propertyName, value) {
        var newConfig = {...this.props.cssConfig};
        newConfig[propertyName] = value;

        this.props.dispatch(setCSSConfigAsync(newConfig));
    }

    handleColorPickerCloseButtonClick() {
        // Close Color Picker.
        this.setState({ openColorPickerIndex: -1 });
    }

    handleOkButtonClick() {
        this.props.dispatch(setIsAppSettingsOpen(false));
    }

    handleRegisterButtonClick(email, password, displayName) {
        this.props.dispatch(registerNewUserAsync(email, password, displayName));
    }

    getPageJSX() {
        var menuPage = this.props.menuPage === "" ? "general" : this.props.menuPage;

        switch(menuPage) {
            case "general":
                return (
                    <GeneralSettingsPage projects={this.props.projects} generalConfig={this.props.generalConfig}
                    onStartInFullscreenChange={this.handleStartInFullscreenChange} onStartLockedChange={this.handleStartLockedChange}
                    onFavouriteProjectSelectChange={this.handleFavouriteProjectSelectChange} accountConfig={this.props.accountConfig}
                    cssConfig={this.props.cssConfig} onCSSPropertyChange={this.handleCSSPropertyChange}
                    onColorPickerClick={this.handleColorPickerClick} openColorPickerIndex={this.state.openColorPickerIndex}
                    onColorPickerCloseButtonClick={this.handleColorPickerCloseButtonClick}
                    onDefaultAllColorsButtonClick={this.handleDefaultAllColorsButtonClick}
                    onDisableAnimationsChange={this.handleDisableAnimationsChange}
                    />
                )

            case "account":
                return (
                    <AccountSettingsPage authStatusMessage={this.props.authStatusMessage} isLoggingIn={this.props.isLoggingIn}
                    isLoggedIn={this.props.isLoggedIn} userEmail={this.props.userEmail}
                    onLogInButtonClick={(email, password) => {this.props.dispatch(logInUserAsync(email,password))}}
                    onLogOutButtonClick={() => {this.props.dispatch(logOutUserAsync())}} displayName={this.props.displayName}
                    onPasswordResetButtonClick={this.handlePasswordResetButtonClick} 
                    isFirstTimeBoot={this.props.generalConfig.isFirstTimeBoot} onIsFirstTimeBootChange={this.handleIsFirstTimeBootChange}
                    />
                )

            default: 
                return (<div/>)
        }
    }

    handleIsFirstTimeBootChange(value) {
        var generalConfig = this.props.generalConfig;
        generalConfig.isFirstTimeBoot = false;
        this.props.dispatch(setGeneralConfigAsync(generalConfig));
    }

    handlePasswordResetButtonClick() {
        this.props.dispatch(sendPasswordResetEmailAsync());
    }

    handleDisableAnimationsChange(newValue) {
        this.props.dispatch(setGeneralConfigAsync({...this.props.generalConfig, disableAnimations: newValue}));
    }

    handleDefaultAllColorsButtonClick() {
        this.props.dispatch(setMessageBox(true, "Are you Sure? A restart will be required to apply changes.", MessageBoxTypes.STANDARD,
            null, result => {
                if (result === "ok") {
                    this.props.dispatch(setMessageBox({}));
                    this.props.dispatch(setAllColorsToDefaultAsync());
                }

                else {
                    this.props.dispatch(setMessageBox({}));
                }
            }))
    }

    handleColorPickerClick(index) {
        this.setState({openColorPickerIndex: index});
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
        displayName: state.displayName,
    }
}

let VisibleAppSettingsMenu = connect(mapStateToProps)(AppSettingsMenu);

export default VisibleAppSettingsMenu;