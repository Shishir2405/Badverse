// src/hooks/useRazorpay.js
import { useCallback } from 'react';
import { initRazorpay } from '../services/razorpay';

export const useRazorpay = () => {
  const initPayment = useCallback(async ({ amount, currency, notes }) => {
    const options = {
      amount,
      currency,
      notes,
      prefill: {
        email: notes.email,
        contact: notes.phone
      }
    };

    try {
      const response = await initRazorpay(options);
      return response;
    } catch (error) {
      throw new Error('Payment failed');
    }
  }, []);

  return { initPayment };
};

