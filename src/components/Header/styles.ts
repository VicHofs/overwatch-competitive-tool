import styled from 'styled-components';

export const Container = styled.div`
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

  @media (max-width: 977px) {
    button {
      display: none;
    }
  }

  @media (max-width: 811px) {
    justify-content: center;
    padding: 10px 0;
    select {
      display: none;
    }
    svg {
      display: none;
    }
  }

  @media (max-width: 360px) {
    h1 {
      display: none;
    }
  }
`;

export const RouteLink = styled.button`
  background-color: transparent;
  border: none;
  font-family: Industry;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.contrastSoft}98;
  cursor: pointer;
  padding: 30px 15px;

  &.highlight {
    color: ${({ theme }) => theme.colors.contrast};
  }

  &:hover {
    color: ${({ disabled, theme }) =>
      disabled ? `${theme.colors.contrastSoft}60` : theme.colors.accent};
  }

  ${({ disabled, theme }) =>
    disabled ? `color: ${theme.colors.contrastSoft}60; cursor: default;` : ''}
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

  h1 + button {
    margin-left: 40px;
  }
`;

export const ToolContainer = styled.span`
  display: flex;
  flex-direction: row-reverse;
`;
