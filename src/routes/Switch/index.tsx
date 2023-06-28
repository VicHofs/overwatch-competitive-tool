import About from 'pages/About';
import Home from 'pages/Home';
import Overlay from 'pages/Overlay';
import OverlayMenu from 'pages/OverlayMenu';
import TeamSorter from 'pages/TeamSorter';
import Tools from 'pages/Tools';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StyledTransitionGroup } from './styles';

const Switch: React.FC = () => {
  const location = useLocation();

  return (
    <StyledTransitionGroup>
      <CSSTransition key={location.key} timeout={500} location={location}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sorter" element={<TeamSorter />} />
          <Route path="/overlay" element={<OverlayMenu />} />
          <Route path="/overlay/:tag" element={<Overlay />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </CSSTransition>
    </StyledTransitionGroup>
  );
};

export default Switch;
