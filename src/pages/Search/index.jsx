/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { Input, Footer, LottieLoader } from '../../components';
import { ReactComponent as SearchIcon } from '../../assets/icons/Search.svg';
import { getTopCreators, search } from '../../utils/helpers';

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
      <div className="w-full px-9 pt-6 pb-24 flex flex-col gap-y-12 items-center">
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
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {View}
            </div>
          ) : (
            <div className="flex flex-col w-full gap-y-4">
              {creators.map((c) => (
                <div
                  // eslint-disable-next-line no-underscore-dangle
                  key={c._id}
                  className="flex items-center gap-x-3 w-full gap-y-4"
                >
                  <img
                    src={c.imageUrl}
                    className="w-[56px] h-[56px] rounded-[50%] "
                    alt="avatar"
                  />
                  <span className="font-Alef font-bold text-lg leading-4">
                    @{c.username}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
