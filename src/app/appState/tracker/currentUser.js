(function(){
  var app = angular.module('unacademic.common.currentUser', []);
  app.factory('currentUser', currentUser);

  function currentUser($log){

    var currentUserId;

    var observerCallbacks = [];

    return {
      getId: getId,
      setId: setId,
    }

    function getId(){
      return currentUserId;
    }

    function setId(userId){
      currentUserId = userId;
      return true;
    }
  };
})();
