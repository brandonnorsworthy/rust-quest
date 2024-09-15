import React, { useEffect, useState } from 'react';
import { Toast, toast, ToastState } from './state';

const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = ToastState.subscribe((toast: Toast) => {
      setToasts((prevToasts) => {
        if (prevToasts.length > 5) {
          prevToasts.pop();
        }
        return [toast, ...prevToasts];
      });
      setTimeout(() => {
        dismiss(toast.id);
      }, 4000);
    });

    return unsubscribe;
  }, []);

  const dismiss = (toastId: number) => {
    setToasts((prevToasts) => {
      return prevToasts.filter((t) => t.id !== toastId);
    });
  };

  return (
    <div className="absolute bottom-8 right-8 z-[1000] flex flex-col items-end">
      {
        toasts.reverse().map((toast, index) => {
          let toastStyle = null;
          switch (toast.type) {
            case 'error':
              toastStyle = 'bg-buttonBackground-cancel text-buttonText-cancel';
              break;
            case 'success':
              toastStyle = 'bg-buttonBackground-confirm text-buttonText-confirm';
              break;
            case 'warning':
            case 'info':
              toastStyle = 'bg-buttonBackground-info text-buttonText-info';
              break;
            default:
              toastStyle = 'bg-buttonBackground text-buttonText';
              break;
          }

          return (
            <div className={`${toastStyle} w-fit font-bold font-roboto px-4 py-2 ${index !== 0 ? "mt-3" : ""}`} key={toast.id}>
              <span>{toast.message}</span>
            </div>)
        })
      }
    </div>
  );
};

//eslint-disable-next-line
export { toast, Toaster };
