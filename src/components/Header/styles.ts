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

  @media (max-width: 768px) {
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

export const ToolContainer = styled.span`
  display: flex;
  flex-direction: row-reverse;
`;
