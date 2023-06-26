import React, { useEffect } from 'react';
import {
  CardContainer,
  Container,
  ContentContainer,
  HeroContainer,
  TitleContainer,
} from './styles';

import { useRive } from '@rive-app/react-canvas';

import Chart from 'assets/Rive/chart.riv';
import { getCookies } from 'helpers/cookies';
import { useTheme } from 'styled-components';
import { Divider, TitleDivider } from 'styles';
import Card from './Card';

import { TbFreeRights } from 'react-icons/tb';
import { HiUserGroup } from 'react-icons/hi2';
import { GiEyeTarget } from 'react-icons/gi';
import Button from 'components/Button';

const initialArtboard =
  getCookies()['prefers-theme'] === 'light' ? 'Light Mode' : 'Dark Mode'; // ? theme from useTheme() doesn't update fast enough, this is a workaround

const Home: React.FC = () => {
  const theme = useTheme();
  const { rive, RiveComponent } = useRive({
    src: Chart,
    stateMachines: 'Auto Loop',
    artboard: initialArtboard,
    autoplay: true,
  });
  useEffect(() => {
    rive?.cleanupInstances();
    rive?.load({
      src: Chart,
      stateMachines: 'Auto Loop',
      artboard:
        (theme as { title: string })?.title === 'light'
          ? 'Light Mode'
          : 'Dark Mode',
      autoplay: true,
    });
  }, [theme]);
  return (
    <Container>
      <HeroContainer>
        <TitleContainer>
          <h1>
            <span className="accent">Your</span>
            <br />
            Competitive Tool
          </h1>
          <TitleDivider />
          <p>
            The <span className="bold">Overwatch Competitive Tool (OWCT)</span>{' '}
            project is a suite of tools for everyone—from professional players
            and streamers to casual and competitive players—designed to make
            Overwatch organized tournaments, streaming, and competitive play a
            better experience than ever.
          </p>
        </TitleContainer>
        <ContentContainer>
          <RiveComponent />
        </ContentContainer>
      </HeroContainer>
      <Divider style={{ width: '30%' }} />
      <CardContainer>
        <Card
          IconComponent={TbFreeRights}
          title="Free"
          description="All features of the tool are 100% free for everyone, forever. That means no ads, subscriptions, or hidden fees—just pure awesomeness. The project is funded solely by donations and the support of the Overwatch community."
        />
        <Card
          IconComponent={HiUserGroup}
          title="Open"
          description="The Project is open-source and primarily based on demands and contributions from the Overwatch community. Suggestions and Requests are always welcome, and new tools are rolled out according to that demand."
        />
        <Card
          IconComponent={GiEyeTarget}
          title="Aimed"
          description="The Competitive Tool is made by players, for players. We believe reciprocity is the best way to develop tools that make sense for everyone, and to that end, all developers who ever work on the project are Overwatch veterans."
        />
      </CardContainer>
      <Divider style={{ width: '30%' }} />
      <Button style={{ marginTop: 10, marginBottom: 20 }}>Get Started</Button>
    </Container>
  );
};

export default Home;
