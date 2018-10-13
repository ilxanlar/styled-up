import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FieldContainer, { propTypes as fieldPropTypes } from './FieldContainer';
import TextInput from './TextInput';

const TextFieldUnStyled = (props) => {
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
      <TextInput {...inputProps} type={type} />
    </FieldContainer>
  );
};

const TextField = styled(TextFieldUnStyled)``;

TextField.displayName = 'TextField';

TextField.propTypes = {
  ...fieldPropTypes,
  textDirection: PropTypes.oneOf(['ltr', 'rtl'])
};

TextField.defaultProps = {
  size: 'normal',
  type: 'text'
};

TextField.Field = FieldContainer;

export default TextField;
