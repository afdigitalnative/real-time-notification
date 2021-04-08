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

        socket.join(socket.request._query['host']);
    });
}

socketNotify.send_new_notify = function(notify_data) {
    socketNotify.socketio.emit('new', notify_data); // .to(notify_data.server_host)
}

module.exports = socketNotify;