/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useRef } from 'react';
import axios from 'axios';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Hex from 'crypto-js/enc-hex';
import sha256 from 'crypto-js/sha256';
import notify from '../../../utils/notify';
import api from '../../../api';
import { ReactComponent as Camera } from '../../../assets/icons/Camera_light.svg';
import './index.css';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    notify('top', 'You can only upload JPG/PNG file!', true);
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    notify('top', 'Image must smaller than 2MB!', true);
  }

  return isJpgOrPng && isLt2M;
};

const ImageUpload = ({ imageUrlExt }) => {
  const oldDetails = JSON.parse(window.localStorage.getItem('details'));
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    imageUrlExt ? imageUrlExt : oldDetails.imageUrl,
  );
  const uploadFileRef = useRef();

  const handleChange = async (info) => {
    if (info.file.status === 'done') {
      setLoading(true);
      const timestamp = Date.now();

      let signature = await sha256(
        `eager=c_pad,w_400,h_300&folder=images/circul/avatars&public_id=${info.file.originFileObj.uid}&timestamp=${timestamp}CzF56h4koH5X2J9gFNWmX9FpIxE`,
      );

      signature = Hex.stringify(signature);

      getBase64(info.file.originFileObj, async (url) => {
        setImageUrl(url);
        axios
          .post('https://api.cloudinary.com/v1_1/dev-nexus/image/upload', {
            file: url,
            eager: 'c_pad,w_400,h_300',
            public_id: `${info.file.originFileObj.uid}`,
            api_key: '642111353828398',
            signature,
            folder: 'images/circul/avatars',
            timestamp,
          })
          .then((res) => {
            setLoading(false);
            setImageUrl(res.data.url);
            window.localStorage.setItem('imageUrl', res.data.url);
            if (imageUrlExt) {
              api
                .put(
                  '/creator/image',
                  {
                    imageUrl: res.data.url,
                  },
                  {
                    headers: {
                      token: window.localStorage.getItem('token'),
                    },
                  },
                )
                .then((response) => {
                  window.localStorage.setItem('token', response.data.token);
                })
                .catch((err) => {
                  if (err.response) {
                    notify('top', 'An error occurred. Please try again.', true);
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
              const details = JSON.parse(
                window.localStorage.getItem('details'),
              );

              details.imageUrl = res.data.url;

              window.localStorage.setItem('details', JSON.stringify(details));
            }
          })
          .catch((err) => {
            if (err.response) {
              notify('top', 'An error occurred. Please try again.', true);
            } else if (err.request && !err.response) {
              notify(
                'top',
                'Network error: Check your internet connection and try again',
                true,
                5,
              );
            }
          });
      });
    }
  };

  const onPreview = async (file) => {
    const src = file.url || (await getBase64(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };
  return (
    <div className="flex flex-col gap-y-2 items-center overflow-hidden">
      <ImgCrop grid rotate>
        <Upload
          name="avatar"
          method="get"
          action="https://circul.herokuapp.com/"
          listType="picture-card"
          showUploadList={false}
          className="w-fit overflow-hidden"
          onChange={handleChange}
          ref={uploadFileRef}
          beforeUpload={beforeUpload}
          onPreview={onPreview}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: '100%',
                borderRadius: '50%',
              }}
            />
          ) : (
            <div>
              {loading ? (
                <AiOutlineLoading3Quarters className="inline animate-spin" />
              ) : (
                <Camera />
              )}
            </div>
          )}
        </Upload>
      </ImgCrop>
      <span className="text-base font-bold font-Alef leading-4 underline">
        {imageUrl ? 'Change Photo' : 'Add Photo'}
      </span>
    </div>
  );
};

export default ImageUpload;
