import express from 'express';
import Razorpay from 'razorpay';
import request from 'request';

const router = express.Router();

const razorInstance = new Razorpay({
  key_id: 'rzp_test_lI6WkFBNpejBD9',
  key_secret: 'GgtK3tb9sgyJKO0DzLGsQ3DA',
});

router.post('/order', (req, res) => {
  try {
    const option = {
      amount: (req.body.amount * 100).toString(),
      currency: 'INR',
      payment_capture: 0,
    };

    razorInstance.orders.create(option, async function (err, order) {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong',
        });
      }
      return res.status(200).json(order);
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

router.post('/capture/:paymentId', (req, res) => {
  try {
    return request(
      {
        method: 'POST',
        url: `https://rzp_test_lI6WkFBNpejBD9:GgtK3tb9sgyJKO0DzLGsQ3DA@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: (req.body.amount * 100).toString(),
          currency: 'INR',
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({
            message: 'Something went wrong',
          });
        }
        console.log(body);
        return res.status(200).json(body);
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
