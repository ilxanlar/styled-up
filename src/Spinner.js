import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import spin from './keyframes/spin';
import variables from './variables';
import { feedbackMoods, sizes } from './helpers/propTypes';

export const propTypes = {
  duration: PropTypes.number,
  mood: PropTypes.oneOf(feedbackMoods),
  size: PropTypes.oneOf(sizes),
  sizePx: PropTypes.number,
  thickness: PropTypes.number,
  timing: PropTypes.string
};

const spinnerCss = ({
  duration, mood, size, sizePx, thickness, timing
}) => css`
  animation-name: ${spin};
  animation-duration: ${duration}s;
  animation-timing-function: ${timing};
  border: ${thickness}px solid ${variables.color[mood]};
  border-bottom-color: transparent;
  border-left-color: transparent;
  height: ${sizePx > 0 ? sizePx : variables.fontSize[size]}px;
  width: ${sizePx > 0 ? sizePx : variables.fontSize[size]}px;
`;

const Spinner = styled.span`
  animation-iteration-count: infinite;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  ${spinnerCss};
`;

Spinner.displayName = 'Spinner';
Spinner.propTypes = propTypes;
Spinner.defaultProps = {
  duration: 0.5,
  mood: 'info',
  size: 'normal',
  thickness: 2,
  timing: 'linear'
};

export default Spinner;
