import React, { useEffect, useState } from 'react';
import { Toast, toast, ToastState } from './state';

const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = ToastState.subscribe((toast: Toast) => {
      setToasts((prevToasts) => {
        if (prevToasts.length > 2) {
          prevToasts.pop();
        }
        return [toast, ...prevToasts];
      });
      setTimeout(() => {
        dismiss(toast.id);
      }, 3000);
    });

    return unsubscribe;
  }, []);

  const dismiss = (toastId: number) => {
    setToasts((prevToasts) => {
      return prevToasts.filter((t) => t.id !== toastId);
    });
  };

  return (
    <div className="absolute bottom-0 right-0 m-5">
      {
        toasts.map((toast, index) => {
          let toastStyle = null;
          switch (toast.type) {
            case 'error':
              toastStyle = 'text-white bg-red-500';
              break;
            case 'success':
              toastStyle = 'text-white bg-green-500';
              break;
            case 'warning':
              toastStyle = 'text-white bg-yellow-500';
              break;
            default:
              toastStyle = 'text-black bg-gray-500';
              break;
          }

          return (
            <div className={`${toastStyle} px-4 py-2 ${index !== 0 ? "mt-4" : ""}`} key={toast.id}>
              <span>{toast.message}</span>
              <button className="ml-4" onClick={() => dismiss(toast.id)}>❌</button>
            </div>)
        })
      }
    </div>
  );
};

//eslint-disable-next-line
export { toast, Toaster };
