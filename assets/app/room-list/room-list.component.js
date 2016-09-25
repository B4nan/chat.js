var roomList = angular.module('roomList');

roomList.component('roomList', {
  templateUrl: 'app/room-list/room-list.template.html',
  controller: ['$http', 'toastr', function ($http, toastr) {
    var self = this;
    self.loading = true;

    $http.get('/api/room').then(function (res) {
      self.loading = false;
      self.rooms = res.data;
    });

    self.delete = function (id, index) {
      $http.delete('/api/room/' + id).success(function () {
        self.rooms.splice(index, 1);
        toastr.success('Room successfully removed.', 'Success', { closeButton: true });
      });
    };
  }]
});
