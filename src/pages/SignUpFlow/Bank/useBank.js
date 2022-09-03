/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import api from '../../../api';
import notify from '../../../utils/notify';

const useBank = (edit) => {
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(1);
  // const [countryLoading, setCountryLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  // const [country, setCountry] = useState('');
  const [banks, setBanks] = useState(null);
  const [bankOptions, setBankOptions] = useState([]);
  const [bank, setBank] = useState(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [username, setUsername] = useState('');
  // const [countries, setCountries] = useState([]);

  // const getCountries = async () => {
  //   setCountryLoading(true);
  //   await api
  //     .get('paystack/countries')
  //     .then((res) => {
  //       const formatCountry = res.data.countries.map((c) => ({
  //         label: c.name,
  //         value: c.name.toLowerCase(),
  //       }));
  //       setCountries(formatCountry);
  //       setCountryLoading(false);
  //     })
  //     .catch(() => {
  //       setCountryLoading(false);
  //     });
  // };

  const getBanks = async () => {
    setBankOptions(null);
    setSelectedBank(null);
    setLoading(true);

    await api
      .get('/paystack/banks/nigeria')
      .then((response) => {
        const { banks } = response.data;
        const bankOptionsLocal = banks
          .sort((a, b) => {
            const fa = a.name.toLowerCase();
            const fb = b.name.toLowerCase();

            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          })
          .map((eachBank) => ({ value: eachBank.code, label: eachBank.name }));
        setBankOptions(bankOptionsLocal);
        setBanks(banks);
        setLoading(false);
      })
      .catch((error) => {
        notify('top', error.response.data.message, true);
      });
  };

  const bankChangeHandler = async (e) => {
    setBank(banks.filter((eachBank) => eachBank.code === e.value)[0]);
    setSelectedBank(e);
  };

  const formSubmitHandle = async (
    e,
    account_number,
    setAccountNumber,
    setVisible,
  ) => {
    e.preventDefault();
    setSubmitLoading(true);
    setScale([1, 0.7, 1.2, 1]);
    const bank_details = {
      ...bank,
      account_number,
    };

    const details = JSON.parse(window.localStorage.getItem('details'));
    const token = window.localStorage.getItem('signUpToken');

    const data = {
      bank_details,
      ...details,
      token,
    };

    if (edit) {
      await api
        .put(
          '/creator/bank',
          { bank_details },
          {
            headers: {
              token: window.localStorage.getItem('token'),
            },
          },
        )
        .then((res) => {
          window.localStorage.setItem('token', res.data.token);
          setSubmitLoading(false);
          setSelectedBank('');
          setAccountNumber('');
          setScale(1);
          notify('top', 'Successfully updated bank account');
        })
        .catch((err) => {
          setSubmitLoading(false);
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
    } else {
      await api
        .put('/creator', {
          ...data,
        })
        .then(async (res) => {
          setVisible(true);
          window.localStorage.setItem('token', res.data.token);
          setUsername(res.data.username);
          window.localStorage.setItem(
            'initData',
            JSON.stringify({ ...res.data }),
          );
          setSubmitLoading(false);
          setSelectedBank('');
          setAccountNumber('');
          setBankOptions(null);
          // setCountry(null);
          // setCountries([]);
          setScale(1);
          notify('top', 'Successfully created account');
        })
        .catch((err) => {
          setSubmitLoading(false);
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
    }
  };

  useEffect(() => {
    getBanks();
  }, []);

  return {
    loading,
    scale,
    submitLoading,
    banks,
    bankOptions,
    bank,
    selectedBank,
    username,
    bankChangeHandler,
    formSubmitHandle,
  };
};

export default useBank;
