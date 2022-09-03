/* eslint-disable no-nested-ternary */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import NoMessages from './NoMessages';
import MessageCard from './MessageCard';
import { Footer, LottieLoader } from '../../components';
import api from '../../api';

const { TabPane } = Tabs;

const Messages = () => {
  const oldMessages = window.localStorage.getItem('messages');
  const [messages, setMessages] = useState(
    oldMessages ? JSON.parse(oldMessages) : null,
  );
  const [loading, setLoading] = useState(false);
  const { View } = LottieLoader();
  const fetchData = async () => {
    api
      .get('/creator', {
        headers: {
          token: window.localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setLoading(false);
        setMessages(res.data.user.messages);
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem(
          'messages',
          JSON.stringify(res.data.user.messages),
        );
      });
  };
  useEffect(() => {
    if (!window.localStorage.getItem('messages')) {
      setLoading(true);
    }
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="w-full pt-6 pb-24 flex flex-col gap-y-4 items-center">
        <Tabs
          defaultActiveKey="1"
          className="w-full"
          tabBarStyle={{
            padding: '0 2rem',
          }}
        >
          <TabPane tab="Messages" key="1" className="">
            {loading || !messages ? (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {View}
              </div>
            ) : messages.length > 0 ? (
              messages
                .filter((message) => message.text.length > 0)
                .map((message, i) => (
                  <MessageCard key={message._id} message={message} i={i} />
                ))
            ) : (
              <NoMessages />
            )}
          </TabPane>
          <TabPane tab="Tips" key="2" className="">
            {loading || !messages ? (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {View}
              </div>
            ) : messages.length > 0 ? (
              messages.map((message, i) => (
                <MessageCard key={message._id} message={message} i={i} tip />
              ))
            ) : (
              <NoMessages unread />
            )}
          </TabPane>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default Messages;
