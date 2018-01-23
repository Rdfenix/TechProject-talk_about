angular.module('appPost').factory('PostService', ['$http', function ($http) {

	var service = {
		postItem: function(q, data) {
			return $http.post('API/v1' + q, data).then(function(response){
				return response;
			});
		},

		getPosts: function() {
			return $http.get('API/v1/post/list');
		},

		getItemDetail: function(q, code){
			return $http.get('API/v1' + q + '/' + code);
		},

		getSession: function() {
			return $http.get('API/v1/user/session');
		}
	};

	return service;
		
}])