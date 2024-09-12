let toastsCounter = 0;

type ToastBase = {
  message: string,
  type?: 'error' | 'success' | 'warning' | 'info',
}

export type Toast = {
  id: number;
} & ToastBase;

type Subscriber = (toast: Toast) => void;

class Observer {
  subscribers: Subscriber[];
  toasts: number[];

  constructor() {
    this.subscribers = [];
    this.toasts = [];
  }

  subscribe = (subscriber: Subscriber): () => void => {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      if (index !== -1) this.subscribers.splice(index, 1);
    };
  };

  publish = (data: Toast): void => {
    this.subscribers.forEach(subscriber => subscriber(data));
  };

  create = (toast: ToastBase): void => {
    const id = toastsCounter++;
    this.publish({ ...toast, id });
    this.toasts = [...this.toasts, id];
  };

  message = (message: string): void => {
    return this.create({ message });
  };

  error = (message: string, error: unknown): void => {
    if (error) console.error(error);
    return this.create({ type: 'error', message });
  };

  success = (message: string): void => {
    return this.create({ type: 'success', message });
  };

  warning = (message: string): void => {
    return this.create({ type: 'warning', message });
  };
}

export const ToastState = new Observer();

const toastFunction = (message: string): void => {
  return ToastState.message(message);
};

const basicToast = toastFunction;

/**
 * @example
 * // allows for calling the toast
 * toast("hello from my toast")
 * // also allows for calling a specific type of toast
 * toast.success("your data was saved correctly")
 */
export const toast = Object.assign(basicToast, {
  success: ToastState.success,
  warning: ToastState.warning,
  error: ToastState.error,
});
