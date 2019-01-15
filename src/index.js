import '@babel/polyfill'; // Stops renerator runtime error when using async/await.
import React from 'react';
import ReactDOM from 'react-dom';
import VisibleApp from './components/App';
import { Provider } from 'react-redux';
import { setupBackend ,appStore } from 'handball-libs/libs/pounder-redux';
import registerServiceWorker from './registerServiceWorker';
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

ReactDOM.render(
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider store={appStore}>
                <VisibleApp />
        </Provider>
    </MuiPickersUtilsProvider>,
    document.getElementById('root'));
registerServiceWorker(onUpdateAvailable);