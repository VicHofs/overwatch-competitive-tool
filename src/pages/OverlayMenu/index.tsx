import React, { useState } from 'react';
import { Container, PageTitle } from './styles';
import { Input, InputContainer, RoleIcon } from 'styles';
import { roles } from 'helpers/objects';
import { Role } from 'helpers/formats';
import Button from 'components/Button';

import { useNavigate } from 'react-router-dom';

const OverlayMenu: React.FC = () => {
  const [battletag, setBattletag] = useState('');
  const [role, setRole] = useState<Role | null>();
  const navigate = useNavigate();
  return (
    <Container>
      <PageTitle>Stream Overlay</PageTitle>
      <InputContainer
        onKeyDown={(e) => {
          if (e.key === 'Enter' && role && battletag.match(/[^#]+#\d+/)) {
            navigate(
              `/overlay/${battletag.replace('#', '-')}?role=${
                role?.name === 'damage' ? 'offense' : role?.name
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
        onClick={() =>
          navigate(
            `/overlay/${battletag.replace('#', '-')}?role=${
              role?.name === 'damage' ? 'offense' : role?.name
            }`,
          )
        }
      >
        Generate Overlay Source
      </Button>
    </Container>
  );
};

export default OverlayMenu;
