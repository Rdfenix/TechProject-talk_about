angular.module('appPost', ['ngRoute']).config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'View/partials/post_list.html',
		controller: 'PostListController as listPost'
	})
	.when('/post/create', {
		templateUrl: 'View/partials/create_post.html',
		controller: 'PostCtrl as pstCtrl'
	})
	.when('/commentary/:id', {
		templateUrl: 'View/partials/commentary.html',
		controller: 'CommentaryCtrl as cmtCtrl'
	})
	.when('/register', {
		templateUrl: 'View/partials/register.html'
	});
	
	$routeProvider.otherwise({ redirectTo: '/' });
});