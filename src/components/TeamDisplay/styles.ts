import styled from 'styled-components';

interface HeadingProps {
  color?: string;
}

export const Container = styled.div`
  font-family: BigNoodle;
  font-style: italic;
  font-size: 35px;

  span {
    display: flex;
    flex-direction: row;
    place-content: space-between;
    place-items: center;
    height: 80px;

    img {
      height: 60%;
    }
  }

  sup {
    vertical-align: super;
    color: #b743ee;
    margin-left: 1px;
    font-size: 23px;
  }

  div {
    margin: 5px 0;
  }
`;

export const Heading = styled.span<HeadingProps>`
  display: flex;
  flex-direction: row;
  place-content: space-between;
  place-items: center;
  height: 80px;
  padding: 0 20px;

  background-color: ${({ color }) => color ?? 'none'};

  img {
    height: 80%;
  }
`;
