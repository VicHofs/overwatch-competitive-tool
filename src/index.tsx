import React from 'react';
import ReactDOM from 'react-dom';

import DataWrapper from 'components/DataWrapper';

import Routes from 'routes';
import Header from 'components/Header';

ReactDOM.render(
  <React.StrictMode>
    <DataWrapper>
      <Header />
      <Routes />
    </DataWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
);
