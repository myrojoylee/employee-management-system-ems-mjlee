const express = require("express");
const db = require("./index");
const router = express.Router();

router.get("/", function (req, res, next) {
  db.query("SELECT FROM * departments", function (err, results) {
    res.send(results);
  });
});

module.exports = router;
