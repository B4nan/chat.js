angular.module('homepage')
  .component('homepage', {
    templateUrl: 'app/homepage/homepage.template.html'
    // ,
    // controller: ['$http', function ($http) {
    //   this.loading = true;
    //   $http.get('/api/user').then(function (res) {
    //     this.loading = false;
    //     this.users = res.data;
    //   }.bind(this));
    // }]
  });
