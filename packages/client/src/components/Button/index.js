/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { ButtonCss } from './buttonCss';
import { Spinner } from '../Spinner';
/**
 * Primary UI component for Button
 */
export const Button = React.forwardRef(({
  variant = 'primary',
  backgroundColor = '',
  shape = 'square',
  children,
  className = '',
  disabled = false,
  icon,
  size = 'normal',
  type = 'button',
  label = '',
  tooltip,
  loading = false,
  wrapClass,
  ...rest
}, ref) => {
  const variantClass = `${ButtonCss[[`box${variant}`]]}`;
  const sizeCss = `${ButtonCss[[`box${size}`]]}`;
  const iconSize = `${ButtonCss[[`icon${size}`]]}`;
  const shapeClass = `${ButtonCss[[`box${shape}`]]}`;
  const disableClass = disabled || loading ? `${ButtonCss.boxdisabled}` : '';

  const styles = {};
  if (backgroundColor) {
    styles[variant === 'primary' ? 'backgroundColor' : 'color'] = backgroundColor;
    styles.border = `1px solid ${backgroundColor}`;
  }

  return (
    <button
      ref={ref}
      className={[
        'spark-button',
        icon && 'flex items-center justify-center',
        sizeCss,
        ButtonCss.buttonbox,
        variantClass,
        shapeClass,
        disableClass,
        className,
      ].join(' ')}
      style={styles}
      type={type}
      disabled={disabled || loading}
      {...rest}
      data-tip
      data-for={tooltip}
    >
      {!!icon && !loading && <div className={`${ButtonCss.iconImg} ${iconSize} ${label ? 'mr-2' : ''}`}>{icon}</div>}
      {!!tooltip && <ReactTooltip place="bottom" id={tooltip} type="dark"><div className="max-w-48 text-center">{tooltip}</div></ReactTooltip>}
      {loading && <Spinner className={`${variant === 'outline' && 'themeSpinner'} ${size === 'medium' && 'spinnerMedium'} ${variant === 'ghost' && 'themeSpinner'}`} />}
      <span className={`${loading && 'opacity-0'} ${wrapClass}`}>{label || children}</span>
    </button>
  );
});

Button.displayName='Button'
Button.propTypes = {
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  variant: PropTypes.oneOf([
    'primary',
    'primaryLight',
    'outline',
    'ghost',
    'dashed',
    'secondary',
    'danger',
  ]),
  /**
   * Shape of button
   */
  shape: PropTypes.oneOf(['square', 'rounded']),
  /**
   * Additional Icon
   */
  icon: PropTypes.string,
  /**
   * Additional icon true false
   */
  size: PropTypes.oneOf(['big', 'normal', 'small', 'smallMedium', 'medium']),
  /**
   * is Button disabled
   */
  disabled: PropTypes.bool,
  /**
   * Additional classname
   */
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  icon: null,
  backgroundColor: null,
  size: 'normal',
  className: '',
  disabled: false,
  shape: 'square',
};
