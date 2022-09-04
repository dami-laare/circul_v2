/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { ModalHeader, Button } from '../../components';
import { ReactComponent as Done } from '../../assets/icons/Done.svg';

const Share = ({ setShareVisible, username, close }) => {
  const [scaleOne, setScaleOne] = useState(1);
  const [scaleTwo, setScaleTwo] = useState(1);
  return (
    <div className="flex flex-col w-full gap-y-14 py-12 items-center">
      <ModalHeader
        title="Sent!"
        subTitle={`@${username} really appreciates this!`}
      />
      <div className="flex flex-col w-full gap-y-2 items-center">
        <Done />
      </div>
      <div className="flex flex-col gap-y-4 w-full items-center">
        <Button
          label="Share Page"
          onClick={() => {
            setScaleOne(1);
            setScaleOne([1, 0.7, 1.2, 1]);
            setTimeout(() => {
              setScaleOne(1);
              setShareVisible(true);
            }, 500);
          }}
          scale={scaleOne}
        />
        <Button
          label="Find Other Creators"
          variant="secondary"
          scale={scaleTwo}
          onClick={() => {
            setScaleTwo(1);
            setScaleTwo([1, 0.7, 1.2, 1]);
            setTimeout(() => {
              setScaleTwo(1);
              close(false);
            }, 500);
          }}
        />
      </div>
    </div>
  );
};

export default Share;
