import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="flex flex-col gap-y-10 items-center">
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
      </div>
    </div>
  );
};

export default SelectRoles;
