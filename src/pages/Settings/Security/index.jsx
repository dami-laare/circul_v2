/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import Select from 'react-select';
import api from '../../../api';
import { Input, Button } from '../../../components';
import notify from '../../../utils/notify';
import useBank from '../../SignUpFlow/Bank/useBank';

const Security = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [scaleOne, setScaleOne] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    loading,
    scale,
    submitLoading,
    bankOptions,
    selectedBank,
    bankChangeHandler,
    formSubmitHandle,
  } = useBank(true);

  const changePassword = async (e) => {
    e.preventDefault();
    setScaleOne(1);
    setScaleOne([1, 0.7, 1.2, 1]);
    setIsSubmitting(true);

    api
      .put(
        '/creator/password',
        { password, confirmPassword },
        {
          headers: {
            token: window.localStorage.getItem('token'),
          },
        },
      )
      .then((res) => {
        setIsSubmitting(false);

        window.localStorage.setItem('token', res.data.token);
        setScaleOne(1);
        notify('top', 'Successfully changed password');
        setPassword('');
        setConfirmPassword('');
      })
      .catch((err) => {
        setIsSubmitting(false);
        notify('top', err.response.data.message, true);
      });
  };

  return (
    <div className="flex flex-col gap-y-10 w-full max-w-[368px] mt-10 items-center">
      <form
        onSubmit={changePassword}
        className="flex flex-col gap-y-4 w-full items-center"
      >
        <span className="text-lg font-Museo leading-6 font-bold block w-full">
          Password
        </span>
        <Input
          type={`${passwordVisible ? 'text' : 'password'}`}
          showLabel
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="New Password"
          suffix={
            <button
              type="button"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? <BsEyeSlash /> : <BsEye />}
            </button>
          }
        />
        <Input
          type={`${passwordVisible ? 'text' : 'password'}`}
          showLabel
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          scale={scaleOne}
          loading={isSubmitting}
          disabled={isSubmitting}
          label="Change Password"
          type="submit"
        />
      </form>
      <form
        onSubmit={(e) => formSubmitHandle(e, accountNumber, setAccountNumber)}
        className="flex flex-col gap-y-4 w-full items-center"
      >
        <span className="text-lg font-Museo leading-6 font-bold block w-full">
          Bank Details
        </span>
        <div className="flex flex-col gap-y-2 max-w-[358px] w-full">
          <label
            className="text-lg leading-4 font-bold font-Alef"
            htmlFor="bank"
          >
            Bank name
          </label>
          <Select
            id="bank"
            defaultValue={selectedBank}
            onChange={bankChangeHandler}
            options={bankOptions}
            isMulti={false}
            isLoading={loading}
            classNamePrefix="circul"
            className=""
            required
            isSearchable
            value={selectedBank}
          />
        </div>
        <Input
          showLabel
          label="Account Number"
          onChange={(e) => setAccountNumber(e.target.value)}
          value={accountNumber}
        />
        <Button
          scale={scale}
          loading={submitLoading}
          disabled={submitLoading}
          label="Save Changes"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Security;
