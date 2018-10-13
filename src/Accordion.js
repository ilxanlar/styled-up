import React from 'react';
import styled from 'styled-components';
import Collapse from './Collapse';
import variables from './variables';

const Button = styled.a`
  cursor: pointer;
  display: block;
  padding: 10px 15px;
  width: 100%;
`;

const Content = styled.div`
  padding: 0 15px 10px;
`;

const ItemWrapper = styled.div``;

const Wrapper = styled.div`
  background: ${variables.color.white};
  border: 1px solid ${variables.color.creamLight};
  border-radius: ${variables.borderRadius}px;

  ${ItemWrapper} {
    border-bottom: 1px solid ${variables.color.creamLighter};

    &:last-child {
      border-bottom: none;
    }
  }
`;

class AccordionUnStyled extends React.PureComponent {
  handleClickButton = (key) => {
    if (this.props.onChange) {
      this.props.onChange(key);
    }
  };

  render() {
    const { children, activeKey } = this.props;

    return (
      <Wrapper>
        {React.Children.map(children, (child, key) => (
          <ItemWrapper key={key}>
            <Button onClick={this.handleClickButton.bind(this, child.key)}>
              {child.props.title}
            </Button>

            <Collapse show={child.key === activeKey}>{child}</Collapse>
          </ItemWrapper>
        ))}
      </Wrapper>
    );
  }
}

const Accordion = styled(AccordionUnStyled)``;

Accordion.Item = Content;

export default Accordion;
