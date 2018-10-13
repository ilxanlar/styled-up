import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const horizontalCss = ({ gutterPx, theme }) => css`
  flex-direction: row;
  flex-wrap: nowrap;

  .styledup-button {
    &:not(:last-child) {
      margin-${theme.isRTL ? 'left' : 'right'}: ${gutterPx}px;
    }

    &:nth-child(n+2):nth-last-child(n+2) {
      border-radius: 0;
    }

    &:first-child:not(:last-child) {
      border-bottom-${theme.isRTL ? 'left' : 'right'}-radius: 0;
      border-top-${theme.isRTL ? 'left' : 'right'}-radius: 0;
    }

    &:last-child:not(:first-child) {
      border-bottom-${theme.isRTL ? 'right' : 'left'}-radius: 0;
      border-top-${theme.isRTL ? 'right' : 'left'}-radius: 0;
    }
  }
`;

const verticalCss = ({ gutterPx }) => css`
  flex-direction: column;

  .styledup-button {
    &:not(:last-child) {
      margin-bottom: ${gutterPx}px;
    }

    &:nth-child(n + 2):nth-last-child(n + 2) {
      border-radius: 0;
    }

    &:first-child:not(:last-child) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-child:not(:first-child) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
`;

const ButtonGroup = styled.div.attrs({ className: 'styledup-button-group' })`
  display: inline-flex;
  ${props => (props.vertical ? verticalCss(props) : horizontalCss(props))};
`;

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.propTypes = {
  gutter: PropTypes.number,
  vertical: PropTypes.bool
};
ButtonGroup.defaultProps = {
  gutterPx: 0,
  vertical: false
};

export default ButtonGroup;
