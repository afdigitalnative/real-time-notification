
// Import Libraries
const socketNotify = require('../helper/socket-notify');

var mainController = {};

mainController.index = function(req, res) {
    console.log('called root url');
    res.send('real time notification socket server is running!');
};

mainController.newNotification = function(req, res) {
    console.log(req.body);
    
    socketNotify.send_new_notify(req.body);

    res.send({error: false});
}

module.exports = mainController;