import styled from 'styled-components';
import { Container as ToolContainer } from './ToolComponent/styles';
import { TitleDivider } from 'styles';

export const Container = styled.div`
  align-items: center;
  flex-grow: 1;
  padding: 0 40px;
  max-width: 1477.6px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  > h1 {
    align-self: start;
  }

  > ${TitleDivider} {
    align-self: start;
    margin-top: 10px;
    margin-bottom: 20px;
    height: 10px;
    width: 75px;
  }

  > p {
    margin-top: 20px;
    opacity: 0.6;
    color: ${({ theme }) => theme.colors.contrastSoft};
  }
`;

export const ToolsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  place-items: center;
  place-content: center;
  padding: 20px 0;

  > ${ToolContainer}:nth-child(even) {
    align-self: end;
    flex-direction: row-reverse;
    text-align: right;

    > div {
      align-items: end;
      align-content: end;
    }

    &:hover {
      h2 {
        transform: translateX(-10px);
      }
    }
  }
`;
