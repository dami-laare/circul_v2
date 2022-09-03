/* eslint-disable indent */
import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import LoadingDot from '../LoadingDot';

const Button = ({
  type,
  variant,
  onClick,
  label,
  disabled,
  loading,
  prefix,
  scale,
}) => {
  const { View } = LoadingDot({ variant });

  const variants = {
    primary: 'bg-secondary-1 text-white',
    secondary: 'bg-white text-secondary-1',
  };

  return (
    <motion.button
      transition={{
        duration: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 17,
        mass: 0.5,
      }}
      animate={{ scale }}
      type={type}
      onClick={onClick}
      style={disabled ? { cursor: 'auto', opacity: '0.5' } : {}}
      className={`${variants[variant]} max-w-[358px] transition-all max-h-[56px] h-[56px] border border-black rounded-[50px] font-Alef text-base xs:text-lg font-bold leading-4 w-full flex items-center justify-center`}
      disabled={disabled}
    >
      <div
        style={{ display: loading ? 'none' : 'initial' }}
        className="flex items-center justify-center transition-all"
      >
        {prefix && prefix}
        <span>{label}</span>
      </div>
      <div style={{ display: loading ? 'initial' : 'none' }}>{View}</div>
    </motion.button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  label: PropTypes.string,
  prefix: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.element]),
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  variant: 'primary',
  disabled: false,
  loading: false,
  label: 'Button',
  prefix: false,
};

export default Button;
