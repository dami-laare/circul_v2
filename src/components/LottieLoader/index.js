import { useLottie } from 'lottie-react';
import loader from '../../assets/lottie/loader.json';

const LottieLoader = () => {
  const options = {
    animationData: loader,
    loop: true,
    autoplay: true,
  };

  const style = {
    height: '200px',
  };

  const { View } = useLottie(options, style);
  return { View };
};

export default LottieLoader;
