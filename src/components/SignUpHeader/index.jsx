import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as LongLeft } from '../../assets/icons/long_left-1.svg';

const SignUpHeader = ({ showBack, title, subTitle, to }) => (
  <div className="flex flex-col gap-y-4">
    {showBack && (
      <Link to={to} className="inline w-fit">
        <LongLeft className="inline" />
      </Link>
    )}
    <div className="flex flex-col gap-y-2">
      <h1 className="text-h4 font-bold font-Museo text-secondary-1 leading-6">
        {title}
      </h1>
      <span className="text-lg font-normal font-Alef text-secondary-2 leading-4">
        {subTitle}
      </span>
    </div>
  </div>
);

SignUpHeader.propTypes = {
  title: PropTypes.string,
  showBack: PropTypes.bool,
  subTitle: PropTypes.string,
};

SignUpHeader.defaultProps = {
  title: 'Title',
  showBack: false,
  subTitle: 'Subtitle',
};

export default SignUpHeader;
