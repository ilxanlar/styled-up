import styled from 'styled-components';
import TextInput from './TextInput';

const TextAreaInput = styled(TextInput.withComponent('textarea'))`
  max-width: 100%;
  min-width: 100%;
`;

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;
