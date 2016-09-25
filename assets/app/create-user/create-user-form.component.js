var createUser = angular.module('createUser');

createUser.component('createUserForm', {
  templateUrl: 'app/create-user/create-user-form.template.html',
  controller: ['$state', '$http', 'toastr',
    function ($state, $http, toastr) {
      var self = this;
      self.form = { loading: false };
      self.roles = ['User', 'Admin'];

      self.submit = function () {
        self.form.loading = true;
        $http.post('/api/user', self.form).success(function () {
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
