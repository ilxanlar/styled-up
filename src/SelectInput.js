import styled, { css } from 'styled-components';
import { variables as buttonVars } from './Button';
import TextInput from './TextInput';
import variables from './variables';

const singleCss = ({ size, theme }) => {
  const height = Math.floor(
    variables.fontSize[size] * variables.rootLineHeight
      + 2 * buttonVars.size[size].paddingV
      + 2
  );

  return css`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M14.985%2025.166L2.997%2013.178q-.46-.46-.46-1.11t.46-1.094%201.11-.444%201.094.444l10.784%2010.8%2010.99-10.99q.46-.444%201.11-.444t1.093.444.444%201.094-.443%201.094L17.19%2024.96q-.604.603-1.206.603t-1-.396z%22%20fill%3D%22%23919496%22%20/%3E%3C/svg%3E');
    background-position: ${theme && theme.isRTL ? 'left' : 'right'} 16px center;
    background-repeat: no-repeat;
    background-size: 12px;
    height: ${height}px;
    max-height: ${height}px;
    min-height: ${height}px;
    padding-${theme && theme.isRTL ? 'left' : 'right'}: 48px;
    text-indent: .01px;
    text-overflow: '';
  `;
};

const SelectInput = styled(TextInput.withComponent('select'))`
  ${props => (props.multiple ? undefined : singleCss(props))};
`;

SelectInput.displayName = 'SelectInput';

SelectInput.defaultProps = {
  size: 'normal'
};

export default SelectInput;
