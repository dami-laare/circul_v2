import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Person } from '../../assets/icons/User_light.svg';
import { ReactComponent as World } from '../../assets/icons/world_light.svg';
import { ReactComponent as Shield } from '../../assets/icons/Chield_check_light.svg';
import { ReactComponent as Logout } from '../../assets/icons/Sign_out_squre_light.svg';
import routes from '../../Routes/routes.const';

const Menu = ({ setVisible }) => {
  const navigate = useNavigate();
  return (
    <div className="px-3 py-4 flex flex-col gap-y-6">
      <button
        onClick={() => {
          setVisible(false);
          navigate(routes.dashboard.profile);
        }}
        className="flex items-center gap-x-3 w-fit"
      >
        <Person />
        <span className="font-Alef text-lg font-normal leading-6">
          Edit Profile
        </span>
      </button>
      <button
        onClick={() => {
          setVisible(false);
        }}
        className="flex items-center gap-x-3 w-fit"
      >
        <World />
        <span className="font-Alef text-lg font-normal leading-6">
          Community Guidelines
        </span>
      </button>
      <button
        onClick={() => {
          setVisible(false);
        }}
        className="flex items-center gap-x-3 w-fit"
      >
        <Shield />
        <span className="font-Alef text-lg font-normal leading-6">
          Privacy and Security
        </span>
      </button>
      <button
        onClick={() => {
          setVisible(false);
          window.localStorage.clear();
          navigate(routes.signUp.login);
        }}
        className="flex items-center gap-x-3 w-fit"
      >
        <Logout />
        <span className="font-Alef text-lg font-normal leading-6">Log Out</span>
      </button>
    </div>
  );
};

export default Menu;
