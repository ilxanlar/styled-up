import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import variables from './variables';
import { moods, sizes } from './helpers/propTypes';

const inputCss = ({ disabled, error }) => {
  const cursor = disabled ? 'not-allowed' : 'pointer';
  const trackColor = disabled
    ? variables.color.disabled
    : error
      ? variables.color.error
      : variables.color.silver;
  const thumbColor = disabled
    ? variables.color.disabled
    : error
      ? variables.color.error
      : variables.color.primary;
  const thumbRadius = 5;
  const thumbHeight = 10;
  const thumbWidth = 10;
  const thumbBorderWidth = 1;
  const thumbBorderColor = variables.color.white;
  const trackWidth = 100;
  const trackHeight = 1;
  const trackBorderWidth = 0;
  const trackBorderColor = 'rgba(0, 0, 0, 0.1)';
  const trackRadius = 0;

  const thumbCss = css`
    background: ${thumbColor};
    border: ${thumbBorderWidth}px solid ${thumbBorderColor};
    border-radius: ${thumbRadius}px;
    cursor: ${cursor};
    height: ${thumbHeight}px;
    width: ${thumbWidth}px;
  `;

  const trackCss = css`
    animate: 0.2s;
    cursor: ${cursor};
    height: ${trackHeight}px;
    width: ${trackWidth}%;
  `;

  return css`
    -webkit-appearance: none;
    display: block;
    margin: ${thumbHeight / 2}px 0;
    transition: ${variables.transitionAll};
    width: ${trackWidth}%;

    &:focus {
      outline: none;
    }

    &::-webkit-slider-runnable-track {
      ${trackCss}
      background: ${trackColor};
      border-radius: ${trackRadius}px;
      border: ${trackBorderWidth}px solid ${trackBorderColor};
      transition: ${variables.transitionAll};
    }

    &::-webkit-slider-thumb {
      ${thumbCss}
      -webkit-appearance: none;
      margin-top: ${(trackBorderWidth * -2 + trackHeight) / 2
        - thumbHeight / 2}px;
      transition: ${variables.transitionAll};
    }

    &:focus::-webkit-slider-runnable-track {
      background: ${thumbColor};
      box-shadow: ${variables.focusedShadow};
    }

    &:focus::-webkit-slider-thumb {
      border-width: 3px;
    }

    &::-moz-range-track {
      ${trackCss}
      background: ${trackColor};
      border-radius: ${trackRadius}px;
      border: ${trackBorderWidth}px solid ${trackBorderColor};
    }

    &::-moz-range-thumb {
       ${thumbCss}
    }

    &::-ms-track {
      ${trackCss} 
      background: transparent;
      border-color: transparent;
      border-width: ${thumbWidth}px 0;
      color: transparent;
    }

    &::-ms-fill-lower {
      background: ${trackColor};
      border: ${trackBorderWidth}px solid ${trackBorderColor};
      border-radius: ${trackRadius * 2}px;
    }

    &::-ms-fill-upper {
      background: ${trackColor};
      border: ${trackBorderWidth}px solid ${trackBorderColor};
      border-radius: ${trackRadius * 2}px;
    }

    &::-ms-thumb {
      ${thumbCss}
    }

    &:focus::-ms-fill-lower {
      background: ${trackColor};
    }

    &:focus::-ms-fill-upper {
      background: ${trackColor};
    }
  `;
};

const RangeInput = styled.input.attrs({ type: 'range' })`
  ${inputCss};
`;

RangeInput.displayName = 'RangeField';
RangeInput.propTypes = {
  mood: PropTypes.oneOf(moods),
  size: PropTypes.oneOf(sizes)
};
RangeInput.defaultProps = {
  size: 'normal'
};

export default RangeInput;
