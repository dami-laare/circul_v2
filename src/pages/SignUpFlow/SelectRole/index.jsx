import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SignUpHeader, Button } from '../../../components';
import routes from '../../../Routes/routes.const';

const SelectRoles = () => {
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col px-[35px] py-[70px] gap-y-[56px] w-full ">
      <SignUpHeader
        title="Creator or Fan?"
        subTitle="Everyone can find their circul here"
        to={routes.signUp.welcome}
        showBack
      />
      <AnimatePresence>
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="flex flex-col gap-y-10 items-center"
        >
          <Button
            type="button"
            label="I'm a creator"
            scale={scale}
            onClick={() => {
              setTimeout(() => {
                window.localStorage.setItem(
                  'details',
                  JSON.stringify({ role: 'creator' }),
                );
                navigate(routes.signUp.bio);
              }, 500);
              setScale([1, 0.7, 1.2, 1]);
            }}
          />
          <Button
            disabled
            type="button"
            variant="secondary"
            label="I'm a supporter"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SelectRoles;
