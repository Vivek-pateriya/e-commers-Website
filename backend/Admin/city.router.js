const express = require('express');
const CityRouter = express.Router();
var City = require('./city.model');
//save City 
CityRouter.route('/save').post((req, res) => {
  var city = new City(req.body);
  city.save().then(city => {
    res.send("City Saved");
    res.end();
  }).catch((err) => {
    res.send(err);
    res.end();
  });
});
//getall
CityRouter.route('/getall').get((req, res) => {
  City.find()
    .then((city) => {
      res.status(200).send(city);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
//search City
CityRouter.route('/search/:ctid').get((req, res) => {
  City.findOne({ "ctid": req.params.ctid }).then(city => {
    if (city) {
      res.send(city);
    } else {
      res.send("City not found");
    }
  }).catch((err) => {
    res.send(err);
    res.end();
  });
});
//searchByName
CityRouter.route('/searchbyname/:ctname').get((req, res) => {
  City.findOne({ "ctname": req.params.ctname }).then(city => {
    res.send(city);
    res.end();
  }).catch((err) => {
    res.send(err);
    res.end();
  });
});
//updata City
CityRouter.route('/update').put((req, res) => {
  City.updateOne({ "ctid": req.body.ctid }, { "ctid": req.body.ctid, "ctname": req.body.ctname, "stid": req.body.stid, "status": req.body.status }).then(city => {
    res.send("City updated Successfully");
    res.end();
  }).catch((err) => {
    res.send(err);
    res.end();
  });
});
//delete enable or disable
CityRouter.route('/delete/:ctid').delete((req, res) => {
  City.updateOne({ "ctid": req.params.ctid }, { "status": 0 }).then(city => {
    res.send("City disabled");
    res.end();
  }).catch((err) => {
    res.send(err);
    res.end();
  });
});
//show all Cities
CityRouter.route('/show').get((req, res) => {
  City.find({ "status": 1 }).then(city => {
    res.send(city);
    res.end();
  }).catch((err) => {
    res.send(err);
    res.end();
  });
});
CityRouter.route('/toggle').put(async (req, res) => {
  try {
    const { state: currentState, ctid } = req.body;

    // Validate ctid
    if (!ctid) {
      return res.status(400).send("City ID is required");
    }

    // Validate state
    if (typeof currentState !== 'number' || ![0, 1].includes(currentState)) {
      return res.status(400).send("Invalid state value");
    }

    // Toggle the status
    const newState = currentState === 1 ? 0 : 1;

    // Update the city's status
    const updateResult = await City.updateOne({ ctid }, { status: newState });

    if (updateResult.nModified === 0) {
      return res.status(404).send("City not found or status unchanged");
    }

    res.send("City status updated successfully");
  } catch (err) {
    console.error("Error updating city status:", err);
    res.status(500).send("Server error: " + err.message);
  }
});
CityRouter.get('/searchbyname/:ctname', (req, res) => {

  City.findOne({ "ctname": req.params.ctname })
    .then(result => res.send(result))
    .catch(err => res.send(err));
});
CityRouter.get('/getall', (req, res) => {
  City.find().then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err);
  })
})
CityRouter.get('/showcitybystate/:stid', (req, res) => {
  City.find({ "stid": req.params.stid })
    .then(result => res.send(result))
    .catch(err => res.send(err));
});



module.exports = CityRouter;
