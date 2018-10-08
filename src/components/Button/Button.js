import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.css';

const Button = props => {
  const { className, label, link, size, colour, icon, ...rest } = props;
  const classes = `${styles.button} ${styles[size]} ${styles[colour]} ${className}`;
  const linkComponent = button => <Link to={link}>{button}</Link>;
  const button = (
    <button className={classes} {...rest}>
      {icon}
      {label}
      {props.children}
    </button>
  );

  return link ? linkComponent(button) : button;
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  colour: PropTypes.oneOf(['white', 'orange', 'green', 'gold', 'upgrade-green', 'transparent', 'upgrade-black', 'red']),
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.string,
  link: PropTypes.string,
  size: PropTypes.string
};

Button.defaultProps = {
  colour: 'white',
  size: '',
  disabled: false
};

export default Button;
