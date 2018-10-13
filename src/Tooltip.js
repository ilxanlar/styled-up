import styled from 'styled-components';
import Popover from './Popover';
import variables from './variables';

const Tooltip = styled(Popover)`
  ${Popover.Content} {
    background-color: ${() => variables.color.dark};
    border-color: transparent;
    box-shadow: none;
    color: ${() => variables.color.white};
    font-size: 13px;
    line-height: 1.3;
    padding: 4px 6px;
  }

  ${Popover.Arrow} {
    &::before {
      border-color: ${() => variables.color.dark};
    }

    &::after {
      border-color: transparent;
    }
  }
`;

Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = { ...Popover.propTypes };
Tooltip.defaultProps = {
  ...Popover.defaultProps,
  trigger: 'mouseOver'
};

export default Tooltip;
