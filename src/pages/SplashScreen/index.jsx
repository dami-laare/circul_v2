import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import routes from '../../Routes/routes.const';

const SplashScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate(routes.signUp.welcome);
    }, 3500);
  }, []);
  return (
    <div className="flex h-[100vh] w-full justify-center items-center bg-secondary-1">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: [0, 1, 1, 0], x: 0 }}
        className="font-Museo font-black text-h1 text-white"
        transition={{
          type: 'spring',
          ease: 'easeInOut',
          duration: 3,
          delay: 0.2,
          times: [0, 0.2, 0.8, 1],
        }}
      >
        Circul
      </motion.div>
    </div>
  );
};

export default SplashScreen;
