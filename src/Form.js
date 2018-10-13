import styled from 'styled-components';
import Button from './Button';
import Field from './FieldContainer';

const Form = styled.form`
  ${Field} {
    margin-bottom: 30px;

    ${Field} {
      margin-bottom: 0;
    }
  }
`;

const Footer = styled.footer`
  &:after {
    clear: both;
    content: '';
    display: block;
  }
`;

const FooterLeft = styled.div`
  float: left;

  ${Button} {
    margin-right: 10px;
  }
`;

const FooterRight = styled.div`
  float: right;

  ${Button} {
    margin-left: 10px;
  }
`;

Footer.Left = FooterLeft;
Footer.Right = FooterRight;
Form.Footer = Footer;

export default Form;
