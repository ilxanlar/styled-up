import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import commonVars from './variables';
import { moods, sizes } from './helpers/propTypes';

export const variables = {
  size: {
    small: 16,
    normal: 20,
    large: 24
  }
};

export const propTypes = {
  description: PropTypes.node,
  customMarkup: PropTypes.node,
  size: PropTypes.oneOf(sizes),
  mood: PropTypes.oneOf(moods)
};

const HiddenSwitchInput = styled.input.attrs({ type: 'checkbox' })`
  filter: alpha(opacity=0);
  height: 1px;
  opacity: 0;
  position: absolute;
  width: 1px;
  z-index: -1;
`;

const Description = styled.span`
  font-size: ${props => commonVars.fontSize[props.size]}px;
  line-height: ${() => variables.size.small}px;
  margin-top: ${props => (variables.size[props.size] - variables.size.small) / 2}px;
  margin-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}: 8px;
`;

const switchOffCss = props => css`
  background-color: ${commonVars.color.silver};

  &:before {
    ${props.theme && props.theme.isRTL ? 'right' : 'left'}: 2px;
  }
`;

const switchOnCss = props => css`
  background-color: ${commonVars.color[props.mood]};

  &:before {
    ${props.theme && props.theme.isRTL ? 'right' : 'left'}: ${variables.size[
  props.size
]
      * 0.7
      + 2}px;
  }
`;

const Trigger = styled.span`
  border-radius: ${props => variables.size[props.size] / 2}px;
  border: none;
  height: ${props => variables.size[props.size]}px;
  position: relative;
  width: ${props => variables.size[props.size] * 1.7}px;

  &:before {
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
    content: '';
    display: block;
    height: ${props => variables.size[props.size] - 4}px;
    position: absolute;
    top: 2px;
    transition: ${() => commonVars.transitionAll};
    width: ${props => variables.size[props.size] - 4}px;
  }
`;

const WrapperLabel = styled.label`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  line-height: 1;
  ${props => (props.disabled ? `opacity: ${commonVars.opacityDisabled};` : undefined)}
  position: relative;
  vertical-align: middle;

  ${Trigger} {
    ${switchOffCss}
  }

  ${HiddenSwitchInput}:checked + ${Trigger} {
    ${switchOnCss}
  }
`;

const SwitchInputUnStyled = (props) => {
  const {
    customMarkup,
    description,
    disabled,
    mood,
    size,
    ...inputProps
  } = props;

  let labelMain;
  if (customMarkup) {
    labelMain = customMarkup;
  } else {
    labelMain = [
      <Trigger key="trigger" size={size} />,

      description ? (
        <Description key="description" size={size}>
          {description}
        </Description>
      ) : null
    ];
  }

  return (
    <WrapperLabel disabled={disabled} mood={mood} size={size}>
      <HiddenSwitchInput {...inputProps} disabled={disabled} />
      {labelMain}
    </WrapperLabel>
  );
};

const SwitchInput = styled(SwitchInputUnStyled)``;

SwitchInput.WrapperLabel = WrapperLabel;
SwitchInput.Description = Description;
SwitchInput.displayName = 'SwitchInput';
SwitchInput.propTypes = propTypes;
SwitchInput.defaultProps = {
  mood: 'primary',
  size: 'normal'
};

export default SwitchInput;
