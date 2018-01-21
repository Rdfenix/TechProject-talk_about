angular.module('appPost').factory('PostService', ['$http', function ($http) {
	return {

		talk: function(data) {
			return $http.post('API/v1/post/create', data).then(function(response){
				return response;
			});
		},

		createUser: function(data){
			return $http.post('API/v1/user/create', data).then(function(response){
				return response;
			});
		},

		getPosts: function() {
			return $http.get('API/v1/post/list');
		},
		
		getPostDetail: function(code){
			return $http.get('API/v1/post/' + code);
		},

		getCommentary: function(code){
			return $http.get('API/v1/commentary/list/' + code);
		}

	}
}])