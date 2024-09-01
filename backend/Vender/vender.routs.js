const express = require('express');
const VenderRoute = express.Router();
const bodyparser = require('body-parser');
const Vender = require('./vender.modul');
const fs = require('fs');
const multer = require('multer');

VenderRoute.post('/regsiter', (req, res) => {
  const vender = new Vender(req.body);
  vender.save().then(cust => {
    if (cust != null) {
      res.send('regsistration succesfully');
    } else {
      res.send('regsistration failed');

    }
  })
})

VenderRoute.post('/login', (req, res) => {
  const id = req.body.VUSerId;
  const password = req.body.VUserPass;

  Vender.findOne({ VUSerId: id, VUserPass: password, VStatus: 'active' })
    .then(cust => {
      if (cust) {
        res.send(cust);
      } else {
        res.send('Invalid ID or password');
      }
    })
    .catch(err => {
      console.error(err);
      res.send('Something went wrong');
    });
});

VenderRoute.get('/getimage/:vpicname', (req, res) => {
  const picname = req.params.vpicname;
  res.sendFile("E:/BalramSircode/Project/e-commers-Website/backend/Vender/venderimages/" + picname)
})

const stv = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'E:/BalramSircode/Project/e-commers-Website/backend/Vender/venderimages');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploads = multer({ storage: stv });

VenderRoute.post('/savevenderimage', uploads.single('file'), (req, res) => {
  res.send("file upload successfully ");
})
VenderRoute.get('/getvendercount', (req, res) => {
  Vender.find().then(Vender => {
    res.send(Vender);
  }).catch(err => {
    res.send(err);
  })
})
VenderRoute.put('/toggle', (req, res) => {
  const { Vid, VStatus } = req.body;

  Vender.updateOne({ "Vid": Vid }, { "VStatus": VStatus })
    .then(result => {
      console.log('Update result:', result);
      res.send('State updated successfully');
    })
    .catch(err => {
      console.error('Update error:', err);
      res.status(500).send(err);
    });
});

module.exports = VenderRoute;
