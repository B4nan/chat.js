angular.module('userList')
  .component('userList', {
    templateUrl: 'app/user-list/user-list.template.html',
    controller: ['$http', 'toastr', function ($http, toastr) {
      var self = this;
      self.loading = true;

      $http.get('/api/user').then(function (res) {
        self.loading = false;
        self.users = res.data;
      });

      self.delete = function (id, index) {
        $http.delete('/api/user/' + id).success(function () {
          self.users.splice(index, 1);
          toastr.success('User successfully removed.', 'Success', { closeButton: true });
        });
      };
    }]
  });
