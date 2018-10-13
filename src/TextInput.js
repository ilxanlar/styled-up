import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import commonVars from './variables';
import { variables as buttonVars } from './Button';
import { sizes } from './helpers/propTypes';

export const variables = {
  placeholderColor: commonVars.color.silver
};

const directionCss = ({ textDirection }) => css`
  direction: ${textDirection};
  text-align: ${textDirection === 'ltr' ? 'left' : 'right'};
`;

const inputEnabledNormalCss = () => css`
  &:hover {
    border-color: ${commonVars.color.cream};
  }

  &:focus {
    border-color: ${commonVars.color.primary};
    box-shadow: ${commonVars.focusedShadow};
  }
`;

const inputEnabledFocusedCss = () => css`
  border-color: ${commonVars.color.primary};
  box-shadow: ${commonVars.focusedShadow};
`;

const inputDisabledCss = () => css`
  cursor: not-allowed;
  opacity: ${commonVars.opacityDisabled};

  &,
  &:hover,
  &:focus {
    border-color: ${commonVars.color.disabled};
  }
`;

const inputErrorCss = () => css`
  &,
  &:hover,
  &:focus {
    border-color: ${commonVars.color.error} !important;
  }
`;

const inputCss = ({ disabled, size }) => css`
  background: ${disabled
    ? commonVars.color.disabledLight
    : commonVars.color.white};
  border: 1px solid ${commonVars.color.cream};
  border-radius: ${commonVars.borderRadius}px;
  font-size: ${commonVars.fontSize[size]}px;
  line-height: ${commonVars.rootLineHeight};
  padding: ${buttonVars.size[size].paddingV}px
    ${buttonVars.size[size].paddingH}px;
  transition: ${commonVars.transitionAll};
`;

const TextInput = styled.input.attrs({ className: 'styledup-field-box' })`
  display: block;
  position: relative;
  width: 100%;

  ${inputCss}
  ${props => (props.textDirection ? directionCss(props) : undefined)}
  ${props => (props.isFocused ? inputEnabledFocusedCss() : inputEnabledNormalCss())}
  ${props => (props.disabled ? inputDisabledCss() : undefined)}
  ${props => (!props.disabled && props.error ? inputErrorCss() : undefined)}
`;

TextInput.propTypes = {
  error: PropTypes.node,
  size: PropTypes.oneOf(sizes),
  textDirection: PropTypes.oneOf(['ltr', 'rtl'])
};

TextInput.defaultProps = {
  size: 'normal'
};

export default TextInput;
