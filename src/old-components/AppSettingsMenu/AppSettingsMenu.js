import React from 'react';
import GeneralSettingsPage from './GeneralSettingsPage';
import AccountSettingsPage from './AccountSettingsPage';
import AboutPage from './AboutPage';
import AppSettingsSidebar from './AppSettingsSidebar';
import MenuHeader from '../MenuHeader';
import '../../assets/css/AppSettingsMenu/AppSettingsMenu.css';
import '../../assets/css/ToolBarButton.css';
import { connect } from 'react-redux';
import { setAppSettingsMenuPage, setFavouriteProjectIdAsync,
    setCSSConfigAsync, setMessageBox, 
    setGeneralConfigAsync, setIsAppSettingsOpen, setAllColorsToDefaultAsync,
    logInUserAsync, logOutUserAsync, registerNewUserAsync, postSnackbarMessage, unsubscribeFromDatabaseAsync,
    subscribeToDatabaseAsync, selectProject, sendPasswordResetEmailAsync, setAuthStatusMessage,
    setIsInRegisterMode } from 'handball-libs/libs/pounder-redux/action-creators';
import { MessageBoxTypes } from 'handball-libs/libs/pounder-redux';

import { AppBar, IconButton, Typography, Grid, Toolbar, Tabs, Tab, TabContainer } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const issuesURL = "https://www.github.com/Charlie9830/Pounder/issues";

class AppSettingsMenu extends React.Component {
    constructor(props) {
        super(props);

        // State.
        this.state = {
            openColorPickerIndex: -1,
        }

        // Refs
        this.menuContentContainerRef = React.createRef();

        // Method Bindings.
        this.getPageJSX = this.getPageJSX.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
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
        this.handleRegisterModeChanged = this.handleRegisterModeChanged.bind(this);
        this.handleSortProjectsBySelectorChange = this.handleSortProjectsBySelectorChange.bind(this);
        this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.openColorPickerIndex !== this.state.openColorPickerIndex) {
            if (this.state.openColorPickerIndex === -1) {
                // Color Picker is closing. Reset Scroll Postion.
                this.menuContentContainerRef.current.scrollTop = this.scrollPositionBuffer;
                this.scrollPositionBuffer = 0;
            }
        }
    }

    render() {
        var contentsJSX = this.getPageJSX()
        
        return (
            <Grid container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            style={{width: '100vw', height: '100vh'}}>

                <Grid item>
                    <AppBar position="sticky">
                        <Toolbar>
                            <IconButton onClick={this.handleBackArrowClick}>
                                <ArrowBackIcon />
                            </IconButton>

                            <Typography variant="h6">
                                Settings
                            </Typography>
                        </Toolbar>
                        <Tabs fullWidth indicatorColor="secondary" value={this.props.menuPage} onChange={this.handleTabChange}>
                            <Tab label="General" value="general" />
                            <Tab label="Account" value="account" />
                            <Tab label="About" value="about" />
                        </Tabs>
                    </AppBar>
            </Grid>
            
            <Grid item>
                {contentsJSX}
            </Grid>
                
            </Grid>
                
        )
    }

    handleBackArrowClick() {
        this.props.dispatch(setIsAppSettingsOpen(false));
    }

    handleRegisterModeChanged(newValue) {
        this.props.dispatch(setIsInRegisterMode(newValue));
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
                    onSortProjectsBySelectorChange={this.handleSortProjectsBySelectorChange}/>
                )

            case "account":
                return (
                    <AccountSettingsPage authStatusMessage={this.props.authStatusMessage} isLoggingIn={this.props.isLoggingIn}
                    isLoggedIn={this.props.isLoggedIn} userEmail={this.props.userEmail}
                    onLogInButtonClick={(email, password) => {this.props.dispatch(logInUserAsync(email,password))}}
                    onLogOutButtonClick={() => {this.props.dispatch(logOutUserAsync())}} displayName={this.props.displayName}
                    onRegisterButtonClick={this.handleRegisterButtonClick}
                    onPasswordResetButtonClick={this.handlePasswordResetButtonClick} 
                    isInRegisterMode={this.props.isInRegisterMode} onRegisterModeChanged={this.handleRegisterModeChanged}
                    />
                )
            case "about":
            return (
                <AboutPage issuesURL={issuesURL}/>
            )

            default: 
                return (<div/>)
        }
    }

    handleSortProjectsBySelectorChange(newValue) {
        this.props.dispatch(setGeneralConfigAsync({...this.props.generalConfig, sortProjectsBy: newValue}))
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
        var scrollPosition = this.menuContentContainerRef.current.scrollTop;
        this.scrollPositionBuffer = scrollPosition;
        this.setState({
            openColorPickerIndex: index,
        });
    }
    handleFavouriteProjectSelectChange(projectId) {
        this.props.dispatch(setFavouriteProjectIdAsync(projectId));
    }

    handleTabChange(event, value) {
        this.props.dispatch(setAppSettingsMenuPage(value));
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
        isInRegisterMode: state.isInRegisterMode,
    }
}

let VisibleAppSettingsMenu = connect(mapStateToProps)(AppSettingsMenu);

export default VisibleAppSettingsMenu;