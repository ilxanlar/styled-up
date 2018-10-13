import styled, { css } from 'styled-components';
import Popper, { propTypes } from './Popper';
import variables from './variables';

const arrowSize = 6;
const bgColor = '#fff';
const borderColor = '#ccc';

const arrowCss = () => css`
  display: block;
  height: ${2 * arrowSize}px;
  position: absolute;
  width: ${2 * arrowSize}px;
  z-index: 1;

  &::before {
    border-color: ${borderColor};
  }

  &::after {
    border-color: #fff;
  }

  &[data-placement*='bottom'] {
    top: 0;
    left: 0;
    margin-top: ${2 - arrowSize}px;

    &::before,
    &::after {
      border-top-width: 0;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
    }

    &::before {
      top: -1.5px;
    }
  }

  &[data-placement*='top'] {
    bottom: ${2 - 2 * arrowSize}px;

    &::before,
    &::after {
      border-bottom-width: 0;
      border-bottom-color: transparent !important;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
    }

    &::before {
      top: 1.5px;
    }
  }

  &[data-placement*='right'] {
    left: ${2 - arrowSize}px;

    &::before,
    &::after {
      border-left-width: 0;
      border-bottom-color: transparent !important;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
    }

    &::before {
      left: -1.5px;
    }
  }

  &[data-placement*='left'] {
    right: ${2 - 2 * arrowSize}px;

    &::before,
    &::after {
      border-right-width: 0;
      border-bottom-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
    }

    &::before {
      left: 1.5px;
    }
  }

  &::before,
  &::after {
    border-style: solid;
    border-width: ${arrowSize}px;
    content: '';
    display: block;
    height: 0;
    left: 0;
    margin: auto;
    position: absolute;
    top: 0;
    width: 0;
  }
`;

const contentCss = () => css`
  background-color: ${bgColor};
  border: 1px solid ${borderColor};
  border-radius: ${() => variables.borderRadius}px;
  box-shadow: ${variables.popoverShadow};
  padding: 15px;
`;

const Popover = styled(Popper)`
  ${Popper.Arrow} {
    ${arrowCss};
  }

  ${Popper.Content} {
    ${contentCss};
  }
`;

Popover.Container = Popper.Container;
Popover.Content = Popper.Content;
Popover.Arrow = Popper.Arrow;
Popover.propTypes = propTypes;
Popover.defaultProps = {
  arrow: true,
  gutter: 'normal',
  placement: 'bottom',
  trigger: 'click'
};

export default Popover;
