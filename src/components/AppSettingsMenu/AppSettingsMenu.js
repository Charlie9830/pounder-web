import React from 'react';
import GeneralSettingsPage from './GeneralSettingsPage';
import AccountSettingsPage from './AccountSettingsPage';
import AboutPage from './AboutPage';
import { connect } from 'react-redux';
import { setAppSettingsMenuPage, setFavouriteProjectIdAsync, setGeneralConfigAsync,
    setIsAppSettingsOpen, logInUserAsync, logOutUserAsync, registerNewUserAsync,
    sendPasswordResetEmailAsync, setIsInRegisterMode } from 'handball-libs/libs/pounder-redux/action-creators';

import { AppBar, IconButton, Typography, Grid, Toolbar, Tabs, Tab } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FullScreenView from '../../layout-components/FullScreenView';

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
        this.handleFavouriteProjectSelectChange = this.handleFavouriteProjectSelectChange.bind(this);
        this.handleRegisterButtonClick = this.handleRegisterButtonClick.bind(this);
        this.handlePasswordResetButtonClick = this.handlePasswordResetButtonClick.bind(this);
        this.handleRegisterModeChanged = this.handleRegisterModeChanged.bind(this);
        this.handleSortProjectsBySelectorChange = this.handleSortProjectsBySelectorChange.bind(this);
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
            <FullScreenView>

                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                    style={{ width: '100%', height: '100%' }}>

                    <Grid item>
                        <AppBar position="sticky">
                            <Toolbar
                            disableGutters={true}>
                                <IconButton
                                    onClick={() => { this.props.dispatch(setIsAppSettingsOpen(false)) }}>
                                    <ArrowBackIcon />
                                </IconButton>

                                <Typography variant="h6">
                                    Settings
                            </Typography>
                            </Toolbar>
                            <Tabs
                                variant="fullWidth"
                                value={this.props.menuPage}
                                onChange={(e, newValue) => { this.props.dispatch(setAppSettingsMenuPage(newValue)) }}>
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
            </FullScreenView>
                
        )
    }

    handleRegisterModeChanged(newValue) {
        this.props.dispatch(setIsInRegisterMode(newValue));
    }    

    handleRegisterButtonClick(email, password, displayName) {
        this.props.dispatch(registerNewUserAsync(email, password, displayName));
    }

    getPageJSX() {
        var menuPage = this.props.menuPage === "" ? "general" : this.props.menuPage;

        switch(menuPage) {
            case "general":
                return (
                    <GeneralSettingsPage 
                    projects={this.props.projects}
                    generalConfig={this.props.generalConfig}
                    onFavouriteProjectSelectChange={this.handleFavouriteProjectSelectChange}
                    accountConfig={this.props.accountConfig}
                    onSortProjectsBySelectorChange={this.handleSortProjectsBySelectorChange}
                    />
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

    handleFavouriteProjectSelectChange(projectId) {
        this.props.dispatch(setFavouriteProjectIdAsync(projectId));
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