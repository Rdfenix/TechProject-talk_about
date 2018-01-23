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

}]).controller('CommentaryController', ['$location', '$routeParams','PostService', function ($location, $routeParams, PostService) {

	var self = this;

	self.posting = [];
	PostService.getItemDetail("/post", $routeParams.id).then(function(response){
		if(response.data.status != 500){
			self.posting = response.data;
		}
	});

	self.comment = [];
	var LoadCommentray = function() {
		PostService.getItemDetail("/commentary/list", $routeParams.id).then(function(response){
			if(response.data.status != 500){
				self.comment = response.data;
			}
			
		});
	};
	LoadCommentray();

	self.commentary = '';
	var data = {commentary: self.commentary, id: $routeParams.id, user_id: localStorage.getItem("user_id")};

	self.postCommentary = function(){
		console.log(data);
		PostService.postItem('/commentary', data).then(function(response){
			if (response.data.status === 200) {
				LoadCommentray();
			}
		});
	}


}]);