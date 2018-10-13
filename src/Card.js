import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { makeCssForResponsiveProp } from './helpers/utils';
import { responsivePropType } from './helpers/propTypes';
import variables from './variables';

export const propTypes = {
  border: responsivePropType,
  blockOnLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  padding: responsivePropType
};

export const defaultProps = {
  border: true,
  padding: 'normal',
  loading: false,
  blockOnLoading: true,
  disabled: false
};

const blockerCss = css`
  &:after {
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const overlayCss = (value) => {
  const space = typeof value === 'string' ? 2 * variables.space[value] : value;

  return css`
    bottom: ${space}px;
    left: ${space}px;
    right: ${space}px;
    top: ${space}px;
  `;
};

const Overlay = styled.div`
  position: absolute;
  ${props => (props.position === 'top'
    ? 'bottom: auto !important;'
    : 'top: auto !important;')};
`;

const coverMarginCss = (value) => {
  const margin = -1 * (typeof value === 'string' ? 2 * variables.space[value] : value);

  return css`
    margin: ${margin}px ${margin}px 0 ${margin}px;
  `;
};

const Cover = styled.figure`
  position: relative;

  img {
    border-radius: ${() => `${variables.borderRadius}px ${variables.borderRadius}px 0 0`};
    display: block;
    height: auto;
    width: 100%;
  }
`;

Cover.displayName = 'CardCover';
Cover.Overlay = Overlay;

const Content = styled.div``;
Content.displayName = 'CardContent';

const Footer = styled.footer`
  color: ${() => variables.color.gray};
  font-size: 90%;
  padding-top: 0 !important;
`;
Footer.displayName = 'CardFooter';

const cardItemsMarginBottom = value => css`
  margin-bottom: ${typeof value === 'string'
    ? 2 * variables.space[value]
    : value}px;
`;

const cardCss = ({ blockOnLoading, disabled, loading }) => css`
  background: ${variables.color.white};
  border: 1px solid ${variables.color.creamLight};
  border-radius: ${variables.borderRadius}px;
  position: relative;
  transition: ${variables.transitionAll};
  ${loading ? `opacity: ${variables.opacityLoading};` : undefined}
  ${disabled ? `opacity: ${variables.opacityDisabled};` : undefined}
  ${disabled ? `filter: ${variables.filterDisabled};` : undefined}
  ${(loading && blockOnLoading) || disabled ? blockerCss : undefined}
`;

const Card = styled.div.attrs({ className: 'styledup-card' })`
  ${cardCss}
  ${makeCssForResponsiveProp(
    'border',
    value => (value ? undefined : 'border-color: transparent;')
  )}
  ${makeCssForResponsiveProp(
    'padding',
    value => `padding: ${
      typeof value === 'string' ? 2 * variables.space[value] : value
    }px;`
  )}

  ${Cover} {
    ${makeCssForResponsiveProp('padding', coverMarginCss)}
  }

  ${Overlay} {
    ${makeCssForResponsiveProp('padding', overlayCss)}
  }

  ${Content}, ${Cover}, ${Footer} {
    ${makeCssForResponsiveProp('padding', cardItemsMarginBottom)}
  }

  > *:last-child {
    margin-bottom: 0 !important;
  }
`;

Card.Cover = Cover;
Card.Content = Content;
Card.Footer = Footer;
Card.displayName = 'Card';
Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
