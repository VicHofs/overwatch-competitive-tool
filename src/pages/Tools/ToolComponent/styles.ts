import styled from 'styled-components';
import { TitleDivider } from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;

  &:hover {
    h2 {
      transform: translateX(10px);
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;

  h2 {
    transition: all 200ms cubic-bezier(0.11, 0.53, 0.27, 1);
    text-transform: uppercase;
    font-size: 50px;
  }

  ${TitleDivider} {
    margin-left: 5px;
    margin-top: 0;
    margin-bottom: 10px;
    height: 13px;
  }

  p {
    font-size: 17px;
    font-family: Roboto;
    color: ${({ theme }) => theme.colors.contrastSoft};
    opacity: 0.8;
  }
`;
