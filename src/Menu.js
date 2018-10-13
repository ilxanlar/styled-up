import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Collapse from './Collapse';
import Icon from './Icon';
import variables from './variables';

const MenuSeparator = styled.li`
  background-color: ${() => variables.color.creamLighter};
  display: block;
  height: ${props => props.height}px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

MenuSeparator.displayName = 'MenuSeparator';
MenuSeparator.propTypes = {
  height: PropTypes.number
};
MenuSeparator.defaultProps = {
  height: 1
};

const MenuItemIconWrapper = styled.span`
  line-height: 1;
  margin-${props => (props.theme && props.theme.isRTL ? 'left' : 'right')}: 10px;
`;

const MenuItemSecondaryIconWrapper = styled.span`
  line-height: 1;
  margin-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}: 10px;
  transition: ${() => variables.transitionAll};
  ${props => (props.rotateSecondaryIcon ? 'transform: rotate(180deg);' : undefined)}
`;

const MenuItemTextWrapper = styled.span`
  flex-grow: 1;
`;

const MenuGroupIconWrapper = styled.span``;

const MenuItemInside = ({
  icon, rotateSecondaryIcon, secondaryIcon, text
}) => [
  icon ? (
    <MenuItemIconWrapper key="icon">
      <Icon name={icon} />
    </MenuItemIconWrapper>
  ) : null,
  <MenuItemTextWrapper key="text">{text}</MenuItemTextWrapper>,
  secondaryIcon ? (
    <MenuItemSecondaryIconWrapper
      key="secondaryIcon"
      rotateSecondaryIcon={rotateSecondaryIcon}
    >
      <Icon name={secondaryIcon} />
    </MenuItemSecondaryIconWrapper>
  ) : null
];

const MenuItemAnchor = styled.a``;

const Context = React.createContext();

class MenuItemUnStyled extends React.PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    icon: PropTypes.string,
    secondaryIcon: PropTypes.string,
    text: PropTypes.node
  };

  render() {
    const {
      active,
      children,
      className,
      icon,
      secondaryIcon,
      text,
      ...props
    } = this.props;

    return (
      <Context.Consumer>
        {(onClickItem) => {
          const onClick = (event) => {
            onClickItem();

            if (props.onClick) {
              props.onClick(event);
            }
          };

          return (
            <li>
              <a className={className} {...props} onClick={onClick}>
                {children || (
                  <MenuItemInside
                    icon={icon}
                    secondaryIcon={secondaryIcon}
                    text={text}
                  />
                )}
              </a>
            </li>
          );
        }}
      </Context.Consumer>
    );
  }
}

class MenuGroupUnStyled extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    text: PropTypes.node,
    open: PropTypes.bool
  };

  static defaultProps = {
    open: false
  };

  state = {
    open: false
  };

  static getDerivedStateFromProps(props, prevState) {
    if (props.open !== prevState.open) {
      return { open: props.open };
    }

    return null;
  }

  handleChildrenVisibility = (event) => {
    this.setState(prevState => ({ open: !prevState.open }));

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  render() {
    const {
      children, className, icon, text, ...props
    } = this.props;
    const { open } = this.state;

    return (
      <li data-submenu={open ? 'open' : 'close'}>
        <a
          className={className}
          {...props}
          onClick={this.handleChildrenVisibility}
        >
          <MenuItemInside
            icon={icon}
            rotateSecondaryIcon={open}
            secondaryIcon="arrowDown"
            text={text}
          />
        </a>

        <Collapse show={open}>
          <ul>{children}</ul>
        </Collapse>
      </li>
    );
  }
}

class MenuUnStyled extends React.PureComponent {
  static defaultProps = {
    onClickItem: () => {}
  };

  render() {
    const {
      children, className, onClickItem, ...navProps
    } = this.props;

    return (
      <Context.Provider value={onClickItem}>
        <nav {...navProps} className={className}>
          <ul>{children}</ul>
        </nav>
      </Context.Provider>
    );
  }
}

const MenuItem = styled(MenuItemUnStyled)``;

const MenuGroup = styled(MenuGroupUnStyled)`
  ${MenuItemSecondaryIconWrapper} {
    color: ${() => variables.color.silver};
  }
`;

const Menu = styled(MenuUnStyled)`
  background-color: #fff;
  border-radius: ${() => variables.borderRadius}px;
  min-width: 200px;
  padding-bottom: 5px;
  padding-top: 5px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      a {
        align-items: center;
        cursor: pointer;
        color: inherit;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 3px 15px;
        transition: ${() => variables.transitionAll};
      }

      a:hover {
        background-color: ${() => variables.color.creamLighter};
      }

      ${MenuSeparator} {
        margin-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}: 30px;
      }

      li ${MenuSeparator} {
        margin-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}: 45px;
      }

      li li ${MenuSeparator} {
        margin-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}: 60px;
      }

      li li li ${MenuSeparator} {
        margin-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}: 75px;
      }

      li a {
        padding-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}: 30px;
      }

      li li a {
        padding-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}: 45px;
      }

      li li li a {
        padding-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}: 60px;
      }

      li li li li a {
        padding-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}: 75px;
      }
    }
  }
`;

export const propTypes = {};

Menu.Item = MenuItem;
Menu.Group = MenuGroup;
Menu.Separator = MenuSeparator;
Menu.displayName = 'Menu';
Menu.propTypes = propTypes;

export default Menu;
