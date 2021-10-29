import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { OverrideMaterialUICss } from 'override-material-ui-css';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <OverrideMaterialUICss>
      <App />
    </OverrideMaterialUICss>
  </Provider>,
  document.getElementById('root'),
);
