import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import Banner from 'assets/images/Transparent Rank Banner.png';
import bronze from 'assets/videos/bronze.webm';
import silver from 'assets/videos/silver.webm';
import gold from 'assets/videos/gold.webm';
import platinum from 'assets/videos/platinum.webm';
import diamond from 'assets/videos/diamond.webm';
import master from 'assets/videos/masters.webm';
import grandmaster from 'assets/videos/grandmaster.webm';
import t500 from 'assets/videos/t500.webm';
import { Container, RankIcon, RankLabel } from './styles';
import { useLocation, useParams } from 'react-router-dom';
import owapi from 'services/owapi';
import { Competitive, PlayerData, Rank } from 'services/owapi/types';
import { rankName, rankToSR } from 'helpers/functions';
import { Elo, Tier } from 'helpers/formats';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useIntl } from 'react-intl';

const overlays = {
  bronze,
  silver,
  gold,
  platinum,
  diamond,
  master,
  grandmaster,
  t500,
};

const rankAvg = (ranks: Competitive) => {
  return Object.keys(ranks).length
    ? rankName(
        Object.values(ranks).reduce(
          (acc, curr: Rank) =>
            acc +
            rankToSR(
              curr.rank.split(' ')[0].toLowerCase() as Elo,
              Number(curr.rank.split(' ')[1]) as Tier,
            ),
          0,
        ) / (Object.keys(ranks).length || 1),
      )
    : '';
};

const Overlay: React.FC = () => {
  const intl = useIntl();
  const { search: querySearch } = useLocation();
  const queries = new URLSearchParams(querySearch);
  const { tag } = useParams();
  const [rank, setRank] = useState<string>();
  const fetchData = useCallback(async () => {
    // uncomment below for testing with random ranks
    // setRank(
    //   `${Object.keys(overlays)[Math.floor(Math.random() * 6)]} ${
    //     Math.floor(Math.random() * 4) + 1
    //   }`,
    // );
    const { data } = await owapi.get<PlayerData>(`${tag}`);
    const role = queries.get('role');
    setRank(
      (role
        ? `${data.competitive[`${role}` as keyof Competitive]?.rank || ''}`
        : `${rankAvg(data.competitive)}`) || 'unranked',
    );
  }, []);
  useLayoutEffect(() => {
    const header = document.getElementById('header');
    if (header) {
      header.style.display = 'none';
    }
    const footer = document.getElementById('footer');
    if (footer) {
      footer.style.display = 'none';
    }
    document.body.style.overflow = 'hidden';
  }, []);
  useEffect(() => {
    document.title = `Stream Overlay - ${tag?.split('-')[0]}`;
    fetchData();
    const interval = setInterval(fetchData, 180000); // update every 30 minutes
    return () => clearInterval(interval);
  }, []);
  return (
    <Container>
      <img src={Banner} alt="Rank Banner" />
      <TransitionGroup>
        <CSSTransition key={rank} timeout={200}>
          <RankLabel>
            {rank
              ? `${
                  intl.messages[`app.terms.${rank.split(' ')[0].toLowerCase()}`]
                } ${rank === 'unranked' ? '' : rank.split(' ')[1]}`
              : `${intl.messages[`app.loading`]}...`}
          </RankLabel>
        </CSSTransition>
      </TransitionGroup>
      {!!rank && (
        <TransitionGroup>
          <CSSTransition key={`${rank}-vid`} timeout={200}>
            <RankIcon
              src={
                overlays[
                  rank?.split(' ')[0].toLowerCase() as keyof typeof overlays
                ]
              }
              autoPlay
              loop
              muted
            />
          </CSSTransition>
        </TransitionGroup>
      )}
    </Container>
  );
};

export default Overlay;
