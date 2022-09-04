/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Footer, LottieLoader, Spinner } from '../../components';
import { ReactComponent as SearchIcon } from '../../assets/icons/Search.svg';
import { getTopCreators, search } from '../../utils/helpers';
import Creator from '../PublicProfile/Creator';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [creators, setCreators] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const { View } = LottieLoader();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await search(searchQuery, 1);
    setLoading(false);
    setSearched(true);
    setCreators(result);
  };

  useEffect(() => {
    getTopCreators().then((res) => {
      window.localStorage.setItem('topCreators', JSON.stringify(res));
      setCreators(res);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="w-full px-9 pt-6 pb-24 flex flex-col gap-y-12 items-center"
        >
          <form className="w-full" onSubmit={submitHandler}>
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

          <div className="flex flex-col gap-y-9 w-full">
            <span className="font-black text-lg leading-6 font-Museo">
              {searched ? 'Search Results' : 'Top Creators on Circul'}
            </span>
            {loading ? (
              searched ? (
                <Spinner />
              ) : (
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
              )
            ) : (
              <div className="flex flex-col w-full gap-y-4">
                {creators.length > 0 ? (
                  creators.map((c) => <Creator c={c} source="dashboard" />)
                ) : (
                  <div className="font-Alef absolute top-[50vh] left-[50vw] translate-y-[-50%] translate-x-[-50%] text-lg leading-6 text-center">
                    Oops! No Creators Found!
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default Search;
