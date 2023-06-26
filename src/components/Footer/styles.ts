import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  flex-direction: column;
  // height: 300px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 15px 100px;
  align-items: center;
  justify-content: center;

  font-family: Industry;
  text-transform: uppercase;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.contrastSoft};
  vertical-align: middle;
  // user-select: none;
  margin-top: 25px;

  @media (max-width: 811px) {
  }

  @media (max-width: 360px) {
  }
`;

export const LogoContainer = styled.div`
  color: ${({ theme }) => theme.colors.contrastSoft}30;
  height: 56px;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  place-items: center;
  place-content: center;
  user-select: none;

  img {
    height: 80%;
    margin-right: 10px;
  }
`;

export const LinksContainer = styled.span`
  display: flex;
  flex-direction: row;
  gap: 40px;
  height: 20px;
  // margin: 10px 0;
  margin-top: 10px;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.contrastSoft};
    font-weight: 500;
    transform: translateY(0);
    transition: all 100ms ease-out;

    &:hover {
      cursor: pointer;
      transform: translateY(-2px);
      font-weight: 600;
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.contrastSoft};

  .coffee {
    transition: all 100ms ease-out;
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;

    &:hover {
      filter: brightness(120%);
    }
  }

  .bold {
    font-weight: 700;
  }

  p {
    opacity: 0.9;
    text-transform: none;
    font: 400 13px Roboto, sans-serif;
    text-align: center;
  }
`;

export const SocialsContainer = styled.span`
  height: 30px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-bottom: 10px;

  svg {
    transition: all 100ms ease-out;
    opacity: 0.5;

    &:hover {
      opacity: 0.9;
      cursor: pointer;
    }
  }
`;
