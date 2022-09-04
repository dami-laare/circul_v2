import React, { useState } from 'react';
import { AiOutlineCreditCard } from 'react-icons/ai';
import api from '../../api';
import notify from '../../utils/notify';
import { Button, Input } from '../../components';

const SendTip = ({ username }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = {
      email,
      name,
      amount,
      message,
      username,
    };

    console.log(data);

    await api
      .post('/creator/fan_page/tip', {
        ...data,
      })
      .then((res) => {
        window.location.replace(res.data.data.url);
      })
      .catch((err) => {
        setSubmitting(false);
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
    <form className="flex flex-col gap-y-5 w-full p-4" onSubmit={submitHandler}>
      <Input
        id="email"
        type="email"
        value={email}
        label="Email"
        showLabel
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
      />
      <Input
        id="name"
        type="text"
        value={name}
        label="Name"
        showLabel
        onChange={(e) => setName(e.target.value)}
        placeholder="What’s your [nick] name? (optional)"
      />
      <Input
        id="amount"
        type="number"
        value={amount}
        label="Amount"
        showLabel
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter tip amount e.g. 2,000"
        required
      />
      <Input
        type="textarea"
        id="message"
        value={message}
        label="Message"
        showLabel
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Share a kind message... (optional)"
      />
      <Button
        type="submit"
        label="Send tip"
        variant="primary"
        loading={submitting}
        disabled={submitting}
        prefix={<AiOutlineCreditCard className="inline mr-[11px]" />}
      />
    </form>
  );
};

export default SendTip;
