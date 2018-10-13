import React from 'react';
import styled from 'styled-components';
import FieldContainer, { propTypes as fieldPropTypes } from './FieldContainer';
import SelectInput from './SelectInput';
import { selectableHelper, selectablePropTypes } from './helpers/utils';

const SelectFieldUnStyled = (props) => {
  const {
    addOnAfter,
    addOnBefore,
    children,
    className,
    help,
    label,
    options,
    optionDisabled,
    optionLabel,
    optionValue,
    tip,
    ...inputProps
  } = props;

  let optionTags;

  if (children) {
    optionTags = children;
  } else {
    optionTags = options.map((opt, key) => {
      const optLabel = selectableHelper.label(opt, optionLabel);
      const optValue = selectableHelper.value(opt, optionValue);
      const optDisabled = selectableHelper.disabled(opt, optionDisabled);

      return (
        <option key={key} value={optValue} disabled={optDisabled}>
          {optLabel}
        </option>
      );
    });

    if (inputProps.placeholder) {
      optionTags = [
        <option key="placeholder" disabled={inputProps.required} value="">
          {inputProps.placeholder}
        </option>,
        ...optionTags
      ];
    }
  }

  return (
    <FieldContainer {...props}>
      <SelectInput {...inputProps}>{optionTags}</SelectInput>
    </FieldContainer>
  );
};

const SelectField = styled(SelectFieldUnStyled)``;

SelectField.displayName = 'SelectField';

SelectField.propTypes = {
  ...fieldPropTypes,
  ...selectablePropTypes
};

SelectField.defaultProps = {
  options: [],
  size: 'normal'
};

export default SelectField;
