/* eslint-disable max-len */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
// TODO: Add view page and share functionality to this drawer
import React, { useState } from 'react';
import { Drawer } from 'antd';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { SignUpHeader, Input, Button, ModalHeader } from '../../../components';
import routes from '../../../Routes/routes.const';
import { ReactComponent as Done } from '../../../assets/icons/Done.svg';
import useBank from './useBank';
import Share from '../../../modals/Share';

const Bank = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [visible, setVisible] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [scaleOne, setScaleOne] = useState(1);

  const navigate = useNavigate();
  const {
    loading,
    // countryLoading,
    scale,
    submitLoading,
    // country,
    bankOptions,
    selectedBank,
    username,
    // countries,
    // countryChangeHandler,
    bankChangeHandler,
    formSubmitHandle,
  } = useBank();

  // useEffect(() => {
  //   setVisible(success);
  // }, [success]);
  return (
    <div className="flex flex-col px-[35px] py-[70px] gap-y-[56px] w-full">
      <SignUpHeader
        title="Connect Your Bank"
        subTitle="Let’s make sure your fans can support you!"
        showBack
        to={routes.signUp.bio}
      />
      <form
        onSubmit={(e) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          formSubmitHandle(e, accountNumber, setAccountNumber, setVisible)
        }
        className="flex flex-col gap-y-[40px] w-full items-center"
      >
        {/* <div className="flex flex-col gap-y-2 max-w-[358px] w-full">
          <label
            className="text-lg leading-4 font-bold font-Alef"
            htmlFor="country"
          >
            Please select your country.
          </label>
          <Select
            id="country"
            defaultValue={country}
            onChange={countryChangeHandler}
            options={countries}
            isMulti={false}
            classNamePrefix="circul"
            isLoading={countryLoading}
            className="focus-visible:outline-none w-full transition-all font-Alef text-lg font-normal leading-4"
            isSearchable
            value={country}
          />
        </div> */}
        <div className="flex flex-col gap-y-2 max-w-[358px] w-full">
          <label
            className="text-lg leading-4 font-bold font-Alef"
            htmlFor="bank"
          >
            Bank name
          </label>
          <Select
            id="bank"
            defaultValue={selectedBank}
            onChange={bankChangeHandler}
            options={bankOptions}
            isMulti={false}
            isLoading={loading}
            classNamePrefix="circul"
            className=""
            required
            isSearchable
            value={selectedBank}
          />
        </div>
        <Input
          type="text"
          showLabel
          label="Account Number"
          placeholder="0123456789"
          required
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          id="account"
        />
        <Button
          type="submit"
          loading={submitLoading}
          disabled={submitLoading}
          label="Connect"
          scale={scale}
        />
      </form>
      <Drawer
        title=""
        placement="bottom"
        closable={false}
        onClose={() => {
          setVisible(false);
          setTimeout(() => {
            navigate(routes.dashboard.dashboard);
          }, 500);
        }}
        visible={visible}
        contentWrapperStyle={{
          height: 'fit-content',
        }}
      >
        <div className="flex flex-col w-full gap-y-14 py-12 items-center">
          <ModalHeader
            title="You’re set!"
            subTitle="Share your link to start getting tips from your fans!"
          />
          <Done className="inline" />
          <div className="flex flex-col gap-y-4 w-full items-center">
            <Button label="Share" onClick={() => setShareVisible(true)} />
            <Button
              label="View Page"
              scale={scaleOne}
              onClick={() => {
                setScaleOne(1);
                setScaleOne([1, 0.7, 1.2, 1]);
                setVisible(false);
                setTimeout(() => {
                  navigate(routes.dashboard.dashboard);
                  setScaleOne(1);
                }, 500);
              }}
              variant="secondary"
            />
          </div>
        </div>
      </Drawer>
      <Drawer
        title=""
        placement="bottom"
        closable={false}
        onClose={() => {
          setShareVisible(false);
        }}
        visible={shareVisible}
        contentWrapperStyle={{
          height: 'fit-content',
        }}
      >
        <Share
          imageUrl={window.localStorage.getItem('imageUrl')}
          username={username}
        />
      </Drawer>
    </div>
  );
};

export default Bank;
