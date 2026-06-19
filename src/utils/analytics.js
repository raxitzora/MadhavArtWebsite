


import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-VVLVZ9C5QD");
};

export const trackPageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};