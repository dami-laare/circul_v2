/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

const NoMessages = ({ unread }) => (
  <div className="w-[80%] absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center gap-y-2">
    <span className="text-lg font-Museo text-center leading-6 font-bold ">
      No {unread ? 'Tips Yet ' : ''} {unread ? '' : 'Messages Yet'}
    </span>
    <span className="text-lg leading-6 text-center font-normal font-Alef opacity-50">
      Share your link with your fans so you can receive messages along with
      tips!
    </span>
  </div>
);

export default NoMessages;
