import React from 'react'
import { useMediaQuery } from 'react-responsive'
import LandingMobile from './LandingMobile';
import LandingDesktop from './LandingDesktop';
import LandingTablet from './LandingTablet';
import Calendar from './Calendar';

export const Pc = () => {
  const isPc = useMediaQuery({
    query: "(min-width:1195px)"
  });
  return <>{isPc && <LandingDesktop/>}</>
}
export const Tablet = () => {
  const isTablet = useMediaQuery({
    query: "(max-width:1194px)"
  });
  return <>{isTablet && <LandingTablet/>}</>
}
export const Mobile = () => {
    const isMobile = useMediaQuery({
      query: "(max-width:393px)"
    });
    return <>{isMobile && <LandingMobile/>
    }</>
  }
  