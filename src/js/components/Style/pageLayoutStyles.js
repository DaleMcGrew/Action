import styled from 'styled-components';

// We suppress this lint error so we can bring PageContentContainer using the same { PageContentContainer } notation used in WebApp
// eslint-disable-next-line import/prefer-default-export
export const PageContentContainer = styled.div`
  padding-top: 60px;
  padding-bottom 625px;
  position: relative;
  max-width: 960px;
  z-index: 0;
  min-height: 190px;
  margin: 0 auto;
  @media (max-width: 1000px) {
    margin: 0 10px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 10px;
  }
  // for debugging... ${({ theme }) => ((theme) ? console.log(theme) : console.log(theme))}
`;

