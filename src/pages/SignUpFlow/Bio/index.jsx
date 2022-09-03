/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpHeader, Input, Button } from '../../../components';
import routes from '../../../Routes/routes.const';
import notify from '../../../utils/notify';
import api from '../../../api';
import ImageUpload from './ImageUpload';

const Bio = () => {
  const oldDetails = JSON.parse(window.localStorage.getItem('details'));
  const navigate = useNavigate();
  const [username, setUsername] = useState(oldDetails.username);
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState(oldDetails.bio);
  const [scale, setScale] = useState(1);

  const submitHandler = (e) => {
    e.preventDefault();
    setScale([1, 0.7, 1.2, 1]);
    setLoading(true);

    api
      .get(`/creator/${username}`)
      .then(() => {
        const details = JSON.parse(window.localStorage.getItem('details'));

        details.username = username;
        details.bio = bio;

        window.localStorage.setItem('details', JSON.stringify(details));

        setTimeout(() => {
          navigate(routes.signUp.bank);
        }, 500);
      })
      .catch((err) => {
        if (err.request && !err.response) {
          setLoading(false);
          setScale(1);
          return notify(
            'top',
            'Network error. Check your internet connection and try again',
            true,
          );
        }
        setLoading(false);
        setScale(1);
        return notify('top', err.response.data.message, true);
      });
  };
  return (
    <div className="flex flex-col px-[35px] py-[70px] gap-y-[56px] w-full">
      <SignUpHeader
        title="Create Your Bio"
        subTitle="Let everyone get to know you"
        showBack
        to={routes.signUp.roles}
      />
      <ImageUpload />
      <form
        className="flex flex-col gap-y-[56px] w-full items-center"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col gap-y-[40px] w-full">
          <Input
            showLabel
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            label="Username"
            id="username"
            placeholder="username"
            prefix={
              <span className="text-lg font-Alef leading-4">
                circul.africa/
              </span>
            }
          />
          <Input
            type="textarea"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            showLabel
            id="bio"
            label="About"
            placeholder="What are you creating..."
          />
        </div>
        <Button
          loading={loading}
          disabled={loading}
          label="Continue"
          type="Submit"
          scale={scale}
        />
      </form>
    </div>
  );
};

export default Bio;
