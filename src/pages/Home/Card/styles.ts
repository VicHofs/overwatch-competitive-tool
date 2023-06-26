import styled from 'styled-components';
import { TitleDivider } from 'styles';

export const Container = styled.div`
  aspect-ratio: 16 / 19;
  width: 20.834vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.302125vw 2.27871875vw;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primarySoft};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  place-items: center;
  place-content: center;
  text-align: center;

  ${TitleDivider} {
    height: 0.781275vw;
  }

  svg {
    height: 5.2085vw;
    width: 5.2085vw;
  }

  h2 {
    font-size: 1.9531875vw;
  }

  p {
    font-size: 0.97659375vw;
    max-height: 12.5004vw;
    font-family: Roboto;
    color: ${({ theme }) => theme.colors.contrastSoft};
    opacity: 0.8;
    line-height: 1.56255vw;
    overflow: hidden;
  }
`;
