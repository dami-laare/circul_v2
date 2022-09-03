/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import React from 'react';

const Input = ({
  type,
  label,
  showLabel,
  placeholder,
  required,
  value,
  onChange,
  id,
  prefix,
  suffix,
  search,
}) => {
  switch (type) {
    case 'textarea':
      return (
        <div className="flex flex-col gap-y-2 w-full items-center">
          <label
            className="block w-full text-lg max-w-[358px] leading-4 font-bold font-Alef"
            htmlFor={id}
          >
            {label}
          </label>
          <textarea
            id={id}
            placeholder={placeholder}
            value={value}
            required={required}
            onChange={onChange}
            className="max-w-[358px] transition-all min-h-[112px] h-fit p-4 border border-black rounded-[10px] font-Alef text-lg font-normal leading-4 w-full"
          />
        </div>
      );
    default:
      return (
        <div className="flex flex-col gap-y-2 w-full items-center">
          {showLabel && (
            <label
              htmlFor={id}
              className="text-lg leading-4 font-bold font-Alef block max-w-[358px] w-full"
            >
              {label}
            </label>
          )}
          <div
            className={`input-custom flex items-center max-w-[358px] max-h-[56px] p-4 border border-black ${
              search ? 'rounded-[50px]' : 'rounded-[10px]'
            } font-Alef text-lg font-normal leading-4 w-full`}
          >
            {prefix}
            <input
              className="input-inner w-full transition-all max-h-[56px] font-Alef text-lg font-normal leading-4"
              type={type}
              id={id}
              placeholder={placeholder}
              value={value}
              required={required}
              onChange={(e) => onChange(e, id)}
            />
            {suffix}
          </div>
        </div>
      );
  }
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  showLabel: PropTypes.bool,
  search: PropTypes.bool,
};

Input.defaultProps = {
  label: 'text',
  id: 'inputField',
  placeholder: '',
  type: 'input',
  required: false,
  showLabel: false,
  search: false,
  onChange: (e) => console.log(e.target.value),
};

export default Input;
