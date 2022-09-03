import React from 'react';
import PropTypes from 'prop-types';

const ModalHeader = ({ title, subTitle }) => (
  <div className="flex flex-col gap-y-2 max-w-[278px] w-full items-center text-center">
    <h1 className="text-h4 font-bold font-Museo text-secondary-1 leading-6">
      {title}
    </h1>
    <span className="text-lg font-normal font-Alef text-secondary-2 leading-4">
      {subTitle}
    </span>
  </div>
);

ModalHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

ModalHeader.defaultProps = {
  title: 'Title',
  subTitle: 'Subtitle',
};

export default ModalHeader;
