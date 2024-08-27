const express = require('express');
const customerRoute = express.Router();
const bodyparser = require('body-parser');
const Customer = require('./customer.model');
const fs = require('fs');
const multer = require('multer');

customerRoute.post('/regsiter', (req, res) => {
  const customer = new Customer(req.body);
  customer.save().then(cust => {
    if (customer != null) {
      res.send('regsistration succesfully');
    } else {
      res.send('regsistration failed');

    }
  })
})
customerRoute.post('/login', (req, res) => {
  const id = req.body.CUSerId;
  const password = req.body.CUserPass;
  Customer.findOne({ $and: [{ "CUSerID": id }, { "CUserPass": password }] }).then(cust => {
    res.send(cust)
  }).catch(err => {
    res.send(err)
  })

})
customerRoute.get('/getimage/:cpicname', (req, res) => {
  const picname = req.params.cpicname;
  res.sendFile(__dirname, 'customerimages', picname)
})

const stv = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'e-commers-Website/backend/Customer/customerimages');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploads = multer({ storage: stv });

customerRoute.post('/savecustomerimage', uploads.single('file'), (req, res) => {
  res.json({});
})
customerRoute.get('/getcustomercount', (req, res) => {
  Customer.find().then(customer => {
    res.send(customer);
  }).catch(err => {
    res.send(err);
  })
})
customerRoute.get('/getcutomerdeatilas/:cid', (req, res) => {
  const id = req.params.cid;
  Customer.findOne(id).then(customer => {
    res.send(customer);
  }).catch(err => {
    res.send(err);
  })
})
module.exports = customerRoute;