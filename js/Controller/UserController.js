angular.module('appPost').controller('RegisterController', ['$location', 'PostService', function($location, PostService){
	
	var self = this;
	self.user = {name: '', user:'', pass: ''};

	self.createUser = function(){
		PostService.postItem("/user/create", self.user).then(function(response){
			if (response.data.status === 200) {
				$location.path('/');	
			}
		});
	}
}]).controller('LoginController', ['$location','PostService', function($location,PostService){
	
	var self = this;
	self.user = {user: '', pass: ''};

	self.loginUser = function(){

		PostService.postItem("/user/login", self.user).then(function(response){
			console.log(response);
			if (response.data.status === 200) {
				$location.path('/');
				location.reload();
				localStorage.setItem("user_id", response.data.user_id);
				localStorage.setItem("user_name", response.data.user_name);
			}
		});
	}

}]).controller('HeaderController', ['$location', 'PostService', function($location, PostService){

	var self = this;
	self.userService = PostService;
	self.isLoggedIn = false;
	self.name = '';
	self.search = {search: ''}
	self.result = [];
	
	PostService.getSession().then(function(success){
		self.isLoggedIn = true;
		self.name = localStorage.getItem("user_name");
	}, function(err){
		console.log(err);
	});	
}]);