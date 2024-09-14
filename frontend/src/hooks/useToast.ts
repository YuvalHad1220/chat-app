import { useState } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: ToastType, timeout: number = 3000) => {
    setToast({ message, type });

    // Automatically clear the toast after the timeout
    setTimeout(() => {
      setToast(null);
    }, timeout);
  };

  return {
    showToast,
    toastType: toast?.type,
    toastMessage: toast?.message,
  };
};
