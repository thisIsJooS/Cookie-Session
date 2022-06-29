const express = require("express");
const router = express.Router();
const indexController = require("./../controller/index");

router.get("/", indexController.main);

router.get("/cookie-test", indexController.cookieTest);

router.get("/session-test", indexController.sessionTest);

module.exports = router;
