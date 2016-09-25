var chat = angular.module('chat');

chat.factory('user', ['$q', '$http', '$window',
  function ($q, $http, $window) {
    var _identity = undefined;
    var _authenticated = false;

    return {
      isAuthenticated: function () {
        return _authenticated;
      },
      isInRole: function (role) {
        if (!_authenticated || !_identity.roles) {
          return false;
        }
        return _identity.roles.indexOf(role) !== -1;
      },
      isInAnyRole: function (roles) {
        if (!_authenticated || !_identity.roles) {
          return false;
        }

        for (var i = 0; i < roles.length; i++) {
          if (this.isInRole(roles[i])) {
            return true;
          }
        }

        return false;
      },
      authenticate: function (identity) {
        _identity = identity;
        _authenticated = (identity !== null);
        localStorage.setItem('user-identity', angular.toJson(identity));
      },
      login: function (credentials) {
        return $http.put('/api/sign/in', credentials).then(function (res) {
          var u = res.data.user;
          if (! angular.isDefined(u.roles)) {
            u.roles = ['User'];
          }
          this.authenticate(u);
        }.bind(this));
      },
      logout: function () {
        return $http.post('/api/sign/out').success(function () {
          localStorage.removeItem('user-identity');
          _identity = null;
          _authenticated = false;
        });
      },
      identity: function (force) {
        var d = $q.defer();

        if (force === true) {
          _identity = undefined;
        }

        if (angular.isDefined(_identity)) {
          d.resolve(_identity);
          return d.promise;
        }

        var identity = angular.fromJson(localStorage.getItem('user-identity'));
        if (identity && identity.id === $window.authenticated) {
          this.authenticate(identity);
          d.resolve(_identity);
        } else {
          this.authenticate(null);
          d.resolve(null);
        }

        return d.promise;
      }
    };
  }
]);
