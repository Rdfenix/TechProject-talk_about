angular.module('appPost').controller('CommentaryController', ['$location', '$routeParams','PostService', function ($location, $routeParams, PostService) {

	var self = this;

	self.posting = [];
	PostService.getItemDetail("/post", $routeParams.id).then(function(response){
		if(response.data.status != 500){
			self.posting = response.data;
			LoadCommentray();			
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

	self.comm = {commentary: ''};
	self.postCommentary = function(){
		var data = {commentary: self.comm.commentary, user_id: localStorage.getItem('user_id'), post_id: $routeParams.id};
		PostService.postItem("/commentary", data).then(function(response){
			if (response.data.status == 200) {
				LoadCommentray();
			}
		});
	};
}]);