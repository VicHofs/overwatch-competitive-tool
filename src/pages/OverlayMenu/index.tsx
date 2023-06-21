import React, { useState } from 'react';
import { Container, PageTitle, StepsContainer } from './styles';
import { Input, InputContainer, RoleIcon } from 'styles';
import { roles } from 'helpers/objects';
import { Role } from 'helpers/formats';
import Button from 'components/Button';

import { useNavigate } from 'react-router-dom';
import Step from 'components/Step';

const OverlayMenu: React.FC = () => {
  const [battletag, setBattletag] = useState('');
  const [role, setRole] = useState<Role | null>();
  const navigate = useNavigate();
  return (
    <Container>
      <PageTitle>Stream Overlay</PageTitle>
      <StepsContainer>
        <Step
          step={1}
          title="Get Link"
          description="Generate a personal link below"
        />
        <Step
          step={2}
          title="Add Source"
          description="Create a new Browser Source in your streaming software"
        />
        <Step
          step={3}
          title="Paste Link"
          description="Paste the link into your source"
        />
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
        onClick={
          (e) => {
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
          }
          // navigate(
          //   `/overlay/${battletag.replace('#', '-')}${
          //     role && role.name !== 'flex'
          //       ? `?role=${role?.name === 'damage' ? 'offense' : role?.name}`
          //       : ''
          //   }`,
          // )
        }
      >
        Generate Overlay Source
      </Button>
    </Container>
  );
};

export default OverlayMenu;
