import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FieldContainer, { propTypes as fieldPropTypes } from './FieldContainer';
import FileInput from './FileInput';

const FileFieldUnStyled = (props) => {
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
      <FileInput {...inputProps} />
    </FieldContainer>
  );
};

const FileField = styled(FileFieldUnStyled)``;

FileField.Input = FileInput;
FileField.displayName = 'FileField';
FileField.propTypes = {
  ...fieldPropTypes,
  removeLabel: PropTypes.node
};
FileField.defaultProps = {
  size: 'normal',
  removeLabel: '✕' // '×'
};

export default FileField;
