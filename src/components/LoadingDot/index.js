import { useLottie } from 'lottie-react';
import threeDotWhite from '../../assets/lottie/3dotwhite.json';
import threeDotBlack from '../../assets/lottie/3dotblack.json';

const LoadingDot = ({ variant }) => {
  const optionsPrimary = {
    animationData: threeDotWhite,
    loop: true,
  };

  const optionsSecondary = {
    animationData: threeDotBlack,
    loop: true,
    autoplay: true,
  };

  const style = {
    height: '56px',
  };

  const { View } = useLottie(
    variant === 'primary' ? optionsPrimary : optionsSecondary,
    style,
  );
  return { View };
};

export default LoadingDot;
