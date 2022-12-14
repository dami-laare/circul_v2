import React, { useEffect, useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Drawer } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer, LottieLoader } from '../../components';
import api from '../../api';
import UpperComponent from './UpperComponent';
import Stats from './Stats';
import Menu from '../../modals/Menu';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
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
        window.localStorage.setItem('imageUrl', res.data.user.imageUrl);
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
          className="w-full gap-y-6 px-7 pt-6 pb-24 flex flex-col items-center"
        >
          {loading ? (
            <div
              style={{
                position: 'absolute',
                top: '50vh',
                left: '50vw',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {View}
            </div>
          ) : (
            <>
              <button
                onClick={() => setVisible(true)}
                className="absolute top-6 right-4 p-3 text-lg"
              >
                <BiDotsHorizontalRounded className="text-2xl" />
              </button>
              <UpperComponent details={user} />
              <div className="border-b border-secondary-3  w-full" />
              <Stats
                totalEarnings={user.total_earnings}
                analytics={user.analytics}
                messages={user.messages}
              />
            </>
          )}
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
      <Footer />
    </>
  );
};

export default Dashboard;
