import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  place-items: center;
  place-content: space-between;
  height: 50px;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.contrastSoft}30;
  padding: 0 10px 0 10px;

  font-family: BigNoodle, sans-serif;
  font-style: italic;
  font-size: 25px;

  span img {
    height: 70%;
  }

  span {
    height: 100%;
    display: flex;
    align-items: center;
  }

  img {
    height: 40%;
    margin-right: 5px;
  }

  .roleIcon {
    height: 50%;
    ${({ theme }) => (theme.title === 'light' ? 'filter: invert()' : '')}
  }
`;
