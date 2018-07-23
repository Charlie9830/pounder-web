import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import VisibleApp from './components/App';
import { Provider } from 'react-redux';
import { setupBackend ,appStore } from 'pounder-redux';
import registerServiceWorker from './registerServiceWorker';

const onUpdateAvailable = () => {
    alert("A new update is available. Please reload the App to upgrade.");
}

require('typeface-open-sans');

setupBackend("development", "mobile");

ReactDOM.render(<Provider store={appStore}><VisibleApp /></Provider>, document.getElementById('root'));
registerServiceWorker(onUpdateAvailable);