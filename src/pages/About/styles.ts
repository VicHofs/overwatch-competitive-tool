import styled from 'styled-components';
import { TitleDivider } from 'styles';

export const Container = styled.div`
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  // place-items: center;
  // gap: 20px;
  // min-height: calc(100vh - 240px);

  .strikethrough {
    text-decoration: line-through;
  }

  ${TitleDivider} {
    margin-top: 10px;
    margin-bottom: 20px;
    height: 10px;
    width: 75px;
  }

  p {
    color: ${({ theme }) => theme.colors.contrastSoft};
    font-family: Roboto;
    opacity: 0.9;
    line-height: 25px;
  }
`;
