var socketNotify = {};

/**
 * Init socket chat funcitons
 * @param  {Object}      socket
 * @return {void}      
 */
 socketNotify.init = function(socketio) {
    console.log('socket server created');

    socketNotify.socketio = socketio;

    socketio.on('connection', function(socket) {
        console.log('user connected', socket.request._query['user_id']);

        //socketio.emit('new', {title: "test", content: "test content"});
    });
}

socketNotify.send_new_notify = function(notify_data) {
    socketNotify.socketio.emit('new', notify_data)
}

module.exports = socketNotify;