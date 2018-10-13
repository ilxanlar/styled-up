import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import commonVars from './variables';
import { responsivePropType } from './helpers/propTypes';
import { makeCssForResponsiveProp } from './helpers/utils';
import { lighten } from './helpers/color';
import loadingByOpacity from './keyframes/loadingByOpacity';

export const variables = {
  size: {
    small: {
      paddingH: 8,
      paddingV: 2
    },
    normal: {
      paddingH: 10,
      paddingV: 4
    },
    large: {
      paddingH: 20,
      paddingV: 6
    }
  }
};

const moodCss = ({
  disabled, glass, working, mood
}) => {
  const prefix = glass ? `${mood}Light` : mood;

  const normalCss = css`
    background-color: ${glass ? 'transparent' : commonVars.color[prefix]};
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: ${glass ? commonVars.color[mood] : '#fff'};

    &[disabled] {
      cursor: not-allowed;
    }
  `;

  const hoverCss = disabled
    ? undefined
    : css`
        &:hover {
          background-color: ${lighten(commonVars.color[prefix], 5)};
        }
      `;

  const focusCss = disabled
    ? undefined
    : css`
        &:focus {
          background-color: ${lighten(commonVars.color[prefix], 5)};
        }
      `;

  const activeCss = disabled
    ? undefined
    : css`
        &:active {
          background-color: ${commonVars.color[prefix]};
        }
      `;

  const disabledCss = disabled && !working
    ? css`
          &[disabled] {
            background-color: ${glass
    ? 'transparent'
    : commonVars.color.disabledLight};
            border-color: transparent;
            color: ${commonVars.color.disabled};
          }
        `
    : undefined;

  return css`
    ${normalCss}
    ${hoverCss}
    ${focusCss}
    ${activeCss}
    ${disabledCss}
  `;
};

const sizeCss = (value, { ghost }) => {
  const sizeData = variables.size[value];
  const paddingH = sizeData.paddingH - (ghost ? 1 : 0);
  const paddingV = sizeData.paddingV - (ghost ? 1 : 0);

  return css`
    border-radius: ${commonVars.borderRadius}px;
    font-size: ${commonVars.fontSize[value]}px;
    line-height: ${commonVars.rootLineHeight};
    padding: ${paddingV}px ${paddingH}px;
  `;
};

const Button = styled.button.attrs({ className: 'styledup-button' })`
  align-items: center;
  cursor: default;
  display: inline-flex;
  font-weight: normal;
  justify-content: center;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transition: ${() => commonVars.transitionAll};
  vertical-align: middle;
  ${props => (props.working ? `animation: 2s ${loadingByOpacity} infinite;` : undefined)}
  ${props => (props.block ? 'width: 100%;' : undefined)}

  ${moodCss}
  ${makeCssForResponsiveProp('size', sizeCss)}
`;

export const moods = ['primary', 'secondary', 'tertiary'];

export const propTypes = {
  block: PropTypes.bool, // @TODO: Make block prop responsive
  disabled: PropTypes.bool,
  glass: PropTypes.bool,
  mood: PropTypes.oneOf(moods),
  size: responsivePropType,
  working: PropTypes.bool
};

Button.displayName = 'Button';
Button.propTypes = propTypes;
Button.defaultProps = {
  type: 'button',
  size: 'normal',
  mood: 'primary'
};

export default Button;
