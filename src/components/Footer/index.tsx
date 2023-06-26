import React, { useMemo } from 'react';
import {
  Container,
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
    <Container>
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
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/tools">Tools</a>
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
          Made with 🧡 by <span className="bold">Victor Hofstetter</span>
        </p>
        <a className="coffee" href="https://bmc.link/vichofs">
          <SiBuymeacoffee />
          <p>Buy me a coffee</p>
        </a>
        <p style={{ marginTop: 20, opacity: 0.3, maxWidth: '70%' }}>
          Overwatch is a trademark of Blizzard Entertainment, Inc., in the U.S.
          and/or other countries. This is an independent application developed
          with no relationship with, sponsorship, or endorsement by Blizzard.
        </p>
        <p style={{ marginTop: 5, opacity: 0.3, maxWidth: '70%' }}>
          © 2023 Victor Hofstetter.{' '}
          <a style={{ color: 'inherit' }} href="https://github.com/vichofs">
            Report a bug
          </a>
        </p>
      </InfoContainer>
    </Container>
  );
};

export default Footer;
