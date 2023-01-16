import { Elo, Tier } from 'helpers/formats';
import { rankIcons, rankToSR } from 'helpers/functions';
import { elos, tiers } from 'helpers/objects';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Container,
  EloContainer,
  EloList,
  FadeOverlay,
  TierContainer,
  TierToggle,
} from './styles';

interface RankPickerProps {
  onChange?: (rank: number) => void;
  style?: React.CSSProperties;
}

const risingElos = elos.slice().reverse();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const preventDefault = (e: any) => {
  const event = e || window.event;
  if (event.preventDefault) {
    event.preventDefault();
  }
  event.returnValue = false;
};

const disableScroll = () =>
  document.addEventListener('wheel', preventDefault, {
    passive: false,
  });

const enableScroll = () =>
  document.removeEventListener('wheel', preventDefault, false);

const RankPicker: React.FC<RankPickerProps> = ({ onChange, style }) => {
  const eloListRef = useRef<HTMLDivElement>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [query, setQuery] = useState('');
  const [tabBlock, setTabBlock] = useState(true);
  const [eloListVisible, setEloListVisible] = useState(false);
  const [elo, setElo] = useState<Elo>('platinum');
  const [tier, setTier] = useState<Tier>(3);

  useEffect(() => {
    if (!query) return () => clearTimeout(timeoutId);
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setQuery(''), 700);
    setTimeoutId(id);
    if (query !== 'g') {
      const match =
        query.slice(0, 2) === 'gm'
          ? 'grandmaster'
          : elos.find((item) => item.includes(query));
      if (match) {
        if (eloListRef.current)
          eloListRef.current.scrollTop = risingElos.indexOf(match) * 52;
        setElo(match);
      }
    }
    return () => clearTimeout(id);
  }, [query]);

  useLayoutEffect(() => {
    if (!eloListVisible) setTabBlock(true);
    if (!eloListVisible || !eloListRef.current) return;
    eloListRef.current.scrollTop = risingElos.indexOf(elo) * 52;
    eloListRef.current.scrollLeft = risingElos.indexOf(elo) * 50.802;
  }, [eloListVisible]);

  useEffect(() => {
    if (!elo || !tier || !onChange) return;
    onChange(rankToSR(elo, tier));
  }, [elo, tier]);

  return (
    <Container style={style} forceExpanded={eloListVisible}>
      <TierContainer
        onKeyDown={({ key }) => {
          if (key.match(/\d/))
            setTier(Math.min(5, Math.max(1, Number(key))) as Tier);
        }}
        onMouseEnter={disableScroll}
        onMouseLeave={enableScroll}
        onWheel={(e) =>
          setTier((prevState) => {
            const result = Math.min(
              Math.max(prevState + (e.deltaY > 1 ? 1 : -1), 1),
              5,
            );
            return result as Tier;
          })
        }
        onScroll={(e) => e.preventDefault()}
      >
        {tiers.map((t) => (
          <TierToggle tier={t} onClick={() => setTier(t)} selected={tier === t}>
            {t}
          </TierToggle>
        ))}
      </TierContainer>
      <EloContainer
        style={eloListVisible ? { opacity: 0 } : {}}
        onClick={() => setEloListVisible((prevState) => !prevState)}
        onKeyDown={({ key }) => {
          if (key === 'ArrowUp')
            setElo(
              (prevState) =>
                elos[
                  Math.min(
                    Math.max(elos.indexOf(prevState) + 1, 0),
                    elos.length - 1,
                  )
                ],
            );
          if (key === 'ArrowDown')
            setElo(
              (prevState) =>
                elos[
                  Math.min(
                    Math.max(elos.indexOf(prevState) - 1, 0),
                    elos.length - 1,
                  )
                ],
            );
          if (key === 'Backspace')
            setQuery((prevState) => prevState.slice(0, prevState.length - 1));
          else if (key !== ' ') setQuery((prevState) => `${prevState}${key}`);
          else setEloListVisible((prevState) => !prevState);
        }}
        tabIndex={0}
        onMouseEnter={disableScroll}
        onMouseLeave={enableScroll}
        onWheel={(e) =>
          setElo(
            (prevState) =>
              elos[
                Math.min(
                  Math.max(
                    elos.indexOf(prevState) - (e.deltaY > 1 ? 1 : -1),
                    0,
                  ),
                  elos.length - 1,
                )
              ],
          )
        }
      >
        <img src={rankIcons[elo][tier]} alt={`${elo} ${tier}`} />
      </EloContainer>
      {eloListVisible && <FadeOverlay />}
      {eloListVisible && (
        <EloList
          ref={eloListRef}
          onMouseEnter={disableScroll}
          onMouseLeave={enableScroll}
          onWheel={(e) => {
            eloListRef.current?.scrollBy({
              behavior: 'smooth',
              left: 50.802 * (e.deltaY > 1 ? 1 : -1),
              top: 52 * (e.deltaY > 1 ? 1 : -1),
            });
          }}
        >
          {risingElos.map((item) => (
            <EloContainer
              // eslint-disable-next-line no-nested-ternary
              tabIndex={item === elo ? 0 : tabBlock ? -1 : 0}
              onFocus={() => {
                if (item === elo && tabBlock) setTabBlock(false);
              }}
              className={`${
                // eslint-disable-next-line no-nested-ternary
                item === elo
                  ? ''
                  : risingElos.indexOf(elo) > risingElos.indexOf(item)
                  ? 'u'
                  : 'd'
              }`}
              onClick={() => {
                setElo(item);
                setEloListVisible((prevState) => !prevState);
              }}
              onKeyDown={({ key }) => {
                if (key !== ' ') return;
                setElo(item);
                setEloListVisible((prevState) => !prevState);
              }}
            >
              <img src={rankIcons[item][tier]} alt={`${item} ${tier}`} />
            </EloContainer>
          ))}
        </EloList>
      )}
    </Container>
  );
};

RankPicker.defaultProps = {
  onChange: (rank) => {
    /* do nothing */
  },
  style: {},
};

export default RankPicker;
