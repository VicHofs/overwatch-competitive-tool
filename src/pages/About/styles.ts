import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 20px;
  min-height: calc(100vh - 160px);
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastSoft};
  font-size: 40px;
  font-weight: 700;
  transform: translateY(0);
  transition: all 100ms ease-out;
`;
