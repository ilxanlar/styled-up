import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CollapseComponent = styled.div`
  overflow: hidden;
  transition: all 200ms ease-in-out;
`;

const TrickyDiv = styled.div`
  height: 1px;
  margin-bottom: -1px;
`;

export default class Collapse extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool
  };

  state = {
    style: {}
  };

  content = undefined;

  hideTimeout = undefined;

  showTimeout = undefined;

  componentDidMount() {
    const { show } = this.props;

    this.setState({
      style: {
        height: show ? 'auto' : 0,
        overflow: show ? 'visible' : 'hidden',
        opacity: show ? 1 : 0
      }
    });
  }

  // @TODO: Use getDerivedStateFromProps()
  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      if (nextProps.show) {
        if (this.hideTimeout) {
          window.clearTimeout(this.hideTimeout);
        }

        this.setState({
          style: {
            height: this.getHeight(),
            overflow: 'hidden',
            opacity: 1
          }
        });

        this.showTimeout = window.setTimeout(() => {
          this.setState({
            style: {
              height: 'auto',
              overflow: 'visible',
              opacity: 1
            }
          });
        }, 200);
      }

      if (!nextProps.show) {
        if (this.showTimeout) {
          window.clearTimeout(this.showTimeout);
        }

        this.setState(
          {
            style: {
              height: this.getHeight(),
              overflow: 'hidden',
              opacity: 1
            }
          },
          () => {
            this.hideTimeout = window.setTimeout(() => {
              this.setState({
                style: {
                  height: 0,
                  overflow: 'hidden',
                  opacity: 0
                }
              });
            }, 1);
          }
        );
      }
    }
  }

  getHeight() {
    const contentData = this.content
      ? this.content.getBoundingClientRect()
      : undefined;
    return contentData ? contentData.height : undefined;
  }

  handleContentRef = (node) => {
    this.content = node;
  };

  render() {
    const { children } = this.props;

    return (
      <CollapseComponent style={this.state.style}>
        <div ref={this.handleContentRef}>
          {children}
          <TrickyDiv />
        </div>
      </CollapseComponent>
    );
  }
}
