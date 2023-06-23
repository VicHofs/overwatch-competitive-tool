import styled from 'styled-components';

interface RouteLinkProps {
  current?: boolean;
}

export const Container = styled.header`
  display: flex;
  flex-direction: row;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px 100px;
  align-items: center;
  justify-content: space-between;

  font-family: Industry;
  text-transform: uppercase;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.contrastSoft};
  vertical-align: middle;
  user-select: none;
  margin-bottom: 25px;

  .short {
    display: none;
  }

  @media (max-width: 1110px) {
    .long {
      display: none;
    }
    .short {
      display: revert;
    }
  }

  @media (max-width: 880px) {
    justify-content: space-between;
    padding: 10px 0;
    select {
      display: none;
    }
    svg {
      display: none;
    }
  }

  @media (max-width: 412px) {
    justify-content: center;
    h1 {
      display: none;
    }
  }
`;

export const TitleContainer = styled.span`
  height: 100%;
  display: flex;
  flex-direction: row;
  font-size: 15px;
  place-items: center;
  place-content: center;
  cursor: pointer;

  img {
    height: 90%;
    margin-right: 10px;
  }
`;

export const ToolsContainer = styled.span`
  display: flex;
  flex-direction: row;
  height: 80px;

  @media (max-width: 412px) {
    display: none;
  }
`;

export const RouteLink = styled.a<RouteLinkProps>`
  position: relative;
  display: flex;
  place-items: center;
  font-weight: 500;
  text-decoration: none;
  height: 100%;
  padding: 0 10px;
  margin: 0 10px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.contrastSoft};

  &:after {
    transform: ${({ current }) => (current ? '' : 'scaleX(0)')};
    transition: transform 200ms cubic-bezier(0.11, 0.53, 0.27, 1);
    content: '';
    background-color: ${({ theme }) => theme.colors.contrastSoft};
    width: 100%;
    height: 4px;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};

    &:after {
      transform: scaleX(100%);
      background-color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

export const SettingsContainer = styled.span`
  display: flex;
  flex-direction: row-reverse;
`;
