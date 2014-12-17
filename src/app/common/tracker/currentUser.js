(function(){
  var app = angular.module('unacademic.common.currentUser', []);
  app.factory('currentUser', currentUser);

  function currentUser($log){

    var currentUserId;

    var observerCallbacks = [];

    return {
      getId: getId,
      setId: setId,
      registerObserverCallback: registerObserverCallback
    }

    function getId(){
      return currentUserId;
    }

    function setId(userId){
      currentUserId = userId;
      notifyObservers();
      return true;
    }

    function registerObserverCallback(callback){
      observerCallbacks.push(callback);
    }

    function notifyObservers(){
      _.each(observerCallbacks, function(callback){
        callback();
      });
    };
  };
})();
