import React from 'react';
import { Container } from './styles';
import { TitleDivider } from 'styles';

const About: React.FC = () => {
  return (
    <Container>
      <h1>About</h1>
      <TitleDivider />
      <p>
        The Overwatch Competitive Tool (OWCT) project was started with{' '}
        <span className="strikethrough">Winston&apos;s Recall</span> the
        realization that while many other games (VALORANT, CS:GO, League of
        Legends) have several tools on the web that help competitive players
        gain an edge, the same could not be said for Overwatch. It aims to
        provide several tools that help players of all styles—from streamers and
        professional players to casual and competitive players.
        <br />
        <br />
        Currently, OWCT is being single-handedly developed by Victor Hofstetter
        (VicHofs), a Software engineer but also Overwatch streamer and
        Collegiates player (and notorious Genji Main). However, the project is
        open-source and any contribution is welcome. Reach out to VicHofs over
        Discord, Twitch, or Twitter if you&apos;d like to contribute!
        <br />
        <br />
        The application is still in its early stages, so support from the
        community is more important than ever at this time. If you&apos;re
        reading this right now, it means you&apos;re already playing a part in
        its growth (thank you!), but if you&apos;d like to become an active
        early supporter, consider donating through the link in the footer or
        joining VicHofs&apos;s Discord channel to give feedback!
      </p>
    </Container>
  );
};

export default About;
