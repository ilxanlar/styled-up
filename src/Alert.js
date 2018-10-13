import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from './Icon';
import commonVars from './variables';
import { feedbackMoods } from './helpers/propTypes';

export const variables = {
  padding: 15
};

export const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closable: PropTypes.bool,
  description: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.bool]),
  mood: PropTypes.oneOf(feedbackMoods),
  onClose: PropTypes.func,
  title: PropTypes.node
};

export const defaultProps = {
  children: null,
  className: '',
  closable: false,
  description: null,
  icon: true,
  mood: 'info',
  onClose: null,
  title: null
};

const IconWrapper = styled.span`
  height: 20px;
  min-height: 20px;
  min-width: 20px;
  width: 20px;
`;

const CloseIcon = styled(IconWrapper)``;
CloseIcon.displayName = 'AlertClose';

const MoodIcon = styled(IconWrapper)``;
MoodIcon.displayName = 'AlertIcon';

const Description = styled.div`
  line-height: 20px;
`;

Description.displayName = 'AlertDescription';

const Title = styled.div`
  font-weight: bold;
  line-height: 20px;
  text-transform: uppercase;

  & + ${Description} {
    margin-top: 5px;
  }
`;

Title.displayName = 'AlertTitle';

const Content = styled.div`
  flex-grow: 1;
  margin-left: ${() => variables.padding}px;
  margin-right: ${() => variables.padding}px;
`;

Content.displayName = 'AlertContent';

const Close = styled.a`
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: block;
  font-size: 150%;
  line-height: 20px;
  margin-bottom: -1px;
  margin-top: 2px;
  text-align: center;
  transition: ${() => commonVars.transitionAll};

  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;

Close.displayName = 'AlertClose';

class AlertUnStyled extends React.Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  defaultIcons = {
    error: 'alertTriangle',
    info: 'infoCircle',
    success: 'okCircle',
    warning: 'alertTriangle'
  };

  handleClose = (e) => {
    e.preventDefault();

    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const {
      className,
      icon,
      closable,
      children,
      description,
      mood,
      title
    } = this.props;
    const desc = description || children;

    let iconTag;
    if (icon === true) {
      iconTag = <Icon name={this.defaultIcons[mood]} block />;
    } else if (typeof icon === 'string') {
      iconTag = <Icon name={icon} block />;
    } else {
      iconTag = icon;
    }

    return (
      <div className={className}>
        {iconTag ? <MoodIcon>{iconTag}</MoodIcon> : null}

        <Content>
          {title ? <Title>{title}</Title> : null}
          {desc ? <Description>{desc}</Description> : null}
        </Content>

        {closable ? (
          <CloseIcon onClick={this.handleClose}>
            <Icon name="close" block />
          </CloseIcon>
        ) : null}
      </div>
    );
  }
}

const Alert = styled(AlertUnStyled).attrs({ className: 'styledup-alert' })`
  align-items: flex-start;
  background-color: ${props => commonVars.color[`${props.mood}Light`]};
  border: 1px solid rgba(0, 0, 0, 0.01);
  border-radius: ${() => commonVars.borderRadius}px;
  display: flex;
  flex-direction: row;
  padding: ${() => variables.padding}px;
  position: relative;

  ${Icon}, ${Title} {
    color: ${props => commonVars.color[props.mood]};
  }
`;

Alert.displayName = 'Alert';
Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

Alert.Icon = Icon;
Alert.Close = Close;
Alert.Title = Title;
Alert.Desc = Description;
Alert.Description = Description;

export default Alert;
