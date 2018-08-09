import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './storage/store'
import { App } from './components/App';
declare let module: any

ReactDOM.render(
    <App store={store} compiler="Typescript" framework="React" bundler="Webpack" />,
document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
}