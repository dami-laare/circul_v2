import React from 'react';
import { ImSpinner3 } from 'react-icons/im';

const Spinner = () => (
  <div className="absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] h-fit  grayscale">
    <ImSpinner3 className="inline text-h5 animate-spin opacity-60 text-secondary-1" />
  </div>
);

export default Spinner;
