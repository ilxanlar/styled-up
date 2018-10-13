import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

const Theme = ({ children, isRTL, ...rest }) => (
  <ThemeProvider theme={{ isRTL, ...rest }}>{children}</ThemeProvider>
);

Theme.propTypes = {
  isRTL: PropTypes.bool
};

Theme.defaultProps = {
  isRTL: false
};

Theme.displayName = 'Theme';

export default Theme;
