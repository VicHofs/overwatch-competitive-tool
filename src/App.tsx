import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { AppContainer } from 'styles';
import Switch from 'routes/Switch';

const App: React.FC = () => {
  return (
    <AppContainer>
      <HashRouter>
        <Header />
        <Switch />
        <Footer />
      </HashRouter>
    </AppContainer>
  );
};

export default App;
