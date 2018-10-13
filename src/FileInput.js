import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variables as buttonVars } from './Button';
import TextInput, { variables as textInputVars } from './TextInput';
import commonVars from './variables';
import { sizes } from './helpers/propTypes';

const ChooseButton = styled(TextInput.withComponent('span'))`
  cursor: pointer;
  min-width: 10px;
  position: relative;
  width: auto;
`;

const RealFileInput = styled.input.attrs({ type: 'file' })`
  filter: alpha(opacity=0);
  height: 1px;
  opacity: 0;
  position: absolute;
  width: 1px;
  z-index: -1;

  &:focus + ${ChooseButton}, &:active + ${ChooseButton} {
    border-color: ${() => commonVars.color.primary};
    box-shadow: ${() => commonVars.focusedShadow};
  }
`;

const Placeholder = styled.div`
  ${props => (props.hasFile ? undefined : `color: ${textInputVars.placeholderColor};`)}
  margin-${props => (props.theme && props.theme.isRTL ? 'left' : 'right')}: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Remove = styled.span`
  cursor: pointer;
  line-height: 1;
  position: absolute;
  padding: 5px;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  transition: ${() => commonVars.transitionAll};
  ${props => (props.theme && props.theme.isRTL ? 'left' : 'right')}: ${props => buttonVars.size[props.inputSize].paddingH}px;

  &:hover {
    color: ${() => commonVars.color.error};
  }
`;

class FileInputUnStyled extends React.PureComponent {
  handleRef = (node) => {
    this.input = node;
  };

  handleChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event);
    }

    this.forceUpdate();
  };

  handleRemove = (event) => {
    event.preventDefault();

    if (this.input) {
      this.input.value = '';
    }

    if (this.props.onChange) {
      this.props.onChange('');
    }

    this.forceUpdate();
  };

  render() {
    const {
      className,
      disabled,
      error,
      placeholder,
      removeLabel,
      required,
      size,
      value,
      warning
    } = this.props;
    const hasFile = this.input && this.input.value;
    const fileName = hasFile ? this.input.value : placeholder;

    return (
      <label className={className}>
        <RealFileInput
          disabled={disabled}
          ref={this.handleRef}
          onChange={this.handleChange}
        />

        <ChooseButton
          disabled={disabled}
          error={error}
          size={size}
          warning={warning}
        >
          <Placeholder hasFile={hasFile}>{fileName}</Placeholder>

          {hasFile ? (
            <Remove onClick={this.handleRemove} inputSize={size}>
              {removeLabel}
            </Remove>
          ) : null}
        </ChooseButton>
      </label>
    );
  }
}

const FileInput = styled(FileInputUnStyled)`
  display: block;
`;

FileInput.displayName = 'FileInput';
FileInput.propTypes = {
  fileName: PropTypes.node,
  removeLabel: PropTypes.node,
  size: PropTypes.oneOf(sizes)
};
FileInput.defaultProps = {
  placeholder: 'Choose a file',
  removeLabel: '✕', // '×'
  size: 'normal'
};

export default FileInput;
