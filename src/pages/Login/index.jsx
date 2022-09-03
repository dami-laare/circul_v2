/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import api from '../../api';
import { Input, SignUpHeader, Button } from '../../components';
import routes from '../../Routes/routes.const';
import notify from '../../utils/notify';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setScale(1);
    setScale([1, 0.7, 1.2, 1]);

    api
      .post('/creator/login', {
        email,
        password,
      })
      .then(async (res) => {
        setScale(1);
        window.localStorage.setItem('token', res.data.token);
        notify('top', 'Successfully logged in');

        if (!res.data.profileComplete) {
          navigate(routes.signUp.roles);
        } else {
          navigate(routes.dashboard.dashboard);
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          notify('top', err.response.data.message, true);
        } else if (err.request && !err.response) {
          notify(
            'top',
            'Network Error: Check your internet connection and try again',
            true,
            5,
          );
        }
      });
  };
  return (
    <div className="flex flex-col px-[35px] py-[70px] gap-y-[56px] w-full">
      <SignUpHeader subTitle="" title="Login" />
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-y-10 w-full items-center"
      >
        <Input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="Email"
        />
        <Input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={`${passwordVisible ? 'text' : 'password'}`}
          placeholder="Password"
          suffix={
            <button
              type="button"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? <BsEyeSlash /> : <BsEye />}
            </button>
          }
        />
        <Button
          type="submit"
          label="Login"
          scale={scale}
          loading={loading}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default Login;
