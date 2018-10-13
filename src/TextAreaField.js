import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FieldContainer, { propTypes as fieldPropTypes } from './FieldContainer';
import TextAreaInput from './TextAreaInput';

const TextAreaFieldUnStyled = (props) => {
  const {
    addOnAfter,
    addOnBefore,
    className,
    help,
    label,
    tip,
    type,
    ...inputProps
  } = props;

  return (
    <FieldContainer {...props}>
      <TextAreaInput {...inputProps} type={type} />
    </FieldContainer>
  );
};

const TextAreaField = styled(TextAreaFieldUnStyled)``;

TextAreaField.displayName = 'TextAreaField';

TextAreaField.propTypes = {
  ...fieldPropTypes,
  textDirection: PropTypes.oneOf(['ltr', 'rtl'])
};

TextAreaField.defaultProps = {
  size: 'normal',
  type: 'text'
};

TextAreaField.Field = FieldContainer;

export default TextAreaField;
