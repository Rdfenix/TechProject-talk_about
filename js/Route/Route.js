angular.module('appPost', ['ngRoute']).config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'View/partials/post_list.html',
		controller: 'PostListController as listPost'
	})
	.when('/post/create', {
		templateUrl: 'View/partials/create_post.html',
		controller: 'PostController as pstCtrl'
	})
	.when('/commentary/:id', {
		templateUrl: 'View/partials/commentary.html',
		controller: 'CommentaryController as cmtCtrl'
	})
	.when('/register', {
		templateUrl: 'View/partials/register.html',
		controller: 'RegisterController as register'
	});
	
	$routeProvider.otherwise({ redirectTo: '/' });
});