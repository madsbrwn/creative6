var myusername;
var myApp = angular.module("myApp",["firebase"]);
  myApp.controller('myController', ['$scope', '$http',
                              function($scope, $http) {
    $http.get('/user/profile')
        .success(function(data, status, headers, config) {
      $scope.user = data;
	myusername=data.username;
	console.log(myusername);
 $scope.error = "";
    }).
    error(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });
  }]);
myApp.controller("chatController", ["$scope", "$firebaseArray",
        function($scope, $firebaseArray) {
    var ref = firebase.database().ref().child("messages");
                $scope.chats = $firebaseArray(ref);
                $scope.update = function(user) {
			 var newmessage = {from:myusername,body:user.chat};
                                console.log(newmessage);
                                $scope.chats.$add(newmessage);
                                user.chat = "";
                }
        }
]);

