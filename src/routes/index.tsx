import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import TeamSorter from 'pages/TeamSorter';

export const pages = [
  {
    name: 'Team Sorter',
    slug: 'Teams',
    slugId: 'app.teamSorter.slug',
    route: '/team-sorter',
  },
  {
    name: 'DPI Tool',
    slug: 'DPI',
    slugId: 'app.dpiTool.slug',
    route: '/dpi-tool',
    disabled: true,
  },
];

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/team-sorter" component={TeamSorter} />
        <Redirect to="/team-sorter" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
