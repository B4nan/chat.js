var chat = angular.module('chat');

chat.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('site', {
      abstract: true,
      template: '<ui-view/>'
    });
    $stateProvider.state('homepage', {
      url: '/',
      template: 'homepage'
    });
    $stateProvider.state('signUp', {
      url: '/sign-up',
      component: 'signUpForm'
    });
    $stateProvider.state('site.dashboard', {
      url: '/dashboard',
      template: 'dashboard',
      data: {
        roles: ['User']
      }
    });
    $stateProvider.state('site.users', {
      url: '/users',
      component: 'userList',
      data: {
        roles: ['Admin']
      }
    });
    $stateProvider.state('site.userDetail', {
      url: '/user/:user',
      component: 'userDetail',
      data: {
        roles: ['Admin']
      }
    });
    $stateProvider.state('site.createUser', {
      url: '/create-user',
      component: 'createUserForm',
      data: {
        roles: ['Admin']
      }
    });
    $stateProvider.state('site.editUser', {
      url: '/edit-user/:user',
      component: 'editUserForm',
      data: {
        roles: ['Admin']
      }
    });
    $stateProvider.state('site.rooms', {
      url: '/rooms',
      component: 'roomList',
      data: {
        roles: ['User']
      }
    });
    $stateProvider.state('site.roomChat', {
      url: '/room/:room',
      component: 'roomChat',
      data: {
        roles: ['User']
      }
    });
    $stateProvider.state('site.createRoom', {
      url: '/create-room',
      component: 'createRoomForm',
      data: {
        roles: ['User']
      }
    });
    $urlRouterProvider.otherwise('/');
  }
]);

chat.run(['$rootScope', '$transitions', 'authorizator',
  function ($rootScope, $transitions, authorizator) {
    // authorization
    $transitions.onStart({ to: 'site.**' }, function ($transition$) {
      var $state = $transition$.router.stateService;

      // save target state for later role check in auth service
      $rootScope.toState = $transition$.to();
      $rootScope.toStateParams = $transition$.params('to');

      return authorizator.authorize().catch(function (redirect) {
        return $state.target(redirect);
      });
    });

    // leave socket channel when leaving chat rooms
    $transitions.onStart({ from: 'site.roomChat' }, function ($transition$) {
      io.socket.get('/api/message/leaveRoom', {
        room: $transition$.params('from').room
      });
    });
  }
]);
