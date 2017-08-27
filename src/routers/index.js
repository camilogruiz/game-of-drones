const mongodb = require('mongodb');
const express = require('express');
const router = express.Router();
const ObjectID = mongodb.ObjectID;

/**
 * API
 * USERS
 */

/** GetAll */
router.get("/api/users", function (req, res) {
  userCollection.find({}).toArray(function (err, data) {
    if (err)
      handleError(res, err.message, "Failed get users");
    else
      res.status(200).json(data);
  });
});
/** Insert */
router.post("/api/users", function (req, res) {
  var newData = req.body;

  if (!req.body.name)
    handleError(res, "Invalid user input", "Must provide a name");

  userCollection.insertOne(newData, function (err, data) {
    if (err)
      handleError(res, err.message, "Failed to create new user");
    else
      res.status(201).json(data.ops[0]);
  });
});
/** GetById */
router.get("/api/users/:id", function (req, res) {
  userCollection.findOne({ _id: new ObjectID(req.params.id) }, function (err, data) {
    if (err)
      handleError(res, err.message, "Failed to get user");
    else
      res.status(200).json(data);
  });
});

/** Update */
router.put("/api/users/:id", function (req, res) {
  var updateData = req.body;
  delete updateData._id;

  userCollection.updateOne({ _id: new ObjectID(req.params.id) }, updateData, function (err, data) {
    if (err) {
      handleError(res, err.message, "Failed to update user");
    } else {
      updateData._id = req.params.id;
      res.status(200).json(updateData);
    }
  });
});

/** Delete */
router.delete("/api/users/:id", function (req, res) {
  userCollection.deleteOne({ _id: new ObjectID(req.params.id) }, function (err, data) {
    if (err)
      handleError(res, err.message, "Failed to delete user");
    else
      res.status(200).json(req.params.id);
  });
});

/**
 * GAME
 */

/** GetAll */
router.get("/api/games", function (req, res) {
  gameCollection.find({}).toArray(function (err, data) {
    if (err)
      handleError(res, err.message, "Failed get games");
    else
      res.status(200).json(data);
  });
});
/** Insert */
router.post("/api/games", function (req, res) {
  var newData = req.body;
  newData.userID1 = new ObjectID(req.body.userID1);
  newData.userID2 = new ObjectID(req.body.userID2);
  newData.createdDate = new Date();

  gameCollection.insertOne(newData, function (err, data) {
    if (err)
      handleError(res, err.message, "Failed to create new game");
    else
      res.status(201).json(data.ops[0]);
  });
});
/** GetById */
router.get("/api/games/:id", function (req, res) {
  gameCollection.findOne({ _id: new ObjectID(req.params.id) }, function (err, data) {
    if (err)
      handleError(res, err.message, "Failed to get game");
    else
      res.status(200).json(data);
  });
});

/** Update */
router.put("/api/games/:id", function (req, res) {
  var updateData = req.body;
  delete updateData._id;

  gameCollection.updateOne({ _id: new ObjectID(req.params.id) }, updateData, function (err, data) {
    if (err) {
      handleError(res, err.message, "Failed to update game");
    } else {
      updateData._id = req.params.id;
      res.status(200).json(updateData);
    }
  });
});

/** Delete */
router.delete("/api/games/:id", function (req, res) {
  gameCollection.deleteOne({ _id: new ObjectID(req.params.id) }, function (err, data) {
    if (err)
      handleError(res, err.message, "Failed to delete game");
    else
      res.status(200).json(req.params.id);
  });
});

/**
 * MOVES
 */

/** GetAll */
router.get("/api/moves", function (req, res) {
  moveCollection.find({}).toArray(function (err, data) {
    if (err)
      handleError(res, err.message, "Failed get moves");
    else
      res.status(200).json(data);
  });
});
/** Insert */
router.post("/api/moves", function (req, res) {
  var newData = req.body;

  if (!req.body.move)
    handleError(res, "Invalid move input", "Must provide a move");

  if (!req.body.kill)
    handleError(res, "Invalid kill input", "Must provide a kill");

  moveCollection.insertOne(newData, function (err, data) {
    if (err)
      handleError(res, err.message, "Failed to create new move");
    else
      res.status(201).json(data.ops[0]);
  });
});
/** GetById */
router.get("/api/moves/:id", function (req, res) {
  moveCollection.findOne({ _id: new ObjectID(req.params.id) }, function (err, data) {
    if (err)
      handleError(res, err.message, "Failed to get move");
    else
      res.status(200).json(data);
  });
});

/** Update */
router.put("/api/moves/:id", function (req, res) {
  var updateData = req.body;
  delete updateData._id;

  moveCollection.updateOne({ _id: new ObjectID(req.params.id) }, updateData, function (err, data) {
    if (err) {
      handleError(res, err.message, "Failed to update move");
    } else {
      updateData._id = req.params.id;
      res.status(200).json(updateData);
    }
  });
});

/** Delete */
router.delete("/api/moves/:id", function (req, res) {
  moveCollection.deleteOne({ _id: new ObjectID(req.params.id) }, function (err, data) {
    if (err)
      handleError(res, err.message, "Failed to delete move");
    else
      res.status(200).json(req.params.id);
  });
});

/**
 * ROUND
 */

/** GetAll */
router.get("/api/rounds", function (req, res) {
  roundCollection.find({}).toArray(function (err, data) {
    if (err)
      handleError(res, err.message, "Failed get rounds");
    else
      res.status(200).json(data);
  });
});
/** Insert */
router.post("/api/rounds", function (req, res) {
  var newData = req.body;

  if (!req.body.move)
    handleError(res, "Invalid round input", "Must provide a round");


  roundCollection.insertOne(newData, function (err, data) {
    if (err)
      handleError(res, err.message, "Failed to create new round");
    else
      res.status(201).json(data.ops[0]);
  });
});
/** GetById */
router.get("/api/rounds/:id", function (req, res) {
  roundCollection.findOne({ _id: new ObjectID(req.params.id) }, function (err, data) {
    if (err)
      handleError(res, err.message, "Failed to get round");
    else
      res.status(200).json(data);
  });
});

/** Update */
router.put("/api/rounds/:id", function (req, res) {
  var updateData = req.body;
  delete updateData._id;

  roundCollection.updateOne({ _id: new ObjectID(req.params.id) }, updateData, function (err, data) {
    if (err) {
      handleError(res, err.message, "Failed to update round");
    } else {
      updateData._id = req.params.id;
      res.status(200).json(updateData);
    }
  });
});

/** Delete */
router.delete("/api/rounds/:id", function (req, res) {
  roundCollection.deleteOne({ _id: new ObjectID(req.params.id) }, function (err, data) {
    if (err)
      handleError(res, err.message, "Failed to delete round");
    else
      res.status(200).json(req.params.id);
  });
});

/** GetAll */
router.get("/api/groups", function (req, res) {
  roundCollection.aggregate(
    {
      $group:
      { _id: '$winUser.name', total: { $sum: 1 } }
    },
    function (err, data) {
      if (err)
        handleError(res, err.message, "Failed get rounds");
      else
        res.status(200).json(data);
    });
});

module.exports = router;