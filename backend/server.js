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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/city', cityRouter);
app.use('/state', stateRouter);
app.use('/productCat', productCat);
app.use('/product', product);
app.use('/customer', customer);


mongoose.connect(config.URL).then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.log('Database connection error:', err);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});