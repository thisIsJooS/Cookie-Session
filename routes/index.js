const express = require("express");
const router = express.Router();
const indexController = require("./../controller/index");

router.get("/", indexController.main);

router.get("/cookie-test", indexController.cookieTest);

router.get("/session-test", indexController.sessionTest);

router.get("/create/cookie", indexController.createCookie);

router.get("/remove/cookie", indexController.removeCookie);

module.exports = router;
