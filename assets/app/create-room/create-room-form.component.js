var signIn = angular.module('createRoom');

signIn.component('createRoomForm', {
  templateUrl: 'app/create-room/create-room-form.template.html',
  controller: ['$state', '$http', 'user', 'toastr',
    function ($state, $http, user, toastr) {
      this.form = { loading: false };

      this.submit = function () {
        this.form.loading = true;
        user.identity().then(function (identity) {
          $http.post('/api/room', {
            name: this.form.name,
            author: identity.id
          }).success(function () {
            $state.go('site.rooms');
          }).error(function () {
            toastr.error('An error occurred, please try again.', 'Error', { closeButton: true });
          }).finally(function () {
            this.form.loading = false;
          }.bind(this));
        }.bind(this));
      };
    }
  ]
});
