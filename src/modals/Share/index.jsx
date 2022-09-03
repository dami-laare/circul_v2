/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { ModalHeader, Button } from '../../components';
import { ReactComponent as Twitter } from '../../assets/icons/TwitterVector.svg';
import { ReactComponent as Person } from '../../assets/icons/User_light.svg';
import { ReactComponent as Copy } from '../../assets/icons/Copy_light.svg';
import notify from '../../utils/notify';

const Share = ({ imageUrl, username, heading, subHeading }) => {
  const [scaleOne, setScaleOne] = useState(1);
  const [scaleTwo, setScaleTwo] = useState(1);

  const shareTwitter = () => {
    window.open(
      `http://twitter.com/share?text=Hey guys! Join my Circul here!&url=https://circul.dev-nexus.com/${username}`,
      '_blank',
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://circul.dev-nexus.com/${username}`);
    notify('top', 'Link Copied to clipboard');
  };
  return (
    <div className="flex flex-col w-full gap-y-14 py-12 items-center">
      <ModalHeader
        title={`${heading ? heading : 'You’re set!'}`}
        subTitle={`${
          subHeading
            ? subHeading
            : 'Share your link to start getting tips from your fans!'
        }`}
      />
      <div className="flex flex-col w-full gap-y-2 items-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            className="w-[112px] h-[112px] rounded-[50%] "
          />
        ) : (
          <div className="w-[112px] h-[112px] rounded-[50%] flex items-center justify-center border border-secondary-2">
            <Person className="inline" />
          </div>
        )}
        <span className="font-bold font-Alef text-h6 leading-6">
          @{username}
        </span>
      </div>
      <div className="flex flex-col gap-y-4 w-full items-center">
        <Button
          prefix={<Twitter className="inline mr-3 text-white" />}
          label="Tweet it"
          onClick={() => {
            setScaleOne(1);
            setScaleOne([1, 0.7, 1.2, 1]);
            setTimeout(() => {
              setScaleOne(1);
              shareTwitter();
            }, 500);
          }}
          scale={scaleOne}
        />
        <Button
          prefix={<Copy className="inline mr-3" />}
          label="Copy link"
          variant="secondary"
          scale={scaleTwo}
          onClick={() => {
            setScaleTwo(1);
            setScaleTwo([1, 0.7, 1.2, 1]);
            setTimeout(() => {
              setScaleTwo(1);
              copyToClipboard();
            }, 500);
          }}
        />
      </div>
    </div>
  );
};

export default Share;
