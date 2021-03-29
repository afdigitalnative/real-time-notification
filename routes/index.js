var express = require('express');
var router = express.Router();
const mainCtrl = require("../controllers/MainController.js");

/********************************
 *      App Routes
 *******************************/

//first page
router.get('/', mainCtrl.index);
router.post('/new', mainCtrl.newNotification);

module.exports = router;