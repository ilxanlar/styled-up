import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import BaseButton, { propTypes as buttonPropTypes } from './Button';
import BaseMenu, { propTypes as menuPropTypes } from './Menu';
import Popper, { propTypes as popperPropTypes } from './Popper';
import Icon from './Icon';
import variables from './variables';

export const propTypes = {
  buttonProps: PropTypes.shape(buttonPropTypes),
  caretIcon: PropTypes.string,
  menuProps: PropTypes.shape(menuPropTypes),
  noCaret: PropTypes.bool,
  popperProps: PropTypes.shape(popperPropTypes),
  text: PropTypes.node
};

const Button = styled(BaseButton)``;

const Menu = styled(BaseMenu)`
  border: 1px solid ${() => variables.color.creamLight};
  box-shadow: ${() => variables.popoverShadow};
`;

class DropdownThemeless extends React.Component {
  state = {
    show: false
  };

  bySelf = false;

  componentDidMount() {
    window.addEventListener('click', this.handleClickAnywhere);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickAnywhere);
  }

  handleClickAnywhere = () => {
    if (!this.bySelf && this.state.show) {
      this.setState({ show: false });
    }

    this.bySelf = false;
  };

  handleClickButton = () => {
    this.bySelf = true;

    if (!this.state.show) {
      this.setState({ show: true });
    }
  };

  handleClickMenuItems = () => {
    this.setState({ show: false });
  };

  handleClickMenu = () => {
    this.bySelf = true;
  };

  render() {
    const {
      buttonProps,
      caretIcon,
      children,
      menuProps,
      noCaret,
      popperProps,
      text
    } = this.props;
    const trigger = this.state.show ? 'always' : 'never';

    const content = (
      <Menu
        {...menuProps}
        onClick={this.handleClickMenu}
        onClickItem={this.handleClickMenuItems}
      >
        {children}
      </Menu>
    );

    return (
      <Popper
        placement="bottom-start"
        offsetPx={1}
        {...popperProps}
        trigger={trigger}
        content={content}
      >
        <Button
          mood="tertiary"
          {...buttonProps}
          onClick={this.handleClickButton}
        >
          {text || null}
          {!noCaret && text ? <span>&nbsp;</span> : null}
          {!noCaret ? <Icon name={caretIcon} /> : null}
        </Button>
      </Popper>
    );
  }
}

const Dropdown = withTheme(DropdownThemeless);

Dropdown.Button = Button;
Dropdown.Menu = Menu;
Dropdown.Item = Menu.Item;
Dropdown.Group = Menu.Group;
Dropdown.Separator = Menu.Separator;
Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = propTypes;
Dropdown.defaultProps = {
  caretIcon: 'arrowDown'
};

export default Dropdown;
