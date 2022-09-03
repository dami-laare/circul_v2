/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const MessageCard = ({ message, i, tip }) => {
  const readMessageHandler = async () => {
    const messages = JSON.parse(window.localStorage.getItem('messages'));

    messages[i].read = true;

    window.localStorage.setItem('messages', JSON.stringify(messages));
    if (!message.read) {
      await api.put(
        '/creator/message/read',
        {
          message: message._id,
        },
        {
          headers: {
            token: window.localStorage.getItem('token'),
          },
        },
      );
    }
  };
  return (
    <Link
      to={`/dashboard/message/${message._id}`}
      className="w-full h-fit flex flex-col py-7 px-8 gap-y-[19px] hover:text-current"
      style={{
        backgroundColor: message.read && !tip ? 'rgb(83 83 83 / 25%)' : '#FFF',
        borderBottom: tip ? '0.5px solid #BDBDBD' : '0.5px solid #000000',
        // borderTop: i === 0 ? '0.5px solid #BDBDBD' : 'none',
      }}
      onClick={readMessageHandler}
    >
      <div className="w-full flex justify-between gap-x-8 items-start">
        <div className="flex flex-col">
          <span className="font-Alef font-bold text-lg leading-6">
            {message.transaction.fan.nickname}
          </span>{' '}
          <span className="font-Alef font-normal text-lg leading-6 text-success-1">
            Just sent you &#8358;{' '}
            {Number(
              (Number(message.transaction.amount) * 0.9).toFixed(0),
            ).toLocaleString('en-US')}
          </span>
        </div>
        <span
          className="font-Alef font-normal text-lg leading-6"
          style={{ whiteSpace: 'nowrap' }}
        >
          {months[new Date(message.dateCreated).getMonth()]}{' '}
          {new Date(message.dateCreated).getDate()}
        </span>
      </div>
      {!tip && (
        <span
          className="font-Alef font-normal text-lg leading-6 opacity-50"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {message.text ? message.text : 'No message'}
        </span>
      )}
    </Link>
  );
};

export default MessageCard;
