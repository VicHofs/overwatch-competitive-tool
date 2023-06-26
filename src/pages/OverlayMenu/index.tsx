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
import toast from 'react-hot-toast';
import { FormattedMessage, useIntl } from 'react-intl';

const rivePlayerCommonSettings = {
  height: 180,
  width: 320,
  borderRadius: 10,
  overflow: 'hidden',
  boxShadow:
    '0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05)',
};

const initialArtboard =
  getCookies()['prefers-theme'] === 'light' ? 'Light Mode' : 'Dark Mode'; // ? theme from useTheme() doesn't update fast enough, this is a workaround

const OverlayMenu: React.FC = () => {
  const intl = useIntl();
  useEffect(() => {
    document.title = 'Stream Overlay Setup - Overwatch Competitive Tool';
  }, []);
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
      <PageTitle>
        <FormattedMessage id="app.overlay.title" />
      </PageTitle>
      {/* // TODO: implement play on hover for each step */}
      <StepsContainer>
        <Step
          step={1}
          title={intl.messages['app.overlay.guide.step1.title'] as string}
          description={
            intl.messages['app.overlay.guide.step1.description'] as string
          }
        >
          <Step1 style={rivePlayerCommonSettings} />
        </Step>
        <Step
          step={2}
          title={intl.messages['app.overlay.guide.step2.title'] as string}
          description={
            intl.messages['app.overlay.guide.step2.description'] as string
          }
        >
          <Step2 style={rivePlayerCommonSettings} />
        </Step>
        <Step
          step={3}
          title={intl.messages['app.overlay.guide.step3.title'] as string}
          description={
            intl.messages['app.overlay.guide.step3.description'] as string
          }
        >
          <Step3 style={rivePlayerCommonSettings} />
        </Step>
      </StepsContainer>
      <InputContainer
        onKeyDown={async (e) => {
          if (e.key === 'Enter' && role && battletag.match(/[^#]+#\d+/)) {
            await navigator.clipboard.writeText(
              `${
                window.location.host === 'vichofs.github.io'
                  ? `${window.location.host}/overwatch-competitive-tool`
                  : window.location.host
              }/overlay/${battletag.replace('#', '-')}${
                role && role.name !== 'flex'
                  ? `?role=${role?.name === 'damage' ? 'offense' : role?.name}`
                  : ''
              }`,
            );
            toast.success(intl.messages['app.messages.linkCopied'] as string);
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
        onClick={async (e) => {
          await navigator.clipboard.writeText(
            `${
              window.location.host === 'vichofs.github.io'
                ? `${window.location.host}/overwatch-competitive-tool`
                : window.location.host
            }/overlay/${battletag.replace('#', '-')}${
              role && role.name !== 'flex'
                ? `?role=${role?.name === 'damage' ? 'offense' : role?.name}`
                : ''
            }`,
          );
          toast.success(intl.messages['app.messages.linkCopied'] as string);
          (e.target as HTMLButtonElement).blur();
        }}
      >
        <FormattedMessage id="app.overlay.generate" />
      </Button>
    </Container>
  );
};

export default OverlayMenu;
