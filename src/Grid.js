import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { makeCssForResponsiveProp } from './helpers/utils';
import { responsivePropType } from './helpers/propTypes';
import variables from './variables';

// Column

export const columnPropTypes = {
  maxColumns: PropTypes.number.isRequired,
  xxs: PropTypes.number,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xxl: PropTypes.number,
  order: responsivePropType
};

const columnCss = (size, { maxColumns }) => css`
  flex-basis: ${(100 * size) / maxColumns}%;
  max-width: ${(100 * size) / maxColumns}%;
`;

const columnOrderCss = order => css`
  order: ${order};
`;

export const Column = styled.div`
  flex-basis: 100%;
  order: 9999;
  ${makeCssForResponsiveProp('', columnCss)} ${makeCssForResponsiveProp(
  'order',
  columnOrderCss
)};
`;

Column.displayName = 'Column';
Column.propTypes = columnPropTypes;
Column.defaultProps = {
  maxColumns: 12
};

const rowColumnCss = (gutter, props) => {
  const gutterValue = typeof gutter === 'string' ? variables.gutter[gutter] : gutter;

  return css`
    margin-left: ${-1 * gutterValue}px;
    margin-right: ${-1 * gutterValue}px;
    ${props.bottomGutter ? `margin-bottom: ${-2 * gutterValue}px;` : undefined}

    > ${Column} {
      padding-left: ${gutterValue}px;
      padding-right: ${gutterValue}px;
      ${props.bottomGutter ? `margin-bottom: ${2 * gutterValue}px;` : undefined}
    }
  `;
};

// Row

export const rowPropTypes = {
  gutter: responsivePropType,
  bottomGutter: PropTypes.bool
};

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${makeCssForResponsiveProp('gutter', rowColumnCss)};
`;

Row.displayName = 'Row';
Row.propTypes = rowPropTypes;
Row.defaultProps = {
  gutter: 'normal',
  bottomGutter: true
};

// Grid

const GridUnStyled = ({
  bottomGutter,
  children,
  className,
  gutter,
  xxs,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl
}) => {
  const columnProps = {
    maxColumns: 210,
    xxs: xxs ? 210 / xxs : undefined,
    xs: xs ? 210 / xs : undefined,
    sm: sm ? 210 / sm : undefined,
    md: md ? 210 / md : undefined,
    lg: lg ? 210 / lg : undefined,
    xl: xl ? 210 / xl : undefined,
    xxl: xxl ? 210 / xxl : undefined
  };

  return (
    <div className={className}>
      <Row bottomGutter={bottomGutter} gutter={gutter}>
        {React.Children.map(children, (child, key) => (
          <Column key={key} {...columnProps}>
            {child}
          </Column>
        ))}
      </Row>
    </div>
  );
};

const Grid = styled(GridUnStyled)``;

Grid.displayName = 'Grid';
Grid.propTypes = {
  ...rowPropTypes,
  xxs: PropTypes.number,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xxl: PropTypes.number
};
Grid.defaultProps = {
  gutter: 'normal',
  bottomGutter: true,
  xxs: 1
};

Grid.Column = Column;
Grid.Row = Row;

export default Grid;
