const express = require('express');
const stateRouter = express.Router();
var State = require('./state.model');
//save state 
stateRouter.route('/save').post((req, res) => {
  var state = new State(req.body);
  state.save().then(state => {
    res.send("Status Saved");
    res.end();
  }).catch((err) => {
    res.send(err);
    res.end();
  });
});
//search state
stateRouter.route('/search/:stid').get((req, res) => {
  State.findOne({ "stid": req.params.stid }).then(state => {
    if (state) {
      res.send(state);
    } else {
      res.send("state not found : ");
    }
  }).catch((err) => {
    res.send(err);
    res.end();
  });
});
//updata statue
stateRouter.route('/update').put((req, res) => {
  State.updateOne({ "stid": req.body.stid }, { "stid": req.body.stid, stname: req.body.stname, "status": req.body.status }).then(state => {
    res.send("Status Updated");
    res.end();
  }).catch((err) => {
    res.send(err);
    res.end();
  });
});
//delete enable or disable
stateRouter.route('/delete/:stid').delete((req, res) => {
  State.updateOne({ "stid": req.params.stid }).then(state => {
    res.send("Status Deleted");
    res.end();
  }).catch((err) => {
    res.send(err);
    res.end();
  });
});
//show all user to get all data from mongodb
stateRouter.route('/show').get((req, res) => {
  State.find({ "status": 1 }).then(state => {
    res.send(state);
    res.end();
  }).catch((err) => {
    res.send(err);
    res.end();
  });
});
//get all 
stateRouter.route('/getall').get((req, res) => {
  State.find()
    .then((states) => {
      res.status(200).send(states);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
//searchByName
stateRouter.route('/searchbyname/:stname').get((req, res) => {
  State.findOne({ "stname": req.params.stname }).then(state => {
    res.send(state);
    res.end();
  }).catch((err) => {
    res.send(err);
    res.end();
  });
});
// stateRouter.route('/togle').put((req, res) => {
//   let s = req.body.state;
//   if (s === 1) {
//     s = 0;
//   } else {
//     s = 1
//   }
//   State.updateOne({ "stid": req.body.stid }, { "status": s }).then(state => {
//     res.send("Status Updated");
//     res.end();
//   }).catch((err) => {
//     res.send(err);
//     res.end();
//   });
// });
stateRouter.route('/toggle').put(async (req, res) => {
  try {
    let { state: currentState, stid } = req.body;

    // Default state to 0 if it's missing or not a number
    if (typeof currentState !== 'number') {
      return res.status(400).send("Invalid state value");
    }

    const newState = currentState === 1 ? 0 : 1;

    const updateResult = await State.updateOne({ stid }, { status: newState });

    if (updateResult.nModified === 0) {
      return res.status(404).send("State not found or not updated");
    }

    res.send("Status Updated");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


module.exports = stateRouter;
