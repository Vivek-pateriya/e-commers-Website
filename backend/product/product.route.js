const express = require('express');
const productRoute = express.Router();
const Product = require('./product.module');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
productRoute.use(cors());
// Save Product
productRoute.route('/saveproduct').post((req, res) => {
  let product = new Product(req.body);
  product.save().then(product => {
    res.status(200).json({ 'product': 'Product added successfully', product });
  }).catch((err) => {
    res.status(400).json({ 'error': 'Adding product to database failed', err });
  });
});

// Get all Products
productRoute.route('/showproduct').get((req, res) => {
  Product.find().then((products) => {
    res.send(products);
  }).catch((err) => {
    res.status(400).json({ 'error': 'Getting products from database failed', err });
  });
});

// Save Product Image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'E:/BalramSircode/Project/e-commers-Website/backend/product/productimage')); // Fixed path concatenation
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

productRoute.post('/saveproductimages', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully', filename: req.file.originalname });
});

// Get Product Image
productRoute.get('/getproductimage/:picname', (req, res) => {
  const imagePath = path.join(__dirname, 'productimage', req.params.picname);

  // console.log("Looking for file at:", imagePath); // Log the path

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error("Error sending image:", err);
      res.status(404).send("Image not found");
    }
  });
});


// Get Maximum Product ID
// productRoute.route('/getmaxpid').get((req, res) => {
//   Product.find({}, 'pid').sort({ pid: -1 }).limit(1)
//     .then((products) => {
//       res.send(products);
//     })
//     .catch((err) => {
//       res.status(400).json({ 'error': 'Getting max pid from database failed', err });
//     });
// });
// Route to get max product ID
productRoute.get('/getmaxpid', (req, res) => {
  Product.find().then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err);
  });
});

module.exports = productRoute;
