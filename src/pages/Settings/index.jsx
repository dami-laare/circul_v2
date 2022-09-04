import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import EditProfile from './EditProfile';
import Security from './Security';
import { Footer, LottieLoader } from '../../components';
import api from '../../api';

const { TabPane } = Tabs;

const Settings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { View } = LottieLoader();

  const fetchData = async () => {
    setLoading(true);
    api
      .get('/creator', {
        headers: {
          token: window.localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setLoading(false);
        setUser(res.data.user);
        window.localStorage.setItem('token', res.data.token);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="w-full pt-6 pb-24 flex flex-col gap-y-4 items-center"
        >
          <Tabs
            defaultActiveKey="1"
            className="w-full"
            tabBarStyle={{
              padding: '0 2rem',
            }}
          >
            <TabPane tab="Personal" key="1" className="px-8">
              {loading ? (
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
              ) : (
                <div className="flex justify-center w-full">
                  <EditProfile user={user} />
                </div>
              )}
            </TabPane>
            <TabPane tab="Security" key="2" className="px-8">
              {loading ? (
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
              ) : (
                <div className="flex justify-center w-full">
                  <Security user={user} />
                </div>
              )}
            </TabPane>
          </Tabs>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default Settings;
