var chat = angular.module('chat');

chat.factory('authorizator', ['$rootScope', '$q', '$state', 'user', 'toastr',
  function ($rootScope, $q, $state, user, toastr) {
    return {
      authorize: function() {
        return user.identity().then(function() {
          var target = $rootScope.toState;
          if (target.data && target.data.roles && target.data.roles.length > 0 && ! user.isInAnyRole(target.data.roles)) {
            if (user.isAuthenticated()) {
              toastr.error('Access denied.', 'Error');

              return $q.reject($state.current.name);
            } else {
              // todo redirect to desired page after successful login
              $rootScope.returnToState = $rootScope.toState;
              $rootScope.returnToStateParams = $rootScope.toStateParams;
              toastr.error('You are not logged in.', 'Error');

              return $q.reject('homepage');
            }
          }
        });
      }
    };
  }
]);
