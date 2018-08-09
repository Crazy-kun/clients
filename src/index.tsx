import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import Store from './storage/store'

declare let module: any

ReactDOM.render(
  <Provider store={Store}>
    <App store={Store}/>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

if (module.hot) {
  module.hot.accept()
}