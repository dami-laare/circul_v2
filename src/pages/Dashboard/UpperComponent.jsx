/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsUpload, BsPerson } from 'react-icons/bs';
import { Drawer } from 'antd';
import { Button } from '../../components';
// import { ReactComponent as ShareIcon } from '../../assets/icons/ExportShare.svg';
import { ReactComponent as Person } from '../../assets/icons/User_light.svg';
import Share from '../../modals/Share';
import routes from '../../Routes/routes.const';

const UpperComponent = ({ details }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [scaleTwo, setScaleTwo] = useState(1);
  return (
    <div className="w-full max-w-[368px] flex flex-col items-center gap-y-12">
      <div className="w-full flex flex-col gap-y-4 items-center">
        {window.localStorage.getItem('imageUrl') ? (
          <img
            src={window.localStorage.getItem('imageUrl')}
            className="w-[96px] h-[96px] rounded-[50%]"
            alt="avatar"
          />
        ) : (
          <div className="w-[112px] h-[112px] rounded-[50%] flex items-center justify-center border border-secondary-2">
            <Person className="inline" />
          </div>
        )}
        <div className="w-full flex flex-col gap-y-2 items-center">
          <span className="font-Museo font-bold text-lg leading-6">
            @{details.username}
          </span>
          <span className="font-Alef text-lg leading-4 text-center">
            {details.bio}
          </span>
        </div>
      </div>
      <div className="w-full flex justify-between  gap-x-2 items-center">
        <Button
          prefix={<BsUpload className="inline mr-2 text-lg" />}
          label="Share Page"
          onClick={() => {
            setScale(1);
            setScale([1, 0.7, 1.2, 1]);
            setTimeout(() => {
              setScale(1);
              setVisible(true);
            }, 500);
          }}
          scale={scale}
        />
        <Button
          prefix={<BsPerson className="inline mr-2 text-lg" />}
          label="Edit Profile"
          variant="secondary"
          onClick={() => {
            setScaleTwo(1);
            setScaleTwo([1, 0.7, 1.2, 1]);
            setTimeout(() => {
              setScaleTwo(1);
              navigate(routes.dashboard.profile);
            }, 500);
          }}
          scale={scaleTwo}
        />
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
        <Share
          heading="Share"
          subHeading="Start getting tips from your fans!"
          imageUrl={details.imageUrl}
          username={details.username}
        />
      </Drawer>
    </div>
  );
};

export default UpperComponent;
