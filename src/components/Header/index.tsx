import React, { useContext } from 'react';
import {
  Container,
  TitleContainer,
  SettingsContainer,
  ToolsContainer,
  RouteLink,
} from './styles';
import { Context } from 'components/DataWrapper';

import OverwatchLogo from 'assets/images/OverwatchLogoLight.svg';
import DarkOverwatchLogo from 'assets/images/OverwatchLogoDark.svg';
import { GiEarthAmerica } from 'react-icons/gi';
import { useIntl } from 'react-intl';
import { setCookie } from 'helpers/cookies';

const Header: React.FC = () => {
  const intl = useIntl();

  const { currTheme, selectLang, selectTheme, locale } = useContext(Context);

  return (
    <Container id="header">
      <TitleContainer>
        <img
          src={currTheme.title === 'light' ? DarkOverwatchLogo : OverwatchLogo}
          alt="Overwatch Logo"
        />
        <h1 className="long">Competitive Tool</h1>
        <h1 className="short">CT</h1>
      </TitleContainer>
      <ToolsContainer>
        <RouteLink
          tabIndex={1} // tabIndex is currently necessary because of row-reverse to show settings correctly
          // TODO: rewrite without having to use tabIndex
          href="/sorter"
          current={window.location.pathname === '/sorter'}
        >
          Team Sorter
        </RouteLink>
        <RouteLink
          tabIndex={2}
          href="/overlay"
          current={window.location.pathname === '/overlay'}
        >
          Stream Overlay
        </RouteLink>
      </ToolsContainer>
      <SettingsContainer>
        <select
          tabIndex={3}
          title={intl.formatMessage({ id: 'app.language' })}
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
          tabIndex={4}
          title={intl.formatMessage({ id: 'app.theme' })}
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
      </SettingsContainer>
    </Container>
  );
};

export default Header;
