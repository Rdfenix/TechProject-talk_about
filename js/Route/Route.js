angular.module('appPost', ['ngRoute']).config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'View/partials/post_list.html',
		controller: 'PostListController as listPost'
	})
	.when('/post/create', {
		templateUrl: 'View/partials/create_post.html',
		controller: 'PostController as pstCtrl',
		resolve: {
			auth: ['$q', '$location', 'PostService', function($q, $location, PostService){
				return PostService.getSession().then(function(success){}, function(err){
					if (err.status === 500) {
						console.log("Not Permissed");
					}
					$("#ModalConfirm").modal();
					$location.path('/');
					$location.replace();
					return $q.reject(err);
				});
			}]
		}
	})
	.when('/commentary/:id', {
		templateUrl: 'View/partials/commentary.html',
		controller: 'CommentaryController as cmtCtrl',
		resolve: {
			auth: ['$q', '$location', 'PostService', function($q, $location, PostService){
				return PostService.getSession().then(function(success){}, function(err){
					if (err.status === 500) {
						console.log("Not Permissed");
					}
					$("#ModalConfirm").modal();
					$location.path('/');
					$location.replace();
					return $q.reject(err);
				});
			}]
		}
	})
	.when('/register', {
		templateUrl: 'View/partials/register.html',
		controller: 'RegisterController as register'
	})
	.when('/login', {
		templateUrl: 'View/partials/login.html',
		controller: 'LoginController as loginCtrl'
	});
	
	$routeProvider.otherwise({ redirectTo: '/' });
});