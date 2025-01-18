const RAZORPAY_KEY = "rzp_live_2rghtvUXVczH8V";

export const initRazorpay = (options) => {
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY,
      ...options,
      handler: function (response) {
        resolve(response);
      },
    });
    rzp.open();
    rzp.on('payment.failed', function (response) {
      reject(response.error);
    });
  });
};
