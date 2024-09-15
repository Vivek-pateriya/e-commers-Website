const express = require('express')
const app = express();
const cors = require('cors');
const port = 9679;
const mongoose = require('mongoose');
const config = require('./db');
const cityRouter = require('./Admin/city.router');
const stateRouter = require('./Admin/state.router');
const productCat = require('./Admin/productCat.router');
const product = require('./product/product.route');
const customer = require('./Customer/customer.route');
const paymentRoute = require('./payment');
const venderRoute = require('./Vender/vender.routs');
const adminRoute = require('./Admin/admin.route');
const bill = require('./Admin/Bills/bill.route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/city', cityRouter);
app.use('/state', stateRouter);
app.use('/productCat', productCat);
app.use('/product', product);
app.use('/customer', customer);
app.use('/payment', paymentRoute);
app.use('/vender', venderRoute);
app.use('/admin', adminRoute);
app.use('/bill', bill);


mongoose.connect(config.URL).then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.log('Database connection error:', err);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});