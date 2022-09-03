/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedDashboard = ({ children }) => {
  const navigate = useNavigate();

  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      setAllowed(false);
    }
  }, []);

  if (allowed) {
    return children;
  }
  navigate('/sign-up/welcome');
};

export default ProtectedDashboard;
