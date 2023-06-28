import styled from 'styled-components';
import { TitleDivider } from 'styles';

export const Container = styled.div`
  align-self: center;
  max-width: 1477.6px;
  flex-grow: 1;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  // place-items: center;
  // gap: 20px;
  // min-height: calc(100vh - 80px);

  .strikethrough {
    text-decoration: line-through;
  }

  .bold {
    font-weight: 700;
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

  a {
    transition: color 200ms cubic-bezier(0.11, 0.53, 0.27, 1);
    color: unset;
    transform: translateY(0);

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  img {
    place-self: center;
    margin: 30px;
  }
`;
