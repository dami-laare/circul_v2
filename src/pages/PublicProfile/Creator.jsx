/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Creator = ({ c, source }) => {
  const navigate = useNavigate();
  return (
    <button
      // eslint-disable-next-line no-underscore-dangle
      key={c._id}
      onClick={() =>
        navigate(`/${c.username}${source ? `?ref=${source}` : ''}`)
      }
      className="flex items-center gap-x-3 w-full gap-y-4"
    >
      <img
        src={c.imageUrl}
        className="w-[56px] h-[56px] rounded-[50%] "
        alt="avatar"
      />
      <span className="font-Alef font-bold text-lg leading-4">
        @{c.username}
      </span>
    </button>
  );
};

export default Creator;
