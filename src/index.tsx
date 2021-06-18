import React from 'react';
import ReactDOM from 'react-dom';

import DataWrapper from 'components/DataWrapper';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <DataWrapper>
      <App />
    </DataWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
);
