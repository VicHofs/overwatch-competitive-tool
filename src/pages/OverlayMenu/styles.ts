import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 50px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  place-items: center;
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
