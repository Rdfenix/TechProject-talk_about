angular.module('appPost').controller('PostCtrl', ['$location', 'PostService', function ($location, PostService) {

	var self = this;
	self.post = {title: '', post: ''};

	self.sendPost = function() {
		PostService.talk(self.post).then(function(response){
			if(response.data.status == 200){
				$location.path('/');
				self.post = {title: '', post: ''};
			}
		});
		
	}
}]).controller('PostListController', ['PostService', function (PostService) {
	
	var self = this;
	self.posts = [];

	PostService.getPosts().then(function(response){
		if (response.status == 200) {
			console.log(response.data);
			self.posts = response.data;
		}
	});

}]).controller('CommentaryCtrl', ['$location', '$routeParams','PostService', function ($location, $routeParams, PostService) {

	var self = this;

	self.posting = [];
	PostService.getPostDetail($routeParams.id).then(function(response){
		if(response.data.status != 500){
			self.posting = response.data;
		}
	});

	self.comment = [];
	PostService.getCommentary($routeParams.id).then(function(response){
		if(response.data.status != 500){
			self.comment = response.data;
		}
		
	});
}])