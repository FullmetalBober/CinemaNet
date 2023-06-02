import { toast } from 'react-toastify';

interface IProps {
  message: string;
  type: 'success' | 'error' | 'warn';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const Toast = ({ message, type, duration, position }: IProps) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        position: position || 'top-right',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      break;
    case 'error':
      toast.error(message, {
        position: position || 'top-right',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      break;
    case 'warn':
      toast.warn(message, {
        position: position || 'top-right',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      break;
  }
};

export default Toast;
