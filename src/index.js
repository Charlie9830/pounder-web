import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import VisibleApp from './components/App';
import { Provider } from 'react-redux';
import { setupBackend ,appStore } from 'pounder-redux';
import registerServiceWorker from './registerServiceWorker';

setupBackend("production", "mobile");

ReactDOM.render(<Provider store={appStore}><VisibleApp /></Provider>, document.getElementById('root'));
registerServiceWorker();