angular.module('signUp')
  .component('signUpForm', {
    templateUrl: 'app/sign-up/sign-up-form.template.html',
    controller: ['$scope', '$http', 'toastr', function ($scope, $http, toastr) {
      $scope.signupForm = {
        loading: false
      };

      $scope.submitSignupForm = function () {
        $scope.signupForm.loading = true;

        $http.post('/api/sign/up', {
          name: $scope.signupForm.name,
          title: $scope.signupForm.title,
          email: $scope.signupForm.email,
          password: $scope.signupForm.password
        }).then(function () {
          window.location = '/';
        }).catch(function (res) {
          if (res.status == 409) { // e-mail already used
            toastr.error('That email address has already been taken, please try again.', 'Error');
          }
        }).finally(function () {
          $scope.signupForm.loading = false;
        });
      };
    }]
  });
