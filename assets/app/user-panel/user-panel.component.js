var userPanel = angular.module('userPanel');

userPanel.component('userPanel', {
  templateUrl: 'app/user-panel/user-panel.template.html',
  controller: ['$state', 'user', function ($state, user) {
    this.user = user;
    user.identity().then(function (identity) {
      this.identity = identity;
    }.bind(this));

    this.signOut = function () {
      user.logout();
      $state.go('signIn');
    };
  }]
});
