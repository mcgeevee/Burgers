const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    // console.log(data);
    res.render("index", { burgers: data });
  });
});

router.post("/api/burgers", function(req, res) {
  console.log(req.body);
  burger.insertOne(
    // Columns
    [
      "burger_name",
      "devoured"
    ],
    // Values of columns
    [
      req.body.burger_name,
      req.body.devoured
    ],
    // Callback function
    function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  const condition = "id = " + req.params.id;
  console.log(req.body.devoured);

  console.log("condition", condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
