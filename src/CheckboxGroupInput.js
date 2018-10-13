import React from 'react';
import styled from 'styled-components';
import Grid from './Grid';

class CheckboxGroupInputUnStyled extends React.Component {
  getCheckedOptions() {
    return this.props.value || [];
  }

  handleChange = (childProps, event) => {
    const { onChange } = this.props;
    const checkedOptions = this.getCheckedOptions();

    if (childProps.onChange) {
      childProps.onChange(event);
    }

    if (onChange) {
      const targetValue = `${event.target.value}`;
      let value;

      if (event.target.checked) {
        value = [...checkedOptions, targetValue];
      } else {
        value = checkedOptions.filter(item => item !== targetValue);
      }

      onChange({ target: { value } });
    }
  };

  render() {
    const {
      children,
      gutter,
      lg,
      md,
      sm,
      xl,
      xxl,
      xs,
      xxs,
      value,
      ...props
    } = this.props;

    return (
      <Grid
        gutter={gutter}
        lg={lg}
        md={md}
        sm={sm}
        xl={xl}
        xxl={xxl}
        xs={xs}
        xxs={xxs}
      >
        {React.Children.map(children, child => React.cloneElement(child, {
          ...props,
          checked:
              this.getCheckedOptions().indexOf(`${child.props.value}`) > -1,
          onChange: this.handleChange.bind(this, child.props)
        }))}
      </Grid>
    );
  }
}

const CheckboxGroupInput = styled(CheckboxGroupInputUnStyled)``;

CheckboxGroupInput.displayName = 'CheckboxGroupInput';
CheckboxGroupInput.defaultProps = {
  gutter: 'none',
  size: 'normal'
};

export default CheckboxGroupInput;
