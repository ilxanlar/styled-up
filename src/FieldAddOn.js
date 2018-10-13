import styled from 'styled-components';
import FieldBox from './TextInput';
import variables from './variables';

const FieldAddOn = styled(FieldBox.withComponent('span'))`
  align-items: center;
  background-color: ${() => variables.color.creamLight};
  border-color: transparent !important;
  display: flex;
  justify-content: center;
  padding-bottom: 0;
  padding-top: 0;
  width: auto !important;
`;

FieldAddOn.displayName = 'FieldAddOn';

export default FieldAddOn;
