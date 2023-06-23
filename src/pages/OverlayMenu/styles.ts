import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  min-height: calc(100vh - 105px);
`;

export const PageTitle = styled.h1`
  text-transform: uppercase;
  margin-bottom: 40px;
  text-align: center;
`;

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;

  margin-bottom: 60px;

  @media (max-width: 1145px) {
    display: none;
  }
`;
