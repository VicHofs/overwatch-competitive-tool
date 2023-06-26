import React from 'react';
import { Container } from './styles';
import { TitleDivider } from 'styles';
import { FormattedMessage } from 'react-intl';

const About: React.FC = () => {
  return (
    <Container>
      <h1>
        <FormattedMessage id="app.about.title" />
      </h1>
      <TitleDivider />
      <p>
        <FormattedMessage
          id="app.about.body"
          values={{
            br: <br />,
            bold: (chunks: string) => <span className="bold">{chunks}</span>,
            strikethrough: (chunks: string) => (
              <span className="strikethrough">{chunks}</span>
            ),
            discord: (chunks: string) => (
              <a href="https://discord.gg/BkjbqWBTTB">{chunks}</a>
            ),
            twitch: (chunks: string) => (
              <a href="https://twitch.tv/vichofs">{chunks}</a>
            ),
            twitter: (chunks: string) => (
              <a href="https://twitter.com/victorbhofs">{chunks}</a>
            ),
            bmc: (chunks: string) => (
              <a href="https://bmc.link/vichofs">{chunks}</a>
            ),
          }}
        />
      </p>
      <img
        height={112}
        width={112}
        src="https://static-cdn.jtvnw.net/emoticons/v2/308032838/default/dark/3.0"
        alt="vichofKitsuneLove"
      />
    </Container>
  );
};

export default About;
