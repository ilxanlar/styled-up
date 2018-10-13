import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Popper as BasePopper } from 'react-popper';
import Theme from './Theme';
import variables from './variables';

export const availablePlacements = [
  'auto',
  'auto-start',
  'auto-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
  'top',
  'top-start',
  'top-end'
];

export const propTypes = {
  arrow: PropTypes.bool,
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  trigger: PropTypes.oneOf(['always', 'never', 'mouseOver', 'focus', 'click']),
  unTrigger: (props, propName, componentName) => {
    const available = {
      mouseOver: ['mouseOut', 'clickOutside'],
      focus: ['blur', 'clickOutside'],
      click: ['click', 'clickOutside']
    };

    if (
      props.trigger
      && props.unTrigger
      && !available[props.trigger].includes(props.unTrigger)
    ) {
      const unTriggers = available[props.trigger]
        .map(unTrig => `'${unTrig}'`)
        .join(' or ');
      return new Error(
        `Invalid prop 'unTrigger' supplied to ${componentName}. If you use '${
          props.trigger
        }' for trigger, You can only use ${unTriggers} for unTrigger'`
      );
    }
  },
  placement: PropTypes.oneOf(availablePlacements),
  offset: PropTypes.oneOf(['none', 'small', 'normal', 'large']),
  offsetPx: PropTypes.number,
  showDelay: PropTypes.number,
  hideDelay: PropTypes.number
};

const Arrow = styled.div`
  display: none;
`;

const Content = styled.div``;

const Container = styled.div``;

class PopperUnStyled extends React.Component {
  static propTypes = propTypes;

  state = {
    show: false
  };

  canNotHideOverlay = false;

  childNode = undefined;

  defaultUnTriggers = {
    mouseOver: 'mouseOut',
    focus: 'blur',
    click: 'clickOutside'
  };

  targetNode = undefined;

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.show === true && nextProps.trigger === 'never') {
      return { show: false };
    }
    if (prevState.show === false && nextProps.trigger === 'always') {
      return { show: true };
    }
    return null;
  }

  componentDidMount() {
    this.childNode = ReactDOM.findDOMNode(this);
    this.childNode.addEventListener('mouseover', this.handleMouseOver);
    this.childNode.addEventListener('mouseout', this.handleMouseOut);
    this.childNode.addEventListener('focus', this.handleFocus);
    this.childNode.addEventListener('blur', this.handleBlur);
    this.childNode.addEventListener('click', this.handleClick);
    window.addEventListener('click', this.handleClickOutside);
    this.createTargetNode();
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.childNode.removeEventListener('mouseover', this.handleMouseOver);
    this.childNode.removeEventListener('mouseout', this.handleMouseOut);
    this.childNode.removeEventListener('focus', this.handleFocus);
    this.childNode.removeEventListener('blur', this.handleBlur);
    this.childNode.removeEventListener('click', this.handleClick);
    window.removeEventListener('click', this.handleClickOutside);
    this.destroyTargetNode();
  }

  getRealPlacement = () => {
    const { placement, theme } = this.props;

    if (
      theme
      && theme.isRTL
      && (placement.indexOf('bottom') !== -1 || placement.indexOf('top') !== -1)
    ) {
      if (placement.indexOf('start') !== -1) {
        return placement.replace('start', 'end');
      }
      if (placement.indexOf('end') !== -1) {
        return placement.replace('end', 'start');
      }
    }

    return placement;
  };

  getUnTrigger = () => this.props.unTrigger || this.defaultUnTriggers[this.props.trigger];

  createTargetNode() {
    if (!this.targetNode) {
      this.targetNode = document.createElement('div');
      document.body.appendChild(this.targetNode);
    }
  }

  destroyTargetNode() {
    if (this.targetNode) {
      this.targetNode.parentNode.removeChild(this.targetNode);
    }
  }

  handleMouseOver = () => {
    if (this.props.trigger === 'mouseOver' && !this.state.show) {
      this.setState({ show: true });
    }
  };

  handleMouseOut = () => {
    if (this.getUnTrigger() === 'mouseOut' && this.state.show) {
      this.setState({ show: false });
    }
  };

  handleFocus = () => {
    if (this.props.trigger === 'focus' && !this.state.show) {
      this.setState({ show: true });
    }
  };

  handleBlur = () => {
    if (this.getUnTrigger() === 'blur' && this.state.show) {
      this.setState({ show: false });
    }
  };

  handleClick = () => {
    this.canNotHideOverlay = true;

    if (this.state.show) {
      if (this.props.unTrigger === 'click') {
        this.setState({ show: false });
      }
    } else if (this.props.trigger === 'click') {
      this.setState({ show: true });
    }
  };

  handleClickOutside = () => {
    if (
      !this.canNotHideOverlay
      && this.getUnTrigger() === 'clickOutside'
      && this.state.show
    ) {
      this.setState({ show: false });
    }

    this.canNotHideOverlay = false;
  };

  render() {
    const {
      arrow,
      children,
      className,
      content,
      offset,
      offsetPx
    } = this.props;
    const placement = this.getRealPlacement();
    const offsetValue = offsetPx || variables.space[offset];
    const modifiers = {
      offset: {
        offset: `0, ${offsetValue}`
      }
    };

    return [
      React.Children.only(children),
      this.state.show && this.targetNode
        ? ReactDOM.createPortal(
          <BasePopper
            modifiers={modifiers}
            referenceElement={this.childNode}
            placement={placement}
            key="popover"
          >
            {({
              ref, style, placement, arrowProps
            }) => (
              <Container
                className={className}
                ref={ref}
                style={style}
                data-placement={placement}
              >
                <Content data-placement={placement}>
                  <Theme>{content}</Theme>
                </Content>

                {arrow && (
                  <Arrow
                    data-placement={placement}
                    ref={arrowProps.ref}
                    style={arrowProps.style}
                  />
                )}
              </Container>
            )}
          </BasePopper>,
          this.targetNode
        )
        : null
    ];
  }
}

const PopperWithTheme = withTheme(PopperUnStyled);

const Popper = styled(PopperWithTheme)`
  z-index: 9999;
`;

Popper.Container = Container;
Popper.Content = Content;
Popper.Arrow = Arrow;
Popper.propTypes = propTypes;
Popper.defaultProps = {
  arrow: false,
  offset: 'normal',
  placement: 'bottom',
  trigger: 'mouseOver',
  showDelay: 0,
  hideDelay: 0
};

export default Popper;
