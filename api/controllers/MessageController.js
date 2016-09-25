/**
 * @class MessageController
 */

module.exports = {

  create: function (req, res) {
    var params = req.params.all();
    Message.create(params).exec(function (err, message) {
      if (err) {
        return res.negotiate(err);
      }

      var data = message.toJSON();
      data.from = params.from; // populate from user
      if (req.isSocket) {
        sails.sockets.broadcast('room-' + params.room, 'room-message-' + params.room, data);
      }

      res.created(message);
    });
  },

  joinRoom: function (req, res) {
    if (! req.isSocket) {
      return res.badRequest();
    }

    var room = req.param('room');
    sails.sockets.join(req, 'room-' + room, function(err) {
      if (err) {
        return res.serverError(err);
      }

      return res.json({ message: 'Subscribed to room: ' + room });
    });
  },

  leaveRoom: function (req, res) {
    if (! req.isSocket) {
      return res.badRequest();
    }

    var room = req.param('room');
    sails.sockets.leave(req, 'room-' + room, function(err) {
      if (err) {
        return res.serverError(err);
      }

      return res.json({ message: 'Subscribed to room: ' + room });
    });
  }

};
