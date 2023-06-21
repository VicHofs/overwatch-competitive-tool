import React from 'react';
import ReactDOM from 'react-dom';

import DataWrapper from 'components/DataWrapper';

import App from './App';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <React.StrictMode>
    <DataWrapper>
      <Toaster />
      <App />
    </DataWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
);
