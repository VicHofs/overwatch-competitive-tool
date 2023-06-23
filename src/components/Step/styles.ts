import styled from 'styled-components';

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;

  h1,
  h2,
  h3,
  h4,
  p {
    text-align: center;
  }
`;

export const StepNumber = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  width: 24px;
  aspect-ratio: 1 / 1;
  color: ${({ theme }) => theme.colors.primarySoft};
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  margin-bottom: 10px;
  user-select: none;
`;

export const Title = styled.h3`
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.contrastSoft};
`;

export const Description = styled.p`
  font-family: Roboto;
  font-size: 1.55rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 15px;
`;
