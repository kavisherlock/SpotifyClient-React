import React from 'react';
import PropTypes from 'prop-types';
import styles from "../app.sass";

const propTypes = {
  text: PropTypes.string,
  icon: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  handleButtonClick: PropTypes.func.isRequired,
};

const defaultProps = {
  text: '',
  icon: null,
  width: 50,
  height: 50,
  margin: 20,
};

const Button = (props) => {
  return(
    <div
      className={styles.circleButton}
      onClick={props.handleButtonClick}
      style={{
        width: props.width,
        height: props.height,
        margin: props.margin,
      }}
    >
      {props.icon}
      {props.text}
    </div>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
