import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 20px;
  min-height: calc(100vh - 160px);
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastSoft};
`;

export const HeroContainer = styled.div`
  padding: 40px 80px;
  padding-top: 60px;
  margin-top: -25px;
  display: flex;
  flex-direction: row;
  place-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 500px;
  background-color: ${({ theme }) => theme.colors.primary}60;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  gap: 20px;

  .accent {
    color: ${({ theme }) => theme.colors.accent};
  }

  .bold {
    font-weight: 700;
  }

  h1 {
    text-transform: uppercase;
    font-size: 5vw;
    font-weight: 700;
  }

  p {
    font-family: Roboto;
    color: ${({ theme }) => theme.colors.contrastSoft};
    opacity: 0.6;
    font-size: 1.2vw;
    line-height: 2.2vw;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  place-items: center;

  div {
    aspect-ratio: 1 / 1;
    height: 26vw !important;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-around;
`;
