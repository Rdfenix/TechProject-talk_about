angular.module('appPost').controller('PostController', ['$location', 'PostService', function ($location, PostService) {

	var self = this;
	self.post = {title: '', post: ''};

	self.sendPost = function() {
		PostService.postItem("/post/create", self.post).then(function(response){
			if(response.data.status == 200){
				$location.path('/');
				self.post = {title: '', post: ''};
			}
		});
		
	}
}]).controller('PostListController', ['PostService', function (PostService) {
	
	var self = this;
	self.posts = [];
	self.user_id = '';

	PostService.getPosts().then(function(response){
		if (response.status == 200) {
			self.posts = response.data;
			self.user_id = localStorage.getItem("user_id");
		}
	});

}]);