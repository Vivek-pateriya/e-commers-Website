require('dotenv').config();
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
router.post('order/:amt', async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
    const receipt = `receipt_order_${Math.floor(Math.random() * 100000)
      }`;
    const options = {
      amount: req.body.amt,
      currency: "INR",
      receipt: receipt
    }
    const order = await instance.orders.create(options);
    if (!order) return res.send('some error occured');
    res.json(order);
  }
  catch {
    res.send('some error occured');
  }
})
router.post('/sucess', async (req, res) => {
  res.send('payment succesfully Done');
  res.end();
})
module.exports = router;