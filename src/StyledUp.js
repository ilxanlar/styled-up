import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import Theme from './Theme';
import variables from './variables';
import { variables as textInputVars } from './TextInput';

const GlobalStyle = createGlobalStyle`
  *, *:after, *:before {
    box-sizing: border-box;
    outline: none !important;
  }

  html {
    font-size: ${variables.fontSize.normal}px;
  }

  body {
    background: ${variables.color.white};
    color: ${variables.color.dark};
    direction: ${props => (props.theme.isRTL ? 'rtl' : 'ltr')};
    font-family: ${variables.fontFamily.primary};
    font-size: ${variables.fontSize.normal}px;
    font-weight: 400;
    line-height: ${variables.rootLineHeight};
    margin: 0;
    overflow-x: hidden;
    padding: 0;
  }

  a, input, textarea, button, select, option {
    color: inherit;
    font: inherit;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: ${textInputVars.placeholderColor};
  }

  ::-moz-placeholder { /* Firefox 19+ */
    color: ${textInputVars.placeholderColor};
    opacity: 1;
  }

  :-ms-input-placeholder { /* IE 10+ */
    color: ${textInputVars.placeholderColor};
  }

  :-moz-placeholder { /* Firefox 18- */
    color: ${textInputVars.placeholderColor};
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
  }

  hr {
    border-width: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin: ${variables.space.normal}px 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
    padding: 0;
  }

  a {
    color: ${variables.color.info};
    text-decoration: none;

    &[href]:hover {
      text-decoration: underline;
    }
  }

  h1, h2, h3, h4, h5, h6, b, strong, th {
    font-weight: bold;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.6;
  }

  h1 {
    font-size: ${variables.fontSize.h1}px;
  }

  h2 {
    font-size: ${variables.fontSize.h2}px;
  }

  h3 {
    font-size: ${variables.fontSize.h3}px;
  }

  h4 {
    font-size: ${variables.fontSize.h4}px;
  }

  h5 {
    font-size: ${variables.fontSize.h5}px;
  }

  h6 {
    font-size: ${variables.fontSize.h6}px;
  }

  .styledup-disable-scroll {
    overflow: hidden;
  }
`;

GlobalStyle.displayName = 'GlobalStyle';

const StyledUp = ({ children, ...theme }) => (
  <Theme {...theme}>
    <React.Fragment>
      <GlobalStyle />
      {children}
    </React.Fragment>
  </Theme>
);

StyledUp.displayName = 'StyledUp';

StyledUp.propTypes = {
  isRTL: PropTypes.bool
};

StyledUp.defaultProps = {
  isRTL: false
};

export default StyledUp;
