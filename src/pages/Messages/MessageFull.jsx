import React from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { useParams, Link } from 'react-router-dom';

const MessageFull = () => {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  return (
    <div className="w-full py-24 px-2 flex flex-col gap-y-4">
      <Link
        to="/messages"
        className="hover:text-current hover:opacity-50 transition-all"
      >
        <MdChevronLeft className="text-2xl" />
      </Link>
      <div className="px-6">
        Hello
        {/* {messages.find((message) => message._id === id).text} */}
      </div>
    </div>
  );
};

export default MessageFull;
