import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Icon from './Icon';
import Tooltip from './Tooltip';
import variables from './variables';
import { variables as buttonVars } from './Button';
import fadeIn from './keyframes/fadeIn';

export const propTypes = {
  addOnBefore: PropTypes.node,
  addOnAfter: PropTypes.node,
  disabled: PropTypes.bool,
  error: PropTypes.node,
  help: PropTypes.node,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  tip: PropTypes.node,
  warning: PropTypes.node
};

// HEAD ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Status = styled.div`
  font-size: 0.9em;
`;

const TipIconWrapper = styled.span`
  color: ${() => variables.color.silver};
  display: inline-block;
  height: 1em;
  line-height: 1;
  margin-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}: 5px;
  vertical-align: middle;
  width: 1em;
`;

const TipText = styled.div`
  font-size: 12px;
  max-width: 300px;
`;

const Label = styled.label`
  ${props => (props.hasError
    ? `color: ${variables.color.error};`
    : undefined)} display: inline-block;
  flex-grow: 1;
  font-weight: bold;
  vertical-align: middle;
`;

const Required = styled.span`
  color: ${() => variables.color.error};
`;

const HeadUnStyled = ({
  className,
  hasError,
  label,
  required,
  status: StatusComponent,
  theme,
  tip,
  value
}) => {
  const tipMarkup = tip ? (
    <Tooltip content={<TipText>{tip}</TipText>} placement="top" trigger="click">
      <TipIconWrapper>
        <Icon name="infoCircle" block />
      </TipIconWrapper>
    </Tooltip>
  ) : null;

  const labelMarkup = label ? (
    <Label hasError={hasError}>
      {label}
      {required ? <Required>*</Required> : null}
      {tipMarkup}
    </Label>
  ) : null;

  const statusMarkup = StatusComponent ? (
    <Status>
      <StatusComponent value={value} />
    </Status>
  ) : null;

  if (labelMarkup || statusMarkup) {
    return (
      <div className={className}>
        {labelMarkup}
        {statusMarkup}
      </div>
    );
  }

  return null;
};

const HeadUnStyledWithTheme = withTheme(HeadUnStyled);

const Head = styled(HeadUnStyledWithTheme)`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  position: relative;
`;

// FOOT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const FootError = styled.div`
  animation: 0.3s ${() => fadeIn} ease;
  color: ${() => variables.color.error};
`;

const FootWarning = styled.div`
  animation: 0.3s ${() => fadeIn} ease;
  color: ${() => variables.color.warning};
`;

const FootUnStyled = ({
  className,
  errorMessage,
  hasError,
  hasWarning,
  help,
  warningMessage
}) => {
  let feedbackMarkup = null;

  if (hasError) {
    feedbackMarkup = <FootError>{errorMessage}</FootError>;
  } else if (hasWarning) {
    feedbackMarkup = <FootWarning>{warningMessage}</FootWarning>;
  }

  if (help || feedbackMarkup) {
    return (
      <div className={className}>
        {feedbackMarkup}
        {help}
      </div>
    );
  }

  return null;
};

const Foot = styled(FootUnStyled)`
  color: ${() => variables.color.silver};
  font-size: 12px;
  line-height: 16px;
  margin-top: 8px;
`;

// MAIN ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const BodyUnStyled = ({
  addOnBefore, addOnAfter, children, className
}) => (
  <div className={className}>
    {addOnBefore || null}
    {React.cloneElement(React.Children.only(children), {
      'data-primary': 'yes'
    })}
    {addOnAfter || null}
  </div>
);

const Body = styled(BodyUnStyled)`
  position: relative;
  display: flex;
  flex-direction: row;

  .styledup-button, .styledup-field-box {
    border-radius: 0;
    margin-left: -1px;
    position: relative;

    &:first-child {
      border-bottom-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}-radius: ${
  variables.borderRadius
}px;
      border-top-${props => (props.theme && props.theme.isRTL ? 'right' : 'left')}-radius: ${
  variables.borderRadius
}px;
    }

    &:last-child {
      border-bottom-${props => (props.theme && props.theme.isRTL ? 'left' : 'right')}-radius: ${
  variables.borderRadius
}px;
      border-top-${props => (props.theme && props.theme.isRTL ? 'left' : 'right')}-radius: ${
  variables.borderRadius
}px;
    }
  }

  > :first-child {
    ${props => (props.theme && props.theme.isRTL ? undefined : 'margin-left: 0;')}
  }

  > :last-child {
    ${props => (props.theme && props.theme.isRTL ? 'margin-left: 0;' : undefined)}
  }

  .styledup-button {
    white-space: nowrap;
    z-index: 2;
  }

  .styledup-field-box {
    //width: 100px;
    z-index: 1;

    &:focus {
      z-index: 3;
    }

    &[data-primary=yes] {
      flex-grow: 1;
      width: 100%;
    }
  }
`;

const FieldUnStyled = (props) => {
  const {
    addOnAfter,
    addOnBefore,
    children,
    className,
    error,
    help,
    label,
    required,
    size,
    status,
    tip,
    value,
    warning
  } = props;

  return (
    <div className={className}>
      <Head
        hasError={!!error}
        hasWarning={!!warning}
        label={label}
        required={required}
        status={status}
        tip={tip}
        value={value}
      />

      <Body addOnAfter={addOnAfter} addOnBefore={addOnBefore} size={size}>
        {children}
      </Body>

      <Foot
        errorMessage={error}
        hasError={!!error}
        hasWarning={!!warning}
        help={help}
        warningMessage={warning}
      />
    </div>
  );
};

const Field = styled(FieldUnStyled)`
  font-size: ${props => buttonVars.size[props.size].fontSize}px;
  line-height: ${props => buttonVars.size[props.size].lineHeight};
`;

Field.propTypes = propTypes;

Field.defaultProps = {
  size: 'normal'
};

Head.Status = Status;
Head.Label = Label;
Head.Tip = TipIconWrapper;
Head.Required = Required;
Field.Head = Head;
Field.Foot = Foot;
Field.Body = Body;

export default Field;
