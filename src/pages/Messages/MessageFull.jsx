/* eslint-disable no-underscore-dangle */
import { Drawer } from 'antd';
import React, { useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactComponent as LongLeft } from '../../assets/icons/long_left-1.svg';
import Menu from '../../modals/Menu';

const MessageFull = () => {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const message = JSON.parse(window.localStorage.getItem('messages')).find(
    (msg) => msg._id === id,
  );
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className="w-full pt-6 pb-24 flex flex-col gap-y-4"
      >
        <div className="w-full flex h-12 px-7 items-center justify-between">
          <Link
            to="/messages"
            className="hover:text-current hover:opacity-50 transition-all"
          >
            <LongLeft className="inline" />
          </Link>
          <span className="font-Alef text-lg font-bold leading-6">
            {message.transaction.fan.nickname
              ? message.transaction.fan.nickname
              : 'Anonymous'}
          </span>
          <button onClick={() => setVisible(true)} className="text-lg">
            <BiDotsHorizontalRounded className="text-2xl" />
          </button>
        </div>
        <div className="px-7 font-Alef text-lg font-normal leading-6">
          {message.text}
        </div>
        <Drawer
          title=""
          placement="bottom"
          closable={false}
          onClose={() => {
            setVisible(false);
          }}
          visible={visible}
          contentWrapperStyle={{
            height: 'fit-content',
          }}
        >
          <Menu setVisible={setVisible} />
        </Drawer>
      </motion.div>
    </AnimatePresence>
  );
};

export default MessageFull;
