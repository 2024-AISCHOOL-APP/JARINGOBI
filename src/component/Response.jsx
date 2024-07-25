import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Landing from './Landing';

const StyledLandingDesktop = styled.div`
  /* 기본 데스크탑 스타일 */
  background-color: #f0f0f0;

  @media (min-width: 1195px) {
    /* 추가 데스크탑 스타일 */
    background-color: #ffffff;
  }
`;

const StyledLandingTablet = styled.div`
  /* 기본 태블릿 스타일 */
  background-color: #e0e0e0;

  @media (max-width: 1194px) {
    /* 추가 태블릿 스타일 */
    background-color: #cccccc;
  }
`;

const StyledLandingMobile = styled.div`
  /* 기본 모바일 스타일 */
  background-color: #d0d0d0;

  @media (max-width: 393px) {
    /* 추가 모바일 스타일 */
    background-color: #bbbbbb;
  }
`;

const ResponsiveLanding = () => {
  const isPc = useMediaQuery({ query: "(min-width: 1195px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1194px) and (min-width: 394px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 393px)" });

  return (
    <>
      {isPc && <StyledLandingDesktop><Landing/></StyledLandingDesktop>}
      {isTablet && <StyledLandingTablet><Landing/></StyledLandingTablet>}
      {isMobile && <StyledLandingMobile><Landing/></StyledLandingMobile>}
    </>
  );
};

export default ResponsiveLanding;
