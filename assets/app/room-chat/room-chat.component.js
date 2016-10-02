var roomChat = angular.module('roomChat');

roomChat.component('roomChat', {
  templateUrl: 'app/room-chat/room-chat.template.html',
  controller: ['$scope', '$http', '$stateParams', '$window', 'user', 'Upload',
    function ($scope, $http, $stateParams, $window, user, Upload) {
      var self = this;
      self.loading = true;
      var room = $stateParams.room;
      io.socket.get('/api/message/joinRoom', {
        room: room
      }, function () {
        io.socket.on('room-message-' + room, function (data) {
          self.messages.unshift(data);
          $scope.$apply();
        });
      });

      $http.get('/api/room/' + room).then(function (res) {
        self.room = res.data;
      });

      $http.get('/api/message?room=' + room + '&sort=createdAt DESC&limit=20').then(function (res) {
        self.messages = res.data;
        self.loading = false;
      });

      self.uploadFiles = function (files) {
        self.loadingForm = false;
        if (files && files.length) {
          var fd = new FormData();
          angular.forEach(files, function (file) {
            fd.append('files', file);
          });
          $http.post('/api/message/uploadFiles', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
          }).success(function (data) {
            self.loadingForm = false;
            self.files = data.files;
          });
        }
      };

      self.loadingForm = false;
      self.sendMessage = function (message) {
        self.loadingForm = true;
        user.identity().then(function (identity) {
          io.socket.post('/api/message', {
            room: room,
            from: identity,
            text: message.text,
            files: self.files
          }, function (data) {
            data.from = identity;
            self.message.text = '';
            self.loadingForm = false;
            $scope.$apply();
            $window.document.getElementById('chat-message').focus();
          });
        })
      };
    }
  ]
});
