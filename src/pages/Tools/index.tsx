import React, { useMemo } from 'react';
import { Container } from './styles';
import ToolComponent from './ToolComponent';

import { GiTeamIdea } from 'react-icons/gi';
import { CiStreamOn } from 'react-icons/ci';
import { useIntl } from 'react-intl';

const Tools: React.FC = () => {
  const intl = useIntl();
  const toolsList = useMemo(
    () => [
      {
        icon: GiTeamIdea,
        name: intl.messages['app.tools.teamSorter.title'],
        description: intl.messages['app.tools.teamSorter.description'],
        path: '/sorter',
      },
      {
        icon: CiStreamOn,
        name: intl.messages['app.tools.overlay.title'],
        description: intl.messages['app.tools.overlay.description'],
        path: '/overlay',
      },
    ],
    [intl.locale],
  );
  return (
    <Container>
      {toolsList.map((tool) => (
        <ToolComponent
          IconComponent={tool.icon}
          title={tool.name as string}
          description={tool.description as string}
          path={tool.path}
        />
      ))}
    </Container>
  );
};

export default Tools;
