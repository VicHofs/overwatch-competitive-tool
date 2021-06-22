import React, { useContext, useEffect } from 'react';
import { Container, TitleContainer, ToolContainer } from './styles';
import { Context } from 'components/DataWrapper';

import OverwatchLogo from 'assets/images/OverwatchLogoLight.svg';
import DarkOverwatchLogo from 'assets/images/OverwatchLogoDark.svg';
import { GiEarthAmerica } from 'react-icons/gi';
import { FormattedMessage, useIntl } from 'react-intl';
import { setCookie } from 'helpers/cookies';

const Header: React.FC = () => {
  const intl = useIntl();

  const { currTheme, selectLang, selectTheme, locale } = useContext(Context);

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
        <select
          name="language"
          id="langSelect"
          onChange={(e) => {
            selectLang(e);
            setCookie('prefers-language', e.target.value);
          }}
        >
          <option value="en-US" selected={locale === 'en-US'}>
            English (US)
          </option>
          <option value="pt-BR" selected={locale === 'pt-BR'}>
            Português (BR)
          </option>
        </select>
        <GiEarthAmerica size={18} style={{ marginLeft: 20 }} />
        <select
          name="theme"
          id="themeSelect"
          onChange={(e) => {
            selectTheme(e);
            setCookie('prefers-theme', e.target.value);
          }}
        >
          <option value="light" selected={currTheme.title === 'light'}>
            {intl.formatMessage({
              id: 'app.themes.lightTheme',
              defaultMessage: 'Light Theme',
            })}
          </option>
          <option value="dark" selected={currTheme.title === 'dark'}>
            {intl.formatMessage({
              id: 'app.themes.darkTheme',
              defaultMessage: 'Dark Theme',
            })}
          </option>
        </select>
      </ToolContainer>
    </Container>
  );
};

export default Header;
