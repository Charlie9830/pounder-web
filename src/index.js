import '@babel/polyfill'; // Stops renerator runtime error when using async/await.
import React from 'react';
import ReactDOM from 'react-dom';
import VisibleApp from './components/App';
import { Provider } from 'react-redux';
import { setupBackend ,appStore } from 'handball-libs/libs/pounder-redux';
import registerServiceWorker from './registerServiceWorker';

import { createMuiTheme, MuiThemeProvider }  from '@material-ui/core/styles';
import PrimaryColor from '@material-ui/core/colors/orange';
import SecondaryColor from '@material-ui/core/colors/indigo';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line
    const handballVersion = HANDBALL_VERSION;
    const { detect } = require('detect-browser');
    const browser = detect();
    var browserName = "Unknown";
    if (browser) { browserName = browser.name + " " + browser.version; }

    var Rollbar = require("rollbar");
    var rollbar = new Rollbar({
        accessToken: '9ec475a3202f424f942fbc3d02a3e7c6',
        captureUncaught: true,
        captureUnhandledRejections: true,
    });

    rollbar.configure({
        codeVersion: handballVersion,
        captureIp: false,
        payload: {
            environment: "production",
            platform: browserName,
        }
    })
}

const onUpdateAvailable = () => {
    alert("A new update is available. Please reload the App to upgrade.");
}

require('typeface-open-sans');

setupBackend("development", "mobile");

let theme = createMuiTheme({
    'palette': {
        'primary': PrimaryColor,
        'secondary': SecondaryColor,
        'type': 'dark',
        'background': {
            'default': "rgb(30,30,30)",
            'paper': 'rgb(42,42,42)'
        },
        'custom': {
            "today": '#1455c0',
            "soon": '#FF9300',
            "overdue": '#F00',
            "later": '#22B30B',
            "unreadItem": '#1455c0',
        }
    }
})

ReactDOM.render(
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider store={appStore}>
            <MuiThemeProvider theme={theme}>
                <VisibleApp />
            </MuiThemeProvider>
        </Provider>
    </MuiPickersUtilsProvider>,
    document.getElementById('root'));
registerServiceWorker(onUpdateAvailable);