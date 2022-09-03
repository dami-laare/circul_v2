/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Person } from '../../assets/icons/User_light.svg';
import { ReactComponent as MessagesOutline } from '../../assets/icons/Messages.svg';
import { ReactComponent as MessagesDark } from '../../assets/icons/MessagesDark.svg';
import { ReactComponent as Search } from '../../assets/icons/Search.svg';
import { ReactComponent as Dot } from '../../assets/icons/Dot.svg';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="w-full h-[80px] max-h-[80px] border-t border-secondary-3 fixed bottom-0 left-0 flex justify-around items-center bg-white">
      <button
        onClick={() => navigate('/messages')}
        className="flex flex-col items-center gap-y-2 min-w-[75px]"
      >
        {location.pathname === '/messages' ? (
          <MessagesDark className=" text-[2rem]" />
        ) : (
          <MessagesOutline className=" text-[2rem]" />
        )}

        <span className="text-base font-Alef leading-4 text-center">
          {location.pathname === '/messages' ? <Dot /> : 'Messages'}
        </span>
      </button>
      <button
        onClick={() => navigate('/search')}
        className="flex flex-col items-center gap-y-2 min-w-[75px]"
      >
        <Search className=" text-[2rem]" />
        <span className="text-base font-Alef leading-4 text-center">
          {location.pathname === '/search' ? <Dot /> : 'Search'}
        </span>
      </button>
      <button
        onClick={() => navigate('/dashboard')}
        className="flex flex-col items-center gap-y-2 min-w-[75px]"
      >
        <Person className=" text-[2rem]" />
        <span className="text-base font-Alef leading-4 text-center">
          {location.pathname === '/dashboard' ||
          location.pathname === '/profile' ? (
            <Dot />
          ) : (
            'Profile'
          )}
        </span>
      </button>
    </div>
  );
};

export default Footer;
