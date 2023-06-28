import React, { useMemo, useEffect } from 'react';
import { Container, ToolsContainer } from './styles';
import ToolComponent from './ToolComponent';

import { GiTeamIdea } from 'react-icons/gi';
import { CiStreamOn } from 'react-icons/ci';
import { FormattedMessage, useIntl } from 'react-intl';
import { scrollToTop } from 'helpers/functions';
import { Divider, TitleDivider } from 'styles';

const Tools: React.FC = () => {
  useEffect(scrollToTop, []);
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
      <h1>
        <FormattedMessage id="app.tools.title" />
      </h1>
      <TitleDivider />
      <ToolsContainer>
        {toolsList.map((tool) => (
          <ToolComponent
            IconComponent={tool.icon}
            title={tool.name as string}
            description={tool.description as string}
            path={tool.path}
          />
        ))}
      </ToolsContainer>
      <Divider />
      <p>More coming soon!</p>
    </Container>
  );
};

export default Tools;
