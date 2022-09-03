import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedSignUp = ({ children }) => {
  const navigate = useNavigate();

  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    if (!window.localStorage.getItem('signUpToken')) {
      setAllowed(false);
    }
  }, [window.localStorage.getItem('signUpToken')]);

  if (allowed) {
    return children;
  }
  return navigate('/sign-up/welcome');
};

export default ProtectedSignUp;
