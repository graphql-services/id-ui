import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'es6-shim';
import './env';
import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
