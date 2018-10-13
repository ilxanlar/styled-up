import PropTypes from 'prop-types';
import { css } from 'styled-components';
import mediaQuery from '../mediaQuery';

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const hasScreenProp = (screenName, propName, props) => typeof props[`${propName}${capitalize(screenName)}`] !== 'undefined';

export const getScreenProp = (screenName, propName, props) => props[`${propName}${capitalize(screenName)}`];

export function prepareResponsiveProps(propNames, extra = {}) {
  const responsiveProps = propNames.split(',').reduce(
    (result, propName) => ({
      ...result,
      [`responsive${capitalize(propName)}`]: props => props[propName]
    }),
    {}
  );

  return {
    ...responsiveProps,
    ...extra
  };
}

export function makeCssForResponsiveProp(prop, cssMaker) {
  return (props) => {
    if (prop !== '') {
      if (typeof props[prop] === 'undefined' || props[prop] === null) {
        return undefined;
      }

      if (typeof props[prop] !== 'object') {
        return css`
          ${cssMaker(props[prop], props, 'all')};
        `;
      }
    }

    let propValue = {};

    if (prop === '') {
      propValue.xxs = props.xxs;
      propValue.xs = props.xs;
      propValue.sm = props.sm;
      propValue.md = props.md;
      propValue.lg = props.lg;
      propValue.xl = props.xl;
      propValue.xxl = props.xxl;
    } else if (props[prop]) {
      propValue = props[prop];
    }

    return css`
      ${
  typeof propValue.xxs !== 'undefined'
    ? mediaQuery.xxs`${cssMaker(propValue.xxs, props, 'xxs')}`
    : undefined
}
      ${
  typeof propValue.xs !== 'undefined'
    ? mediaQuery.xs`${cssMaker(propValue.xs, props, 'xs')}`
    : undefined
}
      ${
  typeof propValue.sm !== 'undefined'
    ? mediaQuery.sm`${cssMaker(propValue.sm, props, 'sm')}`
    : undefined
}
      ${
  typeof propValue.md !== 'undefined'
    ? mediaQuery.md`${cssMaker(propValue.md, props, 'md')}`
    : undefined
}
      ${
  typeof propValue.lg !== 'undefined'
    ? mediaQuery.lg`${cssMaker(propValue.lg, props, 'lg')}`
    : undefined
}
      ${
  typeof propValue.xl !== 'undefined'
    ? mediaQuery.xl`${cssMaker(propValue.xl, props, 'xl')}`
    : undefined
}
      ${
  typeof propValue.xxl !== 'undefined'
    ? mediaQuery.xxl`${cssMaker(propValue.xxl, props, 'xxl')}`
    : undefined
}
    `;
  };
}

export const selectablePropTypes = {
  options: PropTypes.array,
  optionValue: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  optionDisabled: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  optionsWrapperComponent: PropTypes.func,
  optionComponent: PropTypes.func
};

export const selectableHelper = {
  value(option, optionValue) {
    return typeof optionValue === 'string'
      ? option[optionValue]
      : optionValue(option);
  },

  label(option, optionLabel) {
    return typeof optionLabel === 'string'
      ? option[optionLabel]
      : optionLabel(option);
  },

  disabled(option, optionDisabled) {
    if (optionDisabled) {
      return typeof optionDisabled === 'string'
        ? option[optionDisabled]
        : optionDisabled(option);
    }
    return false;
  }
};
