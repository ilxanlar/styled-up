import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FieldContainer, { propTypes as fieldPropTypes } from './FieldContainer';
import RangeInput from './RangeInput';
import variables from './variables';

const NumberWrapper = styled.span`
  color: ${() => variables.color.gray};
  direction: ltr;
  font-size: 12px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  
  ${RangeInput} {
    flex-grow: 1;
  }

  ${NumberWrapper} {
    &:first-child {
      margin-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}: 0;
    }

    &:last-child {
      margin-${props => (props.theme && props.theme.isRTL ? 'left' : 'right')}: 0;
    }
  }
`;

const RangeFieldUnStyled = (props) => {
  const {
    addOnAfter,
    addOnBefore,
    className,
    help,
    label,
    max,
    min,
    showNumbers,
    tip,
    type,
    ...inputProps
  } = props;

  return (
    <FieldContainer {...props}>
      <Wrapper>
        {showNumbers && typeof min !== 'undefined' ? (
          <NumberWrapper>{min}</NumberWrapper>
        ) : null}
        <RangeInput {...inputProps} max={max} min={min} />
        {showNumbers && typeof max !== 'undefined' ? (
          <NumberWrapper>{max}</NumberWrapper>
        ) : null}
      </Wrapper>
    </FieldContainer>
  );
};

const RangeField = styled(RangeFieldUnStyled)``;

RangeField.Field = FieldContainer;
RangeField.Input = RangeInput;
RangeField.displayName = 'RangeField';
RangeField.propTypes = {
  ...fieldPropTypes,
  showNumbers: PropTypes.bool
};
RangeField.defaultProps = {
  showNumbers: false,
  size: 'normal'
};

export default RangeField;
