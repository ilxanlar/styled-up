import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from './Icon';
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

const HiddenRadioInput = styled.input.attrs({ type: 'radio' })`
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

const IconChecked = styled(Icon)``;

const IconUnchecked = styled(Icon)``;

const IconWrapper = styled.span`
  height: ${props => variables.size[props.size]}px;
  line-height: 1;
  min-width: ${props => variables.size[props.size]}px;
  position: relative;
  width: ${props => variables.size[props.size]}px;
`;

const WrapperLabel = styled.label`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  line-height: 1;
  ${props => (props.disabled ? `opacity: ${commonVars.opacityDisabled};` : undefined)}
  position: relative;

  ${IconChecked} {
    color: ${props => commonVars.color[props.mood]};
    display: none;
  }

  ${IconUnchecked} {
    color: ${() => commonVars.color.silver};
  }

  ${HiddenRadioInput}:checked + ${IconWrapper} {
    ${IconChecked} {
      display: block;
    }

    ${IconUnchecked} {
      display: none;
    }
  }
`;

const RadioInputUnStyled = (props) => {
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
      <IconWrapper key="icon" {...props}>
        <IconChecked name="radioCheckedForced" block />
        <IconUnchecked name="radioUnchecked" block />
      </IconWrapper>,

      description ? (
        <Description key="description" size={size}>
          {description}
        </Description>
      ) : null
    ];
  }

  return (
    <WrapperLabel disabled={disabled} mood={mood}>
      <HiddenRadioInput {...inputProps} disabled={disabled} />
      {labelMain}
    </WrapperLabel>
  );
};

const RadioInput = styled(RadioInputUnStyled)``;

RadioInput.WrapperLabel = WrapperLabel;
RadioInput.Description = Description;
RadioInput.displayName = 'RadioInput';
RadioInput.propTypes = propTypes;
RadioInput.defaultProps = {
  mood: 'primary',
  size: 'normal'
};

export default RadioInput;
