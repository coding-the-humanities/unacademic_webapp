var app = angular.module('unacademic');

app.service('Path', function($http) {
  var fireBaseUrl = 'https://cth-curriculum.firebaseio.com/paths/1.json';
  var apiaryBaseUrl = "http://private-7c8dd-unacademic.apiary-mock.com/paths/1"

  return {
    find: find
  };

  function find(){
    return $http.get(apiaryBaseUrl);
  }

});
