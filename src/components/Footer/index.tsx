import React, { useMemo } from 'react';
import {
  Container,
  FooterLink,
  InfoContainer,
  LinksContainer,
  LogoContainer,
  SocialsContainer,
} from './styles';
import DynamicOWLogo from 'components/DynamicOWLogo';
import { useTheme } from 'styled-components';
import { Divider } from 'styles';

import {
  SiTwitter,
  SiGithub,
  SiLinkedin,
  SiTwitch,
  SiBuymeacoffee,
} from 'react-icons/si';
import { FormattedMessage } from 'react-intl';

const Footer: React.FC = () => {
  const theme = useTheme();
  const socialIconProps = useMemo(
    () => ({
      size: 24,
      color: (theme as any)?.colors?.contrastSoft,
    }),
    [theme],
  );
  return (
    <Container id="footer">
      <LogoContainer>
        <h1>C</h1>
        <DynamicOWLogo
          fill={`${(theme as any)?.colors?.contrastSoft}30`}
          style={{ height: '80%', marginLeft: 5, marginRight: 5 }}
        />
        <h1>T</h1>
      </LogoContainer>
      <LinksContainer>
        {/* // ? using react-router-dom navigation crashes the page for some reason  */}
        {/* // TODO: rewrite using react-router-dom navigation  */}
        <FooterLink to="/">
          <FormattedMessage id="app.pages.home" />
        </FooterLink>
        <FooterLink to="/about">
          <FormattedMessage id="app.pages.about" />
        </FooterLink>
        <FooterLink to="/tools">
          <FormattedMessage id="app.pages.tools" />
        </FooterLink>
      </LinksContainer>
      <Divider />
      <InfoContainer>
        <SocialsContainer>
          <a href="https://twitter.com/victorbhofs">
            <SiTwitter {...socialIconProps} />
          </a>
          <a href="https://github.com/vichofs">
            <SiGithub {...socialIconProps} />
          </a>
          <a href="https://linkedin.com/in/victor-hofstetter">
            <SiLinkedin {...socialIconProps} />
          </a>
          <a href="https://twitch.tv/vichofs">
            <SiTwitch {...socialIconProps} />
          </a>
        </SocialsContainer>
        <p style={{ opacity: 0.8 }}>
          <FormattedMessage
            id="app.footer.signature"
            values={{
              bold: (chunks: string) => <span className="bold">{chunks}</span>,
            }}
          />
        </p>
        <a className="coffee" href="https://bmc.link/vichofs">
          <SiBuymeacoffee />
          <p>
            <FormattedMessage id="app.footer.bmcText" />
          </p>
        </a>
        <p style={{ marginTop: 20, opacity: 0.3, maxWidth: '70%' }}>
          <FormattedMessage
            id="app.footer.disclaimer"
            values={{
              overwatch: (chunks: string) => (
                <a href="https://overwatch.blizzard.com/en-us/">{chunks}</a>
              ),
            }}
          />
        </p>
        <p style={{ marginTop: 5, opacity: 0.3, maxWidth: '70%' }}>
          <FormattedMessage
            id="app.footer.info"
            values={{
              bugReport: (chunks: string) => (
                <a href="https://discord.gg/3AFBh7JJuB">{chunks}</a>
              ),
            }}
          />
        </p>
      </InfoContainer>
    </Container>
  );
};

export default Footer;
