import React, { useContext } from 'react';
import { Container, TitleContainer, ToolContainer } from './styles';
import { Context } from 'components/DataWrapper';

import OverwatchLogo from 'assets/images/OverwatchLogoLight.svg';
import DarkOverwatchLogo from 'assets/images/OverwatchLogoDark.svg';
import { GiEarthAmerica } from 'react-icons/gi';

const Header: React.FC = () => {
  const { currTheme, selectLang, selectTheme } = useContext(Context);
  return (
    <Container>
      <TitleContainer>
        <img
          src={currTheme.title === 'light' ? DarkOverwatchLogo : OverwatchLogo}
          alt="Overwatch Logo"
        />
        <h1>Competitive Tool</h1>
      </TitleContainer>
      <ToolContainer>
        <select name="language" id="langSelect" onChange={(e) => selectLang(e)}>
          <option value="en-US">English (US)</option>
          <option value="pt-BR">Português (BR)</option>
        </select>
        <GiEarthAmerica size={18} style={{ marginLeft: 20 }} />
        <select name="theme" id="themeSelect" onChange={(e) => selectTheme(e)}>
          <option value="light">Light theme</option>
          <option value="dark">Dark theme</option>
        </select>
      </ToolContainer>
    </Container>
  );
};

export default Header;
