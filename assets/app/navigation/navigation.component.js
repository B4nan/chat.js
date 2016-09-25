var navigation = angular.module('navigation');

navigation.component('navigation', {
  templateUrl: 'app/navigation/navigation.template.html',
  controller: ['user', function (user) {
    this.user = user;
    this.authenticated = user.isAuthenticated();
  }]
});
