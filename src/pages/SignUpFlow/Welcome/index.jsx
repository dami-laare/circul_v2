/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { SignUpHeader, Input, Button } from '../../../components';
import { ReactComponent as Google } from '../../../assets/icons/Google.svg';
import { ReactComponent as Twitter } from '../../../assets/icons/Twitter.svg';
import routes from '../../../Routes/routes.const';
import notify from '../../../utils/notify';
import api from '../../../api';

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();

  const changeHandler = (e, id) => {
    switch (id) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
    }
  };

  // eslint-disable-next-line consistent-return
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setScale([1, 0.7, 1.2, 1]);

    if ((!email, !password)) {
      setIsSubmitting(false);
      setScale(1);
      return notify('top', 'Please fill out both email and password', true);
    }

    try {
      const res = await api.post('/creator', { email, password });

      window.localStorage.setItem('signUpToken', res.data.token);

      navigate(routes.signUp.roles);
    } catch (err) {
      if (err.request && !err.response) {
        setIsSubmitting(false);
        setScale(1);
        return notify(
          'top',
          'Network error. Check your internet connection and try again',
          true,
        );
      }
      setIsSubmitting(false);
      setScale(1);
      return notify('top', err.response.data.message, true);
    }
  };

  return (
    <div className="flex flex-col px-[35px] py-[70px] gap-y-[56px] w-full">
      <SignUpHeader title="Sign Up" subTitle="Join the Circul today!" />
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-y-10 w-full items-center"
      >
        <Input
          id="email"
          onChange={changeHandler}
          type="email"
          value={email}
          placeholder="Email"
        />
        <Input
          id="password"
          value={password}
          onChange={changeHandler}
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
          loading={isSubmitting}
          disabled={isSubmitting}
          label="Continue with Email"
          scale={scale}
        />
      </form>
      <div className="flex flex-col gap-y-8 items-center w-full">
        <div className="w-full flex gap-x-3 items-center">
          <div className="border-b border-gray-hr w-[100%]" />
          <p className="font-Alef font-normal leading-4 text-lg text-secondary-1 text-center my-6 min-w-[8.5rem]">
            Or continue with
          </p>
          <div className="border-b border-gray-hr w-[100%]" />
        </div>
        <Button
          prefix={<Twitter className="mr-4 inline" />}
          variant="secondary"
          label="Continue with Twitter"
          disabled
        />
        <Button
          prefix={<Google className="mr-4 inline" />}
          variant="secondary"
          label="Continue with Google"
          disabled
        />
        <span className="font-Alef text-base opacity-50 font-normal leading-4 text-center">
          Already have an account?{' '}
          <Link className="text-link-1 underline" to={routes.signUp.login}>
            Log In.
          </Link>
        </span>
      </div>
      <span className="font-Alef text-base opacity-50 font-normal leading-4 text-center mt-8">
        By signing up, you agree to Circul&apos;s{' '}
        <Link to="/" className="text-link-1">
          Terms of Use
        </Link>
        ,{' '}
        <Link to="/" className="text-link-1">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link to="/" className="text-link-1">
          Cookie Policy
        </Link>
        .
      </span>
    </div>
  );
};

export default Welcome;
