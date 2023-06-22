import React, { useEffect, useState } from 'react';
import { Container, PageTitle, StepsContainer } from './styles';
import { Input, InputContainer, RoleIcon } from 'styles';
import { roles } from 'helpers/objects';
import { Role } from 'helpers/formats';
import Button from 'components/Button';
import Step from 'components/Step';

import { useRive } from '@rive-app/react-canvas';
import OCT from 'assets/Rive/oct.riv';
import SLOBS from 'assets/Rive/slobs.riv';
import { useTheme } from 'styled-components';
import { getCookies } from 'helpers/cookies';

const rivePlayerCommonSettings = {
  height: 180,
  width: 320,
  borderRadius: 10,
  overflow: 'hidden',
};

const initialArtboard =
  getCookies()['prefers-theme'] === 'light' ? 'Light Mode' : 'Dark Mode'; // ? theme from useTheme() doesn't update fast enough, this is a workaround

const OverlayMenu: React.FC = () => {
  // TODO: refactor sequence playing logic (maybe use rive.on() api); fix all steps playing on theme switch
  const [step1complete, setStep1Complete] = useState(false);
  const [step2complete, setStep2Complete] = useState(false);
  const theme = useTheme();
  const { rive: step3rive, RiveComponent: Step3 } = useRive({
    src: SLOBS,
    stateMachines: 'Add URL Flow',
    autoplay: true,
    artboard: initialArtboard,
  });
  const { rive: step2rive, RiveComponent: Step2 } = useRive({
    src: SLOBS,
    stateMachines: 'New Source Flow',
    artboard: initialArtboard,
    autoplay: true,
    onStateChange: (e) => {
      if ((e.data as string[])?.[0] === 'exit') {
        setStep2Complete(true);
      }
    },
  });
  const { rive: step1rive, RiveComponent: Step1 } = useRive({
    src: OCT,
    stateMachines: 'Overlay Flow',
    artboard: initialArtboard,
    autoplay: true,
    onStateChange: (e) => {
      if ((e.data as string[])?.[0] === 'exit') {
        setStep1Complete(true);
      }
    },
  });
  useEffect(() => {
    if (step1complete) {
      if (!step2rive?.isPlaying) step2rive?.play();
    } else if (step2rive?.isPlaying) {
      step2rive.pause();
    }
  }, [step1complete, step2rive]);
  useEffect(() => {
    if (step2complete) {
      if (!step3rive?.isPlaying) step3rive?.play();
    } else if (step3rive?.isPlaying) {
      step3rive.pause();
    }
  }, [step2complete, step3rive]);
  useEffect(() => {
    setStep1Complete(false);
    setStep2Complete(false);
    const dynamicArtboard =
      (theme as { title: string })?.title === 'light'
        ? 'Light Mode'
        : 'Dark Mode';
    step1rive?.cleanupInstances();
    step1rive?.load({
      src: OCT,
      stateMachines: 'Overlay Flow',
      autoplay: true,
      artboard: dynamicArtboard,
    });
    step2rive?.cleanupInstances();
    step2rive?.load({
      src: SLOBS,
      autoplay: true,
      stateMachines: 'New Source Flow',
      artboard: dynamicArtboard,
    });
    step3rive?.cleanupInstances();
    step3rive?.load({
      src: SLOBS,
      autoplay: true,
      stateMachines: 'Add URL Flow',
      artboard: dynamicArtboard,
    });
  }, [theme]);
  const [battletag, setBattletag] = useState('');
  const [role, setRole] = useState<Role | null>();
  return (
    <Container>
      <PageTitle>Stream Overlay</PageTitle>
      {/* // TODO: implement play on hover for each step */}
      <StepsContainer>
        <Step
          step={1}
          title="Get Link"
          description="Generate a personal link below"
        >
          <Step1 style={rivePlayerCommonSettings} />
        </Step>
        <Step
          step={2}
          title="Add Source"
          description="Create a new Browser Source in your streaming software"
        >
          <Step2 style={rivePlayerCommonSettings} />
        </Step>
        <Step
          step={3}
          title="Paste Link"
          description="Paste the link into your source URL"
        >
          <Step3 style={rivePlayerCommonSettings} />
        </Step>
      </StepsContainer>
      <InputContainer
        onKeyDown={(e) => {
          if (e.key === 'Enter' && role && battletag.match(/[^#]+#\d+/)) {
            navigator.clipboard.writeText(
              `https://vichofs.github.io/overwatch-competitive-tool/overlay/${battletag.replace(
                '#',
                '-',
              )}${
                role && role.name !== 'flex'
                  ? `?role=${role?.name === 'damage' ? 'offense' : role?.name}`
                  : ''
              }`,
            );
          }
        }}
      >
        <Input
          type="text"
          placeholder="Battletag#00000"
          value={battletag}
          onChange={(e) => setBattletag(e.target.value)}
          className={battletag ? 'filled' : ''}
        />
        <span>
          {Object.values(roles).map((item) => (
            <RoleIcon
              tabIndex={0}
              src={item.icon}
              alt={`select ${item.name}`}
              onKeyDown={({ key }) => {
                if (key === ' ') setRole(item);
              }}
              onClick={() => setRole(item)}
              className={role && role.id === item.id ? 'selected' : ''}
            />
          ))}
        </span>
      </InputContainer>
      <Button
        disabled={!role || !battletag.match(/[^#]+#\d+/)}
        style={{ marginTop: 40 }}
        onClick={(e) => {
          navigator.clipboard.writeText(
            `https://vichofs.github.io/overwatch-competitive-tool/overlay/${battletag.replace(
              '#',
              '-',
            )}${
              role && role.name !== 'flex'
                ? `?role=${role?.name === 'damage' ? 'offense' : role?.name}`
                : ''
            }`,
          );
          (e.target as HTMLButtonElement).blur();
        }}
      >
        Generate Overlay Source
      </Button>
    </Container>
  );
};

export default OverlayMenu;
