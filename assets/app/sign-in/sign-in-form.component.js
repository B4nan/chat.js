var signIn = angular.module('signIn');

signIn.component('signInForm', {
  templateUrl: 'app/sign-in/sign-in-form.template.html',
  controller: ['$rootScope', '$state', '$http', 'user', 'toastr',
    function ($rootScope, $state, $http, user, toastr) {
      this.loginForm = {
        loading: false
      };

      this.submitLoginForm = function () {
        this.loginForm.loading = true;
        user.login({
          email: this.loginForm.email,
          password: this.loginForm.password
        }).then(function () {
          if ($rootScope.returnToState) {
            $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams);
          } else {
            $state.go('site.dashboard');
          }
        }).catch(function (res) {
          if (res.status === 400 || res.status === 404) {
            return toastr.error('Invalid email/password combination.', 'Error', { closeButton: true });
          }

          toastr.error('An error occurred, please try again.', 'Error', { closeButton: true });
        }).finally(function () {
          this.loginForm.loading = false;
        }.bind(this));
      };
    }
  ]
});
