/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { BsUpload } from 'react-icons/bs';
import { ReactComponent as Wallet } from '../../assets/icons/Wallet.svg';

const Stats = ({ totalEarnings, analytics, messages }) => (
  <div className="flex flex-col w-full max-w-[368px] pt-6 gap-y-6">
    <div className="flex flex-col justify-between h-[134px] p-[10px] border-[0.5px] rounded-[25px] border-secondary-1/50">
      <div className="py-[10px] px-[9px] text-h5 font-bold font-Alef leading-8">
        &#8358; {Number(totalEarnings).toLocaleString('en-US')}
      </div>
      <div className="flex items-center py-[18px] px-[9px] text-base xs:text-lg font-Alef leading-4 border-t-[0.5px] border-secondary-3">
        <Wallet className="inline mr-3" />
        My Earnings
      </div>
    </div>
    <div className="flex w-full gap-x-3">
      <div className="flex flex-col w-[50%] h-[134px] py-5 xs:px-5 px-2 border-[0.5px] rounded-[25px] border-secondary-1/50">
        <div className="py-[10px] px-[9px] text-h5 font-bold font-Alef leading-8">
          {analytics.shares.length > 1000
            ? `${(analytics.shares.length / 1000).toFixed(1)}k`
            : analytics.shares.length}
        </div>
        <div className="flex items-center py-[18px] xs:px-[9px] px-[4px] text-base xs:text-lg font-Alef leading-4 border-t-[0.5px] border-secondary-3 gap-x-3">
          <BsUpload className="inline text-lg xs:text-h6" />
          Shares
        </div>
      </div>
      <div className="flex flex-col w-[50%] h-[134px] py-5 xs:px-5 px-2 border-[0.5px] rounded-[25px] border-secondary-1/50">
        <div className="py-[10px] px-[9px] text-h5 font-bold font-Alef leading-8">
          {messages.length > 1000
            ? `${(messages.length / 1000).toFixed(1)}k`
            : messages.length}
        </div>
        <div className="flex items-center py-[18px] xs:px-[9px] px-[4px] text-base xs:text-lg font-Alef leading-4 border-t-[0.5px] border-secondary-3 gap-x-3">
          <MdOutlineEmail className="inline text-lg xs:text-h6" />
          Messages
        </div>
      </div>
    </div>
  </div>
);

export default Stats;
