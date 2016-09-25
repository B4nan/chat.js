var editUser = angular.module('editUser');

editUser.component('editUserForm', {
  templateUrl: 'app/edit-user/edit-user-form.template.html',
  controller: ['$state', '$http', 'toastr',
    function ($state, $http, toastr) {
      var self = this;
      var user = $state.params.user;
      self.form = { loading: false };
      self.roles = ['User', 'Admin'];

      $http.get('/api/user/' + user).success(function (res) {
        angular.merge(self.form, res);
      });

      self.submit = function () {
        self.form.loading = true;
        $http.put('/api/user/' + user, self.form).success(function () {
          $state.go('site.users');
        }).error(function () {
          toastr.error('An error occurred, please try again.', 'Error', { closeButton: true });
        }).finally(function () {
          self.form.loading = false;
        });
      };
    }
  ]
});
