import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { OverrideMaterialUICss } from 'override-material-ui-css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <OverrideMaterialUICss>
      <App />
    </OverrideMaterialUICss>
  </React.StrictMode>,
  document.getElementById('root'),
);
