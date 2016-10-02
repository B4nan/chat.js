/**
 * @class MessageController
 */
var MessageController = function () {};

MessageController.prototype.create = function (req, res) {
  var params = req.params.all();
  Message.create(params).exec(function (err, message) {
    if (err) {
      return res.negotiate(err);
    }

    var data = message.toJSON();
    data.from = params.from; // populate from user
    data.files = params.files;
    if (req.isSocket) {
      sails.sockets.broadcast('room-' + params.room, 'room-message-' + params.room, data);
    }

    res.created(message);
  });
};

MessageController.prototype.joinRoom = function (req, res) {
  if (! req.isSocket) {
    return res.badRequest();
  }

  var room = req.param('room');
  sails.sockets.join(req, 'room-' + room, function (err) {
    if (err) {
      return res.serverError(err);
    }

    return res.json({ message: 'Subscribed to room: ' + room });
  });
};

MessageController.prototype.leaveRoom = function (req, res) {
  if (! req.isSocket) {
    return res.badRequest();
  }

  var room = req.param('room');
  sails.sockets.leave(req, 'room-' + room, function (err) {
    if (err) {
      return res.serverError(err);
    }

    return res.json({ message: 'Subscribed to room: ' + room });
  });
};

MessageController.prototype.uploadFiles = function (req, res) {
  req.file('files').upload({
    dirname: require('path').resolve(sails.config.appPath, 'assets/uploads')
  }, function (err, files) {
    if (err) {
      return res.serverError(err);
    }

    var messageFiles = [];
    files.forEach(function (item) {
      messageFiles.push({
        name: item.filename,
        path: item.fd,
        size: item.size,
        type: item.type,
        author: req.session.authenticated
      });
    });

    MessageFile.create(messageFiles).exec(function (err, records) {
      return res.json({
        files: records
      });
    });
  });
};

MessageController.prototype.download = function (req, res) {
  var fs = require('fs');
  MessageFile.findOne(req.param('id')).exec(function (err, file) {
    res.set("Content-disposition", "attachment; filename='" + file.name + "'");
    fs.createReadStream(file.path)
      .on('error', function (err) {
        return res.serverError(err);
      }).pipe(res);
  });
};

module.exports = new MessageController();
