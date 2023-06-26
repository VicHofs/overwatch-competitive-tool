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
import { FormattedMessage, useIntl } from 'react-intl';

const initialArtboard =
  getCookies()['prefers-theme'] === 'light' ? 'Light Mode' : 'Dark Mode'; // ? theme from useTheme() doesn't update fast enough, this is a workaround

const Home: React.FC = () => {
  const intl = useIntl();
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
            <FormattedMessage
              id="app.home.title"
              values={{
                accent: (chunks: string) => (
                  <span className="accent">{chunks}</span>
                ),
                br: <br />,
              }}
            />
          </h1>
          <TitleDivider />
          <p>
            <FormattedMessage
              id="app.home.description"
              values={{
                bold: (chunks: string) => (
                  <span className="bold">{chunks}</span>
                ),
              }}
            />
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
          title={intl.messages['app.home.cards.free.title'] as string}
          description={
            intl.messages['app.home.cards.free.description'] as string
          }
        />
        <Card
          IconComponent={HiUserGroup}
          title={intl.messages['app.home.cards.open.title'] as string}
          description={
            intl.messages['app.home.cards.open.description'] as string
          }
        />
        <Card
          IconComponent={GiEyeTarget}
          title={intl.messages['app.home.cards.aimed.title'] as string}
          description={
            intl.messages['app.home.cards.aimed.description'] as string
          }
        />
      </CardContainer>
      <Divider style={{ width: '30%' }} />
      <Button style={{ marginTop: 10, marginBottom: 20 }}>
        <FormattedMessage id="app.home.getStarted" />
      </Button>
    </Container>
  );
};

export default Home;
