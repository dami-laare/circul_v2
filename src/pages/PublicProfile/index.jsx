/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unneeded-ternary */
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { MdPerson } from 'react-icons/md';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsUpload } from 'react-icons/bs';
import { Drawer } from 'antd';
import api from '../../api';
// import Loader from '../components/Loader';
import { Button, Input, LottieLoader, Spinner } from '../../components';
// import ShareProfile from '../../SignUp/ShareProfile';
import SendTip from './SendTip';
import TipSuccess from './TipSuccess';
import { ReactComponent as LongLeft } from '../../assets/icons/long_left-1.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/Search.svg';
import notify from '../../utils/notify';
import Share from '../../modals/Share';
import { search } from '../../utils/helpers';
import Creator from './Creator';
import Menu from '../../modals/Menu';

const reserved = [
  'dashboard',
  'messages',
  'message',
  'search',
  'profile',
  'welcome',
  'roles',
  'login',
  'sign-up',
  'username',
  'bio',
  'bank',
  'success',
  '',
];

const PublicProfile = () => {
  const { username } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState({});
  const [shareVisible, setShareVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [scaleTwo, setScaleTwo] = useState(1);
  const [tipVisible, setTipVisible] = useState(false);
  const [tipSuccessVisible, setTipSuccessVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [creators, setCreators] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const { View } = LottieLoader();

  const fetchData = useCallback(async () => {
    setPageLoading(true);
    let ref;
    if (searchParams.get('trxref')) {
      ref = searchParams.get('trxref');
    }
    await api
      .get(`/creator/fan_page/${username}?ref=${ref ? ref : ''}`)
      .then((res) => {
        if (res.data.transactionSuccess) {
          setTipSuccessVisible(true);
        }
        setUser(res.data.creator);
        setPageLoading(false);
      })
      .catch((err) => {
        setPageLoading(false);
        if (err.response) {
          notify('top', err.response.data.message, true);
        } else if (err.request && !err.response) {
          notify(
            'top',
            'Network error: Check your internet connection and try again',
            true,
            5,
          );
        }
      });
  }, [username, searchParams]);

  const sendAnalytics = useCallback(
    async (method) => {
      await api.put(`/creator/analytics/${username}?method=${method}`);
    },
    [username],
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await search(searchQuery, 1);
    setLoading(false);
    setSearched(true);
    setCreators(result);
  };

  useEffect(() => {
    if (username && !reserved.includes(username)) {
      fetchData();
      sendAnalytics('view');
    }
  }, [username, fetchData, sendAnalytics]);
  return reserved.includes(username) || pageLoading ? (
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
      {searchParams.get('source') ? (
        <div className="w-full flex h-12 px-9 mt-6 items-center justify-between">
          <Link
            to="/search"
            className="hover:text-current hover:opacity-50 transition-all"
          >
            <LongLeft className="inline" />
          </Link>
          <span className="font-Alef text-lg font-bold leading-6">
            {user.username}
          </span>
          <button onClick={() => setVisible(true)} className="text-lg">
            <BiDotsHorizontalRounded className="text-2xl" />
          </button>
        </div>
      ) : (
        <form className="w-full px-9 mt-6" onSubmit={submitHandler}>
          <Input
            onChange={async (e) => {
              if (e.target.value === '') {
                setSearched(false);
                const topCreators = JSON.parse(
                  window.localStorage.getItem('topCreators'),
                );
                setCreators(topCreators);
              }
              setSearchQuery(e.target.value);
            }}
            type="text"
            value={searchQuery}
            prefix={<SearchIcon className="mr-2 inline" />}
            placeholder="Find creators"
            search
          />
        </form>
      )}
      {loading ? (
        <Spinner />
      ) : searched ? (
        <div className="flex flex-col w-full gap-y-4">
          {creators.length > 0 ? (
            creators.map((c) => <Creator c={c} />)
          ) : (
            <div className="font-Alef absolute top-[50vh] left-[50vw] translate-y-[-50%] translate-x-[-50%] text-lg leading-6 text-center">
              Oops! No Creators Found!
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col w-full mt-16 items-center px-9">
          <div className="w-full flex flex-col gap-y-16 items-center">
            <div className="w-full flex flex-col gap-y-5 items-center">
              {user.imageUrl ? (
                <div
                  className="h-[144px] w-[144px] rounded-[50%]"
                  style={{
                    backgroundImage: `url(${user.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              ) : (
                <div className="h-[144px] w-[144px] rounded-[50%] flex justify-center border border-gray-1 items-center">
                  <MdPerson className="inline text-5xl" />
                </div>
              )}
              <span className="text-lg leading-4 font-Alef font-bold">
                @{user.username}
              </span>
              <span className="text-lg text-center font-Alef leading-6 font-normal">
                {user.bio}
              </span>
            </div>
            <div className="mt-10 flex flex-col gap-y-4 items-center w-full max-w-[20rem]">
              <Button
                type="button"
                label="Send a tip!"
                variant="primary"
                prefix={<AiOutlineCreditCard className="mr-[11px] inline" />}
                onClick={() => {
                  setScale(1);
                  setScale([1, 0.7, 1.2, 1]);
                  setTimeout(() => {
                    setScale(1);
                    setTipVisible(true);
                  }, 500);
                }}
                scale={scale}
              />
              <Button
                type="button"
                label="Share with friends"
                variant="secondary"
                prefix={<BsUpload className="mr-[11px] inline" />}
                onClick={() => {
                  setScaleTwo(1);
                  setScaleTwo([1, 0.7, 1.2, 1]);
                  setTimeout(() => {
                    setScaleTwo(1);
                    setShareVisible(true);
                    sendAnalytics('share');
                  }, 500);
                }}
                scale={scaleTwo}
              />
            </div>
          </div>
          <Drawer
            title=""
            placement="bottom"
            closable={false}
            onClose={() => setShareVisible(false)}
            visible={shareVisible}
            contentWrapperStyle={{
              height: 'fit-content',
            }}
          >
            <Share
              imageUrl={user.imageUrl}
              username={user.username}
              heading="Share"
              subHeading={`Share @${user.username}’s page with the world`}
            />
          </Drawer>
          <Drawer
            title=""
            placement="bottom"
            closable={false}
            onClose={() => {
              setTipSuccessVisible(false);
              setSearchParams({});
            }}
            visible={tipSuccessVisible}
            contentWrapperStyle={{
              height: 'fit-content',
            }}
          >
            <TipSuccess
              username={user.username}
              setShareVisible={setShareVisible}
              close={(e) => {
                setTipSuccessVisible(e);
                setSearchParams({});
              }}
            />
          </Drawer>
          <Drawer
            title=""
            placement="bottom"
            closable={false}
            onClose={() => setTipVisible(false)}
            visible={tipVisible}
            contentWrapperStyle={{
              height: 'fit-content',
            }}
          >
            <SendTip username={user.username} bio={user.bio} fan />
          </Drawer>
          <Drawer
            title=""
            placement="bottom"
            closable={false}
            onClose={() => setVisible(false)}
            visible={visible}
            contentWrapperStyle={{
              height: 'fit-content',
            }}
          >
            <Menu setVisible={setVisible} />
          </Drawer>
        </div>
      )}
    </>
  );
};

export default PublicProfile;
