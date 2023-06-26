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
import { FormattedMessage, useIntl } from 'react-intl';
import { setCookie } from 'helpers/cookies';

const Header: React.FC = () => {
  const intl = useIntl();

  const { currTheme, selectLang, selectTheme, locale, languages } =
    useContext(Context);

  return (
    <Container id="header">
      <TitleContainer
        onClick={() => {
          window.location.href = '/overwatch-competitive-tool';
        }}
      >
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
          href="/overwatch-competitive-tool/sorter"
          current={window.location.pathname === '/sorter'}
        >
          <FormattedMessage id="app.tools.teamSorter.title" />
        </RouteLink>
        <RouteLink
          tabIndex={2}
          href="/overwatch-competitive-tool/overlay"
          current={window.location.pathname === '/overlay'}
        >
          <FormattedMessage id="app.tools.overlay.title" />
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
          {Object.keys(languages).map((lang) => (
            <option value={lang} selected={locale === lang}>
              {languages[lang].name}
            </option>
          ))}
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
