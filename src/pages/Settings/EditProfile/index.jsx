/* eslint-disable no-unneeded-ternary */
import React, { useState } from 'react';
import api from '../../../api';
import { Input, Button } from '../../../components';
import notify from '../../../utils/notify';
import ImageUpload from '../../SignUpFlow/Bio/ImageUpload';

const EditProfile = ({ user }) => {
  const [imageUrl] = useState(user.imageUrl);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name ? user.name : '');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState(user.email);
  const [scale, setScale] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setScale(1);
    setScale([1, 0.7, 1.2, 1]);
    setIsSubmitting(true);

    const userDetails = {
      username,
      name,
      bio: bio ? bio : user.bio,
      email,
    };

    api
      .put(
        '/creator/profile',
        { user: userDetails },
        {
          headers: {
            token: window.localStorage.getItem('token'),
          },
        },
      )
      .then((res) => {
        setIsSubmitting(false);

        window.localStorage.setItem('token', res.data.token);
        setScale(1);
        notify('top', 'Successfully updated profile');
      })
      .catch((err) => {
        setIsSubmitting(false);
        notify('top', err.response.data.message, true);
      });
  };

  return (
    <div className="flex flex-col gap-y-10 w-full max-w-[368px] mt-10 items-center">
      <ImageUpload imageUrlExt={imageUrl} />
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-y-10 w-full items-center"
      >
        <Input
          label="Name"
          showLabel
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="John Doe"
        />
        <Input
          type="email"
          label="Email"
          showLabel
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          label="Username"
          showLabel
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          prefix={
            <span className="text-lg font-Alef leading-4">circul.africa/</span>
          }
        />
        <Input
          type="textarea"
          label="About"
          showLabel
          bio={bio}
          placeholder="Enter new bio here!"
          onChange={(e) => setBio(e.target.value)}
        />
        <Button
          type="submit"
          label="Save Changes"
          scale={scale}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default EditProfile;
