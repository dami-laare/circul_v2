import { MdError, MdCheckCircle } from 'react-icons/md';
import { notification } from 'antd';

const notify = (placement, description, error, duration = 3) => {
  notification.info({
    // message: `Notification ${placement}`,
    description,
    placement,
    icon: error ? (
      <MdError className="text-lg text-red-500" />
    ) : (
      <MdCheckCircle className="text-lg text-green-500" />
    ),
    duration,
  });
};

export default notify;
