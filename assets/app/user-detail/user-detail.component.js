var userDetail = angular.module('userDetail');

userDetail.component('userDetail', {
  templateUrl: 'app/user-detail/user-detail.template.html',
  controller: ['$http', '$stateParams',
    function ($http, $stateParams) {
      var self = this;
      self.loading = true;

      $http.get('/api/user/' + $stateParams.user).then(function (res) {
        self.user = res.data;
      });
    }
  ]
});
