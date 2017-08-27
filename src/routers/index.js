const mongodb = require('mongodb');
const express = require('express');
const router = express.Router();
const ObjectID = mongodb.ObjectID;
const promisify = require('es6-promisify');

router.get('/main', function (req, res) {
  res.redirect('/');
});

router.get('/game', function (req, res) {
  res.redirect('/');
});

router.get('/config', function (req, res) {
  res.redirect('/');
});

router.get('/ranking', function (req, res) {
  res.redirect('/');
});

router.get('/win', function (req, res) {
  res.redirect('/');
});

router.get('/about', function (req, res) {
  res.redirect('/');
});

/**
 * API
 * USERS
 */

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
  userCollection.insertOne(newData.user1, function (err, dUser1) {
    if (err) { handleError(res, err.message, "Failed insert game"); }
    else
      newData.game.userID1 = dUser1.ops[0]._id;
    userCollection.insertOne(newData.user2, function (err, dUser2) {
      if (err) {
        handleError(res, err.message, "Failed insert game");
      }
      else {
        newData.game.userID2 = dUser2.ops[0]._id;
        newData.game.createdDate = new Date();
        gameCollection.insertOne(newData.game, function (err, dGame) {
          if (err) {
            handleError(res, err.message, "Failed insert game");
          }
          else {
            roundCollection.insertMany(newData.scores, function (err, dScore) {
              res.status(201).json(true);
            });
          }
        });
      }
    });
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
router.get("/api/groups", function (req, res) {
  roundCollection.aggregate(
    { $group: { _id: '$winUser.name', total: { $sum: 1 } } },
    { $sort: { total: -1 } },
    function (err, data) {
      if (err)
        handleError(res, err.message, "Failed get rounds");
      else
        res.status(200).json(data);
    });
});

module.exports = router;